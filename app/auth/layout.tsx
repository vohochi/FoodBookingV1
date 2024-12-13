import ReservationProviderAuth from '@/_components/ReservationContextAuth';
import { auth } from '@/_lib/auth';
import { Josefin_Sans } from 'next/font/google';

export const metadata = {
  title: {
    template: '%s / Auth FoodBooking',
    default: 'Welcome / FoodBooking',
  },
  description: 'Các món ăn, và nước uống ngon và đa dạng',
};

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'optional',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kiểm tra và xử lý session an toàn
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${josefin.className}`}>
        <ReservationProviderAuth initialSession={session}>
          {children}
        </ReservationProviderAuth>
      </body>
    </html>
  );
}
