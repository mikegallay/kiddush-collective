import { NextRequest, NextResponse } from 'next/server';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import clientPromise from '@/lib/mongodb';
import { encrypt } from '@/app/utils/encryptionHelper';
import { Writable } from 'stream';
import { Storage } from '@google-cloud/storage';

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
    // console.log('on field ', fieldname, ": ", val);
    formData[fieldname] = val;
  });

  // Handle file uploads
  busboy.on('file', async (fieldname: string, file: Writable, filename: string | any) => {
    // console.log(`File [${fieldname}] received:`, filename);
    let finalFilename = '';

    if (typeof filename === 'string') {
      finalFilename = filename;
    } else if (filename && filename.name) {
      finalFilename = filename.name;
    } else {
      finalFilename = `${Date.now()}_file`;
    }

    const tempFilePath = path.join('/tmp', finalFilename);

    const writeStream = fs.createWriteStream(tempFilePath);

    file.pipe(writeStream);

    const fileUploadPromise = new Promise<void>((resolve, reject) => {
      writeStream.on('close', async () => {
        // console.log('File written to temporary path:', tempFilePath);

        try {
          if (!fs.existsSync(tempFilePath)) {
            // console.error('Error: Temporary file does not exist before upload.');
            reject(new Error('Temporary file does not exist'));
            return;
          }

          const gcsFile = bucket.file(finalFilename);
          const writeStreamToGCS = gcsFile.createWriteStream({
            resumable: false,
            contentType: 'audio/mpeg',
          });

          fs.createReadStream(tempFilePath)
            .pipe(writeStreamToGCS)
            .on('finish', async () => {
              // console.log('File uploaded to Google Cloud Storage successfully');
              const fileUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${finalFilename}`;

              fs.unlinkSync(tempFilePath);

              // Add file URL to formData after successful upload
              formData.file_upload = fileUrl;

              resolve(); // Resolve the file upload promise
            })
            .on('error', (error) => {
              // console.error('Error uploading to Google Cloud Storage:', error);
              reject(new Error(`Error uploading to Google Cloud Storage: ${error.message}`));
            });
        } catch (error: any) {
          // console.error('Error uploading file to Google Cloud Storage:', error);
          reject(new Error(`Error uploading file to Google Cloud Storage: ${error.message}`));
        }
      });
    });

    fileUploadPromiseArr.push(fileUploadPromise); // Add the file upload promise to the array
  });

  // Handle completion of form processing
  return new Promise((resolve, reject) => {
    busboy.on('finish', async () => {
      try {
        // If no files were uploaded, set a default value for file_upload
        if (fileUploadPromiseArr.length === 0) {
          // console.log('No files uploaded, setting file_upload to default.');
          formData.file_upload = ''; // Set to an empty string or `null`
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
        // console.error('Error saving data:', error);
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