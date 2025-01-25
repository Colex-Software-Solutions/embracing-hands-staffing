/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  images: {
    domains: ["embracing-hands-staffing.s3.us-east-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
