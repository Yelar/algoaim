import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "algoaim",
  description: "AI tool for optimizing the coding interview process, enhancing candidate evaluation, streamlining hiring decisions, and providing learning resources for job seekers and students in the tech industry."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Analytics/>

      </body>
    </html>
  );
}
