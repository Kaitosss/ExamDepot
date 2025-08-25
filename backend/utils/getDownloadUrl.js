import cloudinary from "../lib/cloudinary.js";

export const getDownloadUrl = (publicId,originalFileName) => {
    return cloudinary.url(publicId,{
        resource_type:"raw",
        flags:"attachment",
        attachment:originalFileName,
        sign_url:true,
        expires_at: Math.floor(Date.now() / 1000) + 3600
    })
}