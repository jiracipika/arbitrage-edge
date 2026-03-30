/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@repo/core', '@repo/ui'],
};

module.exports = nextConfig;
