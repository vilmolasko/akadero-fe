/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    BASE_CURRENCY: process.env.BASE_CURRENCY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    SECURE_TOKEN: process.env.SECURE_TOKENH,
  },
};

export default nextConfig;
