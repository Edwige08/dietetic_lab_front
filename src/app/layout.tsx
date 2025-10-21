import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";
import { DataProvider } from "@/contexts/DataContext";
import { CSPostHogProvider } from '../components/PosthogProvider'
import PostHogPageView from './PostHogPageView'
import { Suspense } from 'react'

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  weight: ['400', '700'],
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
      <body className={`${josefinSans.variable} antialiased pb-20 min-h-screen bg-(--background)`}>
        <CSPostHogProvider>
          <UserProvider>
            <DataProvider>

              <Suspense fallback={null}>
                <PostHogPageView />
              </Suspense>

              <div>
                <Navbar />
              </div>

              <div className="max-w-280 m-auto">
                {children}
              </div>

              <div className="md:hidden">
                <Dock />
              </div>

            </DataProvider>
          </UserProvider>
        </CSPostHogProvider>

      </body>
    </html>
  );
}
