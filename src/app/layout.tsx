import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { ToastProvider } from '@/components/ui/toast';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cowema Jobs',
  description: 'Find your dream job in Congo-Brazzaville',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main>{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}