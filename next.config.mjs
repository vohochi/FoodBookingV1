/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002', // Cổng của server
        pathname: '/images/**', // Đường dẫn đến hình ảnh
      },
    ],
  },
  // output: 'export',
};

export default nextConfig;
