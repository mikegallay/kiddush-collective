import { NextRequest, NextResponse } from 'next/server';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import clientPromise from '@/lib/mongodb';
import { encrypt } from '@/app/utils/encryptionHelper';
import { Readable, Writable } from 'stream';
import { Storage } from '@google-cloud/storage';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'; 

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const storage = new Storage({ keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS });
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME as string);


export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: 'No body found in the request' }, { status: 400 });
  }

  const headers = Object.fromEntries(req.headers.entries());
  const busboy = Busboy({ headers, limits: { fileSize: 2 * 1024 * 1024 } });
  const formData: any = {};
  // const files: { filename: string; path: string }[] = [];
  const fileUploadPromiseArr: Promise<void>[] = [];

  // Capture form fields
  busboy.on('field', (fieldname, val) => {
    
    formData[fieldname] = val;

  });

  // Handle file uploads
  busboy.on('file', async (fieldname: string, file: Writable | Blob, filename: string | any) => {
    // const extension = (fieldname === 'blob' && file instanceof Blob)
      // ? '.webm' : '.mp3';
    let finalFilename = '';
  
    // Determine final filename
    if (typeof filename === 'string') {
      finalFilename = filename;
    } else if (filename && filename.name) {
      finalFilename = filename.name;
    } else {
      finalFilename = `${Date.now()}_file`;
    }
  
    const tempFilePath = path.join('/tmp', finalFilename);
    let writeStream: any;

    // Handle Blob or Writable (e.g., file upload)
    if (fieldname === 'blob' && file instanceof Blob) {
      // Convert Blob to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Write buffer to temporary file
      await fs.promises.writeFile(tempFilePath, buffer, 'binary');
    } else if (file instanceof Readable) {

      writeStream = fs.createWriteStream(tempFilePath);
      file.pipe(writeStream);
    } else {
      throw new Error('Unsupported file type');
    }
  
    const fileUploadPromise = new Promise<void>(async (resolve, reject) => {
      writeStream.on('close', async () => {
        try {
          // Check if the temporary file exists
          if (!fs.existsSync(tempFilePath)) {
            throw new Error('Temporary file does not exist');
          }

          const convertedTempFilePath = path.join('/tmp', `${Date.now()}_converted.webm`);

          ffmpeg(tempFilePath)
            .output(convertedTempFilePath)
            .audioCodec('libopus')  // For audio conversion to WebM
            .videoCodec('libvpx')   // Video codec for WebM
            .on('end', async () => {
                // After conversion, upload the converted file to GCS
                console.log('ended',finalFilename)
                const gcsFile = bucket.file(finalFilename);  // Adjust final filename if needed
                const writeStreamToGCS = gcsFile.createWriteStream({
                    resumable: false,
                    contentType: 'audio/webm', // Set MIME type for WebM
                });
    
          fs.createReadStream(convertedTempFilePath)
            .pipe(writeStreamToGCS)
            .on('finish', async () => {
              // File uploaded successfully
              const fileUrl = `https://storage.cloud.google.com/${bucket.name}/${finalFilename}`;

              // Clean up temporary file
              await fs.promises.unlink(tempFilePath);
              await fs.promises.unlink(convertedTempFilePath);

              // Add file URL to formData
              formData.file_upload = fileUrl;

              resolve();
            })
            .on('error', (error) => {
              reject(new Error(`Error uploading to Google Cloud Storage: ${error.message}`));
            });
    
          console.log('File successfully uploaded:', finalFilename);
        })
        .on('error', (error:any) => {
            reject(new Error(`Error during file conversion: ${error.message}`));
        })
        .run();
        } catch (error:any) {
          console.error('Error processing file:', error);
          reject(new Error(`File processing failed: ${error.message}`));
        }
      })
    });

    fileUploadPromiseArr.push(fileUploadPromise); // Add the file upload promise to the array
  
  });

  // Handle completion of form processing
  return new Promise((resolve, reject) => {
    busboy.on('finish', async () => {
      // console.log('Form submitted:', formData);
      
      try {
        // If no files were uploaded, set a default value for file_upload
        if (fileUploadPromiseArr.length === 0) {
          console.log('No files uploaded, setting file_upload to default.',formData.blob_uploaded);
          if (!formData.blob_uploaded) formData.file_upload = ''; // Set to an empty string or `null`
          delete formData.blob_uploaded;
          delete formData.blob;
        } else {
          await Promise.all(fileUploadPromiseArr);
        }
  
        // Encrypt email before saving to the database
        if (formData.email) {
          const encryptedEmail = encrypt(formData.email);
          formData.email = encryptedEmail.content;
          formData.iv = encryptedEmail.iv;
        }
  
        // console.log('Form data to be saved:', formData);
  
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB);
  
        const result = await db.collection('submissions').insertOne({
          ...formData,
          createdAt: new Date(),
        });
  
        resolve(
          NextResponse.json({ message: 'Data saved successfully', id: result.insertedId }, { status: 200 })
        );
      } catch (error: any) {
        reject(
          NextResponse.json({ error: `Error saving data: ${error.message}` }, { status: 500 })
        );
      }
    });
  
    if (req.body) {
      try {
        req.body.pipeTo(new WritableStream({
          write(chunk) {
            busboy.write(chunk);
          },
          close() {
            busboy.end();
          },
        }));
      } catch (error: any) {
        reject(
          NextResponse.json({ error: 'Error processing request body' }, { status: 500 })
        );
      }
    }
  });
}