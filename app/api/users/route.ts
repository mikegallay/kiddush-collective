import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    // Parse query parameters from the URL
    const url = new URL(request.url);
    const filters = JSON.parse(url.searchParams.get('filters') || '[]');
    filters.push({property: 'approved', value: 'true'}); //make sure that only approved users are displayed

    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Build the MongoDB query based on the filters
    const query: Record<string, any> = {};
    filters.forEach(({ property, value }: { property: string; value: string }) => {
      if (property && value) {
        query[property] = value;
      }
    });

    // Fetch filtered users
    const users = await db
      .collection('submissions')
      .find(query)
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
