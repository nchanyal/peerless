export function extractFileKey(url: string) {
  try {
    const pathname = new URL(url).pathname; // e.g., "/f/my-file-key"
    const parts = pathname.split("/");
    return parts[2] || null; // parts = ["", "f", "my-file-key"]
  } catch {
    return null;
  }
}
