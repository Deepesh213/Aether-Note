import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import ConvexClientProvider from "@/components/provider/convex-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/provider/modal.provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aether Note",
  description: "Note Taking App",
  icons:{
    icon:[
      {
        media: "(prefers-color-scheme: light)",
        url:"/logo-dark.svg",
        href: "/logo-dark.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url:"/logo-light.svg",
        href: "/logo-dark.svg",
      }

    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider afterSignOutUrl="/">
            <ConvexClientProvider>
              <EdgeStoreProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                  disableTransitionOnChange
                  storageKey = "aether-theme"
                >
                  <Toaster position="bottom-center"/>
                  <ModalProvider/>
                  {children}
              </ThemeProvider>
            </EdgeStoreProvider>
        </ConvexClientProvider>
        </ClerkProvider>

      </body>
    </html>
  );
}
