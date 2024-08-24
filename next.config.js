/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  distDir: "dist",
  reactStrictMode: true,
  basePath: "/engida",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
