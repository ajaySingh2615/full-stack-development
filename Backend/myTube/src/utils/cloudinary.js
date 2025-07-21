import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded to cloudinary", response.secure_url);
    // once the file is uploaded, delete it from the local file system
    fs.unlinkSync(localFilePath);
    return response;
    // return the uploaded file url
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadToCloudinary };
