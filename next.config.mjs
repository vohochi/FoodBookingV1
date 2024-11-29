/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: [
    //   'foodbookingapi.onrender.com',
    //   'drive.google.com',
    // ],
    // unoptimized: true
    //-------------------------------------------------
    remotePatterns: [
      {
        protocol: 'https', // Sử dụng http nếu server local của bạn không hỗ trợ https
        hostname: 'foodbookingapi.onrender.com', // Tên miền localhost
        port: '', // Cổng mà server của bạn đang chạy
        pathname: '/**', // Đảm bảo rằng mọi đường dẫn dưới localhost đều hợp lệ
      },
    ],
    unoptimized: true, // Tắt tối ưu hóa ảnh khi sử dụng static export
  },
};

export default nextConfig;
