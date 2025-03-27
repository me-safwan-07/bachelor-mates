// import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" translate="no" suppressHydrationWarning>
      {/* <SpeedInsights sampleRate={0.1} /> */}
      <body className="flex h-dvh flex-col transition-all ease-in-out" suppressHydrationWarning>
          {/* <Navbar /> */}
          {children}
          {/* <Footer /> */}
      </body>
    </html>
  );
}
