import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import csrf from 'csrf';
import { Storage } from '@google-cloud/storage';
import * as fs from 'fs';
import * as path from 'path';

const tokens = new csrf();

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // GCS credentials path
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME as string);

// Set formidable options
const form = new IncomingForm({
  keepExtensions: true,
  uploadDir: './tmp'
});

export const config = {
  api: {
    bodyParser: false, // Disable the built-in body parser to handle FormData manually
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Handle the incoming form data
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing form data' });
    }

    // CSRF Token Validation
    const csrfToken = fields.csrfToken as unknown as string;
    if (!csrfToken || !tokens.verify(process.env.CSRF_SECRET as string, csrfToken)) {
      return res.status(403).json({ error: 'Invalid CSRF token' });
    }

    // Check if file_upload is present
    const file = files.file_upload;
    if (!file || !Array.isArray(file) || file.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Get the uploaded file (it will be saved in the temp directory)
      const uploadedFile = file[0];
      const filePath = uploadedFile.filepath; // Path of the temporary file in your server

      // Generate a unique file name (timestamp or UUID)
      const uniqueFileName = `${Date.now()}.mp3`; // You can use UUID here if needed

      // Create a file in the bucket and upload the buffer
      const gcsFile = bucket.file(uniqueFileName);
      const stream = gcsFile.createWriteStream({
        metadata: {
          contentType: uploadedFile.mimetype ?? 'application/octet-stream', // Content type from the uploaded file
        },
      });

      // Pipe the file from the temporary location to the GCS bucket
      fs.createReadStream(filePath).pipe(stream);

      stream.on('finish', () => {
        // Once upload is complete, respond with the file URL or path
        const fileUrl = `https://storage.googleapis.com/${bucket}/${uniqueFileName}`;
        res.status(200).json({ success: true, filePath: fileUrl });

        // Optionally, delete the temporary file from the server after upload
        fs.unlinkSync(filePath);
      });

      stream.on('error', (err) => {
        console.error('Error uploading file:', err);
        res.status(500).json({ error: 'Failed to upload file' });

        // Optionally, delete the temporary file in case of error
        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.error('Error handling upload:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
