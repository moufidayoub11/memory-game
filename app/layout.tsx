import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memory Game - Test Your Memory Skills",
  description: "A polished memory card matching game with combo system, particle effects, and dynamic audio. Built with Next.js, React, and TypeScript.",
  keywords: [
    "memory game",
    "card matching game",
    "brain training",
    "puzzle game",
    "memory test",
    "concentration game",
    "React game",
    "Next.js game",
    "TypeScript game",
    "web game",
    "browser game",
    "memory skills",
    "cognitive training"
  ],
  authors: [{ name: "Moufid Ayoub" }],
  creator: "Moufid Ayoub",
  publisher: "Moufid Ayoub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://memory-game-seven-indol.vercel.app',
    siteName: 'Memory Game',
    title: 'Memory Game - Test Your Memory Skills',
    description: 'Challenge your memory with this polished card matching game featuring combo systems, particle effects, and dynamic audio synthesis.',
  },
  twitter: {
    card: 'summary',
    title: 'Memory Game - Test Your Memory Skills',
    description: 'Challenge your memory with this polished card matching game featuring combo systems and dynamic audio.',
    creator: '@moufidayoub11',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Memory Game',
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: new URL('https://memory-game-seven-indol.vercel.app'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="application-name" content="Memory Game" />
        <meta name="apple-mobile-web-app-title" content="Memory Game" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
