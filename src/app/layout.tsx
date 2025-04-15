import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

// Initialize Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SKPro",
  description: "A centralized web application to simplify KK Profiling and youth data management for SK Officials",
  icons: {
    icon: '/SKPro-Logo.svg',
    apple: '/SKPro-Logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-background ${poppins.variable} font-poppins`}>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 