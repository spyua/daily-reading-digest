import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Noto_Sans_TC } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteNav } from '@/components/site-nav';
import { PanguProvider } from '@/components/pangu-provider';
import { SITE_URL } from '@/lib/config';
import './globals.css';

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-tc',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Daily Reading Digest',
  description: '個人閱讀文章的結構化分析留存',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${GeistSans.variable} ${GeistMono.variable} ${notoSansTC.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PanguProvider>
            <SiteNav />
            {children}
          </PanguProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
