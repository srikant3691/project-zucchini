import type { Metadata } from "next";
import { Inria_Sans } from "next/font/google";
import "./globals.css";

const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-sans",
});

export const metadata: Metadata = {
  title: "Nitrutsav 2026",
  description: "Nitrutsav 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inriaSans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
