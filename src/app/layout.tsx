import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dock from "@/components/Dock";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";
import { DataProvider } from "@/contexts/DataContext";
import { CSPostHogProvider } from '../components/PosthogProvider'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

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
        <CSPostHogProvider>

          <UserProvider>
            <DataProvider>
              <PostHogPageView />
              <div>
                <Navbar />
              </div>

              {children}

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
