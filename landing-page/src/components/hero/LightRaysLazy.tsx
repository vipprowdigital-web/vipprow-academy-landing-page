"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { whenShutterDone } from "@/lib/shutter";

// The WebGL library (ogl) and shader are loaded only on the client, and only
// after the page-load splash has finished — so they never compete with the
// first paint or the LCP image.
const LightRays = dynamic(() => import("../animations/LightRays"), {
  ssr: false,
});

type LightRaysProps = React.ComponentProps<typeof LightRays>;

export default function LightRaysLazy(props: LightRaysProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idle: number | undefined;
    const stopWaiting = whenShutterDone(() => {
      // Let the browser finish the splash-exit paint before starting WebGL.
      idle = window.setTimeout(() => setReady(true), 150);
    });
    return () => {
      stopWaiting();
      window.clearTimeout(idle);
    };
  }, []);

  return (
    <div
      className={`h-full w-full transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {ready && <LightRays {...props} />}
    </div>
  );
}
