"use server";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
};

export async function getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp: timestamp,
            folder: "next",
        },
        cloudinaryConfig.api_secret
    );
    console.log({ "signature is ": signature });
    return {
        timestamp,
        signature,
    };
}

export async function saveToDatabase({ public_id, version, signature }) {
    console.log({ public_id, version, signature });
    const expectedSignature = cloudinary.utils.api_sign_request(
        { public_id, version },
        cloudinaryConfig.api_secret
    );
    console.log({ "expectedSignature is ": expectedSignature });
    if (expectedSignature !== signature) {
        console.log("Invalid signature");
        throw new Error("Invalid signature");
    } else {
        // get the image url
        const url = cloudinary.url(public_id, {
            version,
            secure: true,
            cloud_name: process.env.CLOUDINARY_CLUD_NAME, // Make sure this is the correct value
        });
        console.log({ url });
        return url;
    }
}
