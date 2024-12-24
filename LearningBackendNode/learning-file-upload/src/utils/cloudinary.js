import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Config cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async function(localFilePath) {
    try {
        if (!localFilePath) {
            return null;
        }
        // We are uploading the file from local
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // It will auto identify the type of file
        });

        // Now file has been uploaded.
        console.log("Congratulations, file has been uploaded successfully...\nURL of file:", response.url);
        
        // Now delete the file (or unlink)
        fs.unlink(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};

export { uploadOnCloudinary };