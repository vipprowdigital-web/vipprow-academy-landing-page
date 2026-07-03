'use client';

import SmoothScroll from './SmoothScroll';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      {children}
    </>
  );
}
