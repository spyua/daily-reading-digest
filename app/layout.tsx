import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Reading Digest",
  description: "個人閱讀文章的分析留存庫",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
