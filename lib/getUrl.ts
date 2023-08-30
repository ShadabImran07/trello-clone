import { storage } from "@/appwrite";

const geturl = async (image: Image) => {
	const url = storage.getFilePreview(image.bucketId, image.filedId);
	return url;
};

export default geturl;
