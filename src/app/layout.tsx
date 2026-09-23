import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { env } from "@/lib/env";

import "./globals.css";
import "./work-led.css";
import "./personal-practice.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-practice-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-practice-editorial",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: "Rick Vang",
  description: "Portfolio foundation for rickvang.com.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`}>{children}</body>
    </html>
  );
}
