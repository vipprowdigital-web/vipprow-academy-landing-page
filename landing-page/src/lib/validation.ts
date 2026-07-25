/**
 * Helper utilities for form validations across Vipprow Academy application.
 */

/**
 * Validates whether an email address is a valid Gmail account (@gmail.com).
 */
export function isValidGmail(email: string): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  // Validates standard gmail address format ending in @gmail.com
  return /^[a-z0-9._%+-]+@gmail\.com$/.test(trimmed);
}

/**
 * Validates whether a phone number is a valid 10-digit mobile number.
 * Ensures input is non-empty, contains only digits, is no more than 10 digits, and is 10 digits long.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/\D/g, "");
  // Must be exactly 10 digits long and start with standard 6-9 digits
  return clean.length === 10 && /^[6-9]\d{9}$/.test(clean);
}
