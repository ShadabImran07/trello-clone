import { storage, ID } from "@/appwrite";
const stCed = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID?.toString()!;
const uploadImage = async (file: File) => {
	if (!file) return;

	const fileUploaded = await storage.createFile(stCed, ID.unique(), file);
	return fileUploaded;
};

export default uploadImage;
