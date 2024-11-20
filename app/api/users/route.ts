import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Fetch the first 50 users ordered by insertion date
    const users = await db
      .collection('submissions')
      .find({})
      .sort({ createdAt: -1 }) // Newest first
      .limit(50)
      .toArray();

    // Return the response
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
