import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';
import Header from '@/components/header';
import { GlobalContextProvider } from '@/contexts/global-context';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'AffinityBuy - Your Ultimate Shopping Destination!',
  description: 'Affinity Buy is an ecommerce platform where you can buy and sell products.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <GlobalContextProvider>
          <Header />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
