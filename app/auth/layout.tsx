import ReservationProviderAuth from '@/_components/ReservationContextAuth';
import { auth, login } from '@/_lib/auth';
import { Josefin_Sans } from 'next/font/google';

export const metadata = {
  title: {
    template: '%s / Auth FoodBooking',
    default: 'Welcome / FoodBooking',
  },
  description: 'Các món ăn, và nước uống ngon và đa dạng ',
};
// _app.tsx

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'optional',
});
const intialSession = async () => {
  const session = await auth();
  console.log(`đây là session: ${session}`);
  if (session) {
    {
      const res = await login({
        email: 'chivo241023icloud@gmail.com',
        password: 'vohochi',
      });
      console.log(res);
    }
  }
};
intialSession();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className}`}>
        <ReservationProviderAuth>{children}</ReservationProviderAuth>

        {/* <script src="/animations/main.js" defer></script> */}
      </body>
    </html>
  );
}
