import { NextResponse } from 'next/server';
import csrf from 'csrf';

const tokens = new csrf();

export async function GET() {
  const secret = process.env.CSRF_SECRET || 'your-secret-key'; // Use an environment variable for the secret.
  const csrfToken = tokens.create(secret);

  return NextResponse.json({ csrfToken });
}
