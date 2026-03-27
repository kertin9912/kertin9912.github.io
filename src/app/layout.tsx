import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kertin",
  description: "Personal resume and portfolio",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
