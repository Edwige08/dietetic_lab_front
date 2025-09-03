import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Return from "@/components/Return";
import { UserProvider } from "@/contexts/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dietetic Lab",
  description: "Outil au service des professionnels de la nutrition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mon App PWA" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-20 min-h-screen bg-(--background)`}
      >
        <UserProvider>
        <div className="hidden md:flex">
          <Navbar />
        </div>
        <Return />
          {children}
        <div className="md:hidden">
          <Dock />
        </div>
        </UserProvider>
      </body>
    </html>
  );
}
