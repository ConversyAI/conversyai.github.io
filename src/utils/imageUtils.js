/**
 * Converts a Google Drive sharing link to a direct image URL
 * @param {string} url - The image URL (can be a Google Drive link or any other URL)
 * @returns {string} - Direct image URL
 */
export const convertToDirectImageUrl = (url) => {
  if (!url || typeof url !== 'string') {
    console.log('❌ Invalid URL:', url);
    return url;
  }

  console.log('🔍 Converting URL:', url);

  // Check if it's a Google Drive URL
  const drivePatterns = [
    // Pattern 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    // Pattern 2: https://drive.google.com/open?id=FILE_ID
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    // Pattern 3: https://drive.google.com/uc?id=FILE_ID
    /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of drivePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const fileId = match[1];
      // Use thumbnail format which works reliably for Google Drive images
      const directUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
      console.log('✅ Converted to:', directUrl);
      return directUrl;
    }
  }

  // If it's not a Google Drive link, return the original URL
  console.log('ℹ️ Not a Google Drive link, returning original URL');
  return url;
};

/**
 * Validates if an image URL is accessible
 * @param {string} url - The image URL to validate
 * @returns {Promise<boolean>} - True if image is accessible, false otherwise
 */
export const validateImageUrl = (url) => {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }

    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = convertToDirectImageUrl(url);
  });
};

/**
 * Gets a fallback avatar URL based on index
 * @param {number} index - Index for the avatar
 * @returns {string} - Fallback avatar URL
 */
export const getFallbackAvatar = (index = 1) => {
  return `https://i.pravatar.cc/150?img=${index}`;
};
