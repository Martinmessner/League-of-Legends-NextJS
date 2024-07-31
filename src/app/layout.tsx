import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lol Metrics",
  description: "Lol Metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <link rel="icon" href="/lol.ico" type="image/x-icon" sizes="16x16" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
