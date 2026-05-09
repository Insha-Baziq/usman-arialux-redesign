import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";

import "./globals.css";
import { DisableDraftMode } from "@/components/DisableDraftMode";
import { SuppressSwiperKeyWarning } from "@/components/SuppressSwiperKeyWarning";

export const metadata: Metadata = {
  title: "AriaLux Homes | Custom Home Builder & Architectural Firm — Fort Wayne, IN",
  description:
    "AriaLux Homes designs and builds bespoke custom residences in Fort Wayne, Indiana. Explore our floor plans, interior finishes, completed portfolio, and architectural services.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <html lang="en" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <SuppressSwiperKeyWarning />
        {children}
        {isDraftMode ? (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        ) : null}
      </body>
    </html>
  );
}
