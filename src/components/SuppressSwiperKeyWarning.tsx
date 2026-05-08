"use client";

import { useEffect } from "react";

export function SuppressSwiperKeyWarning() {
  useEffect(() => {
    const orig = console.error.bind(console);
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("unique") && args[0].includes("key")) return;
      orig(...args);
    };
    return () => {
      console.error = orig;
    };
  }, []);
  return null;
}
