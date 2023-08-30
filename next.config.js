/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    env: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
        NEXT_PUBLIC_CLOUDINARY_API_KEY:
            process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
};

module.exports = nextConfig;
