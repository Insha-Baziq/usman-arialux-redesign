"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

export function DisableDraftMode() {
  const isPresentationTool = useIsPresentationTool();

  if (isPresentationTool) return null;

  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed bottom-4 right-4 z-[1000] rounded-full bg-black px-4 py-2 text-sm font-medium text-white shadow-lg"
    >
      Disable Draft Mode
    </a>
  );
}
