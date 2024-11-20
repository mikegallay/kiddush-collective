import crypto from 'crypto';

// Define the structure for the encrypted data
interface EncryptedData {
  iv: string; // Initialization vector
  content: string; // Encrypted content
}

// Fetch encryption key and IV length from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const IV_LENGTH = parseInt(process.env.IV_LENGTH || '16', 10);

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error('ENCRYPTION_KEY must be 32 characters long and set in the environment variables.');
}

// Encryption function
function encrypt(data: string): EncryptedData {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY as string), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    content: encrypted,
  };
}

// Decryption function
function decrypt(encrypted: EncryptedData): string {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY as string),
    Buffer.from(encrypted.iv, 'hex')
  );
  let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export { encrypt, decrypt };
