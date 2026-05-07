import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
