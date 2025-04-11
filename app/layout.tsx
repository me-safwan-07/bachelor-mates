import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";
import type { Metadata } from 'next';
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Bachelore mate",
  description: "Bachelore mate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      {/* <SpeedInsights sampleRate={0.1} /> */}
      <body className="flex h-dvh flex-col transition-all ease-in-out">
        <NextTopLoader showSpinner={false} />
        <NuqsAdapter>
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
