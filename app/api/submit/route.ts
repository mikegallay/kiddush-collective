import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON data
    const data = await req.json();

    // Validate data (optional, based on your needs)
    // if (!data.firstName || !data.lastName) {
    //   return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    // }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Insert the data into a collection
    const result = await db.collection("submissions").insertOne(data);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
