/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "avatars.githubusercontent.com"],
  },
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL || "http://localhost:3000/api",
  },
};

module.exports = nextConfig;
