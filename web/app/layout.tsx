import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '榫卯 PulCore · 低代码业务平台',
  description: '元数据驱动、微内核、插件化的企业级低代码业务平台。',
  openGraph: {
    title: '榫卯 PulCore',
    description: '元数据驱动的微内核低代码平台',
    images: [{ url: '/og.png', width: 1730, height: 909, alt: '榫卯 PulCore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '榫卯 PulCore',
    description: '元数据驱动的微内核低代码平台',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
