/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  //make distDir a sibling to the outDir
  distDir: "dist",
  reactStrictMode: true,
  basePath: "/engida",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
