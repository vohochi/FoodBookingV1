/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foodbookingapi.onrender.com',
        port: '', // Cổng của server
        pathname: '/images/**', // Đường dẫn đến hình ảnh
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;
