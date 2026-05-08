import type { Metadata } from "next";
import "./globals.css";
import { SuppressSwiperKeyWarning } from "@/components/SuppressSwiperKeyWarning";

export const metadata: Metadata = {
  title: "AriaLux Homes | Custom Home Builder & Architectural Firm — Fort Wayne, IN",
  description:
    "AriaLux Homes designs and builds bespoke custom residences in Fort Wayne, Indiana. Explore our floor plans, interior finishes, completed portfolio, and architectural services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <SuppressSwiperKeyWarning />
        {children}
      </body>
    </html>
  );
}
