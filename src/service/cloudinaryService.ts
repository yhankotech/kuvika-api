import {v2 as cloudinary } from "cloudinary";
import { env } from "@/config/env";

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
})


class CloudinaryService {
    /**
     * Upload an image to Cloudinary
     * @param image - The image file to upload
     * @returns The URL of the uploaded image
     */

    async upload(fileBuffer: Buffer, fileName: string, folder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                folder,
                public_id: fileName,
                format:"jpg",
                overwrite: true,
                resource_type: "image"
            },
            (error: any, result: any) => {
                if(error) return reject(error);
                resolve(result?.secure_url);
            }
        ).end(fileBuffer)
        });
    }

    /**
     * @param public_id
     */

    async destroy(public_id: string): Promise<void> {
        return new Promise((resolve, reject) => {
           cloudinary.uploader.destroy(
            public_id,
            { resource_type: "image" },
            (error: any, result: any) => {
                if(error) return reject(error);
                resolve();
            }
           )
        });
    }
}

export default new CloudinaryService()