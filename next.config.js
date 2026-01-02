/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  experimental: {
    typedRoutes: true
  }
};

module.exports = nextConfig;
