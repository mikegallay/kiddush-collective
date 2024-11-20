import { NextResponse } from "next/server";
import csrf from 'csrf';
import { encrypt, decrypt } from '@/app/utils/encryptionHelper';
import clientPromise from "@/lib/mongodb";

const tokens = new csrf();

export async function POST(req: Request) {
  try {
    const secret = process.env.CSRF_SECRET || 'your-secret-key';
    // Parse the incoming JSON data
    const data = await req.json();

    // Validate data (optional)
    // if (!data.firs_tname || !data.last_initial) {
    //   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    // }

    // Validate CSRF Token
    if (!tokens.verify(secret, data.csrfToken)) {
      return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
    }

    const encryptedEmail = encrypt(data.email);
    // console.log('encryptedEmail',encryptedEmail);
    // console.log('decryptedEmail',decrypt(encryptedEmail));
    // return;

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    //remove csrfToken before saving to db
    const { csrfToken, ...dataWithoutCsrf } = data;

    // Insert the data into a collection
    const result = await db.collection("submissions").insertOne({
      ...dataWithoutCsrf,
      email: encryptedEmail.content, // Store encrypted email
      iv: encryptedEmail.iv,         // Store the IV for decryption later
      createdAt: new Date()

    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
