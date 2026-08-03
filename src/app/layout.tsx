import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FC2026 T-Shirt Showcase',
  description:
    'Browse FC2026 Premium and Standard T-shirts, select your size and colour, and submit your order intent.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-gray-100 text-gray-900 overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
