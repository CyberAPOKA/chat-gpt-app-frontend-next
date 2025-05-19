import { PrimeReactProvider } from "primereact/api";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthRedirect from "../components/AuthRedirect";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGPT Chat App",
  description: "Chat integrado ao ChatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <head>
        <link
          id="theme-link"
          rel="stylesheet"
          href="/themes/lara-light-purple/theme.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PrimeReactProvider>
          <AuthRedirect />
          {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
