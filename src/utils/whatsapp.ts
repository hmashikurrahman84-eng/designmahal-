/**
 * Helper to normalize and format WhatsApp phone numbers for Bangladesh & International formats
 */
export const formatWhatsAppNumber = (raw?: string): string => {
  if (!raw) return '8801629947628';
  let cleaned = raw.replace(/[^0-9]/g, '');

  // If user entered +881629947628 (88 followed by 10 digits starting with 1, omitting 0)
  if (cleaned.startsWith('881') && cleaned.length === 12) {
    cleaned = '880' + cleaned.slice(2);
  } else if (cleaned.startsWith('01') && cleaned.length === 11) {
    cleaned = '880' + cleaned.slice(1);
  } else if (cleaned.startsWith('1') && cleaned.length === 10) {
    cleaned = '880' + cleaned;
  }

  return cleaned || '8801629947628';
};

export const getWhatsAppLink = (rawNumber?: string, message?: string): string => {
  const number = formatWhatsAppNumber(rawNumber);
  const baseUrl = `https://wa.me/${number}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
};
