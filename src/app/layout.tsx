import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Elliot Car Rentals",
  description: "Explore and book vehicles for your next trip.",
  robots: "index, follow",
  openGraph: {
    title: "Elliot Car Rentals",
    description: "Find the perfect car for your next trip.",
    url: "https://elliotcarrentals.com",
    siteName: "Elliot Car Rentals",
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
        className={`flex min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main className="flex-1 mx-auto">{children}</main>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
