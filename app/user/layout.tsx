import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Josefin_Sans } from 'next/font/google';
import { ReservationProvider } from '@/_components/ReservationContext';
import Header from '@/_components/Header';
import Footer from '@/_components/Footer';
import '@/app/_styles/globals.css';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'optional',
});

export const metadata = {
  title: {
    template: '%s / FoodBooking Home',
    default: 'Welcome / FoodBooking Home',
  },
  description:
    'Cửa hàng thực phẩm sang trọng, nằm ở trung tâm của Việt Nam, được bao quanh bởi khung cảnh tuyệt đẹp không gian chill thư giản ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className}`}>
        <Header />
        <ReservationProvider>{children}</ReservationProvider>
        <Footer />

        {/* <script src="/animations/main.js" defer></script> */}
      </body>
    </html>
  );
}
