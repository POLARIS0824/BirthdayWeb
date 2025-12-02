// Security utilities for authentication

/**
 * Validates user input against stored hash
 * Uses SHA-256 hashing with Web Crypto API
 */
export const validateInput = async (input: string, targetHash: string): Promise<boolean> => {
  try {
    const normalized = input.toLowerCase().trim();
    const encoder = new TextEncoder();
    const data = encoder.encode(normalized);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Use timing-safe comparison to prevent timing attacks
    return timingSafeEqual(hashHex, targetHash);
  } catch {
    return false;
  }
};

/**
 * Timing-safe string comparison to prevent timing attacks
 */
const timingSafeEqual = (a: string, b: string): boolean => {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
};

/**
 * Generate obfuscated hash parts
 * This makes it harder to search for the complete hash in the codebase
 */
export const getHashParts = (): string[] => {
  // Split hash into random-looking parts
  const parts = [
    "d929cb0c",
    "2676db6f",
    "fef71da5",
    "e8e09acb",
    "7494e53a",
    "b7355c7a",
    "6c3249c9",
    "dc4fea16"
  ];

  return parts;
};

/**
 * Reconstruct the complete hash from parts
 */
export const reconstructHash = (parts: string[]): string => {
  return parts.join('');
};
