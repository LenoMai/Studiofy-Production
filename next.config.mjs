/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/index.html'
      },
      {
        source: '/:path*/',
        destination: '/index.html'
      },
    ];
  },
};

export default nextConfig;
