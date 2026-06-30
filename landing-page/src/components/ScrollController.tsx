// components/ScrollController.tsx
"use client";

import { useEffect } from "react";
import { initScrollEngine } from "@/lib/scrollEngine";

export default function ScrollController() {
  useEffect(() => {
    const cleanup = initScrollEngine();
    return cleanup;
  }, []);

  return null;
}
