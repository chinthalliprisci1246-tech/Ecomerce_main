// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SessionProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "eKart — Modern E-Commerce Store",
    template: "%s | eKart",
  },
  description:
    "Shop the latest products at eKart. New arrivals, bestsellers, hot deals and more.",
  keywords: ["ecommerce", "shop", "deals", "furniture", "online store"],
  openGraph: {
    siteName: "eKart",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Header />
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster position="top-right" richColors />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}