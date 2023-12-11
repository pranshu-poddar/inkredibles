// Import necessary libraries
import crypto from "crypto";

export function generateOTP(): string {
   return crypto.randomBytes(2).toString('hex').toUpperCase();
}
