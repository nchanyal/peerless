"use server";
import { utapi } from "@/server/uploadthing";

export async function deleteFile(fileKey: string | null) {
  // Quit the function if the fileKey is null
  if (!fileKey) return;

  try {
    await utapi.deleteFiles(fileKey);
  } catch (error) {
    console.log("Error in deleteFile", error);
  }
}
