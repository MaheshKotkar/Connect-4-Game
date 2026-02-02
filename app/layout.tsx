import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { MusicProvider } from "./src/context/MusicContext";
import { ThemeProvider } from "./src/context/ThemeContext"; // Added ThemeProvider import
import ScrollToTop from "./src/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Four-in-a-Row",
  description: "Challenge the AI and connect four to win!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MusicProvider>
          <ThemeProvider> {/* Wrapped content with ThemeProvider */}
            {children}
            <ScrollToTop />
          </ThemeProvider>
        </MusicProvider>
      </body>
    </html>
  );
}
