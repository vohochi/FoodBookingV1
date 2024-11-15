/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',    // Sử dụng http nếu server local của bạn không hỗ trợ https
        hostname: 'localhost', // Tên miền localhost
        port: '3002',         // Cổng mà server của bạn đang chạy
        pathname: '/**',      // Đảm bảo rằng mọi đường dẫn dưới localhost đều hợp lệ
      },
    ],
    unoptimized: true, // Tắt tối ưu hóa ảnh khi sử dụng static export
  },
};

export default nextConfig;
