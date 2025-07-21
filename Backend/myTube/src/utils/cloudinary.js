import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

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
    console.log("Error on Cloudinary", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const response = await cloudinary.uploader.destroy(publicId);
    console.log("File deleted from cloudinary", response);
    return response;
  } catch (error) {
    console.log("Error deleting on Cloudinary", error);
    return null;
  }
};

export { uploadToCloudinary, deleteFromCloudinary };
