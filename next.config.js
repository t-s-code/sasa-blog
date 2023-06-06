const withTwin = require('./withTwin.js')

/** @type {import('next').NextConfig} */
const nextConfig = withTwin({
  reactStrictMode: true,
  experimental: { appDir: false },
  images: {
    domains: ['s3.us-west-2.amazonaws.com', 'www.notion.so', 'sasa-blog.vercel.app'],
  },
})

module.exports = nextConfig
