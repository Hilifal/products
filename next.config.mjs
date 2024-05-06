/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    API_URL: process.env.API_URL,
    API_CHAT_URL: process.env.API_CHAT_URL,
    VERSION: process.env.VERSION,
  }
};

export default nextConfig;
