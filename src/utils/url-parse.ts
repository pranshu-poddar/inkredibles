export const encodeUrl = (url:string) =>{
  // Use encodeURIComponent to encode all URL-unfriendly characters:
  const encoded = encodeURIComponent(url);

  // Optionally replace specific characters for readability (if desired):
  const processed = encoded
    .replace(/%3A/g, "-") // Replace colons with hyphens (optional)
    .replace(/%20/g, "-") // Replace spaces with hyphens (optional)
    // Add more replacements as needed, ensuring consistency

  return processed;
}
export const decodeUrl = (encodedUrl: string) => {
  // Revert the optional replacements:
  const reverted = encodedUrl
    .replace(/-/g, "%20") // Revert hyphens to spaces (optional)
    .replace(/-/g, "%3A") // Revert hyphens to colons (optional)
    // Add more reversions as needed, ensuring consistency

  // Use decodeURIComponent to decode the URL:
  const decoded = decodeURIComponent(reverted);

  return decoded;
}