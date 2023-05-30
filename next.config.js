/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: false },
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so'],
  },
}

module.exports = nextConfig
