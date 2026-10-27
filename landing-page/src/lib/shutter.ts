type ShutterWindow = Window & { __shutterComplete?: boolean };

/**
 * Runs `cb` once the page-load splash has finished (or immediately if it
 * already has). A fallback timer guarantees hero content is never left hidden
 * if the splash event is missed. Returns a cleanup function.
 */
export function whenShutterDone(cb: () => void, fallbackMs = 4500) {
  const w = window as ShutterWindow;
  if (w.__shutterComplete) {
    cb();
    return () => {};
  }

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    cb();
  };
  window.addEventListener("shutter-complete", run, { once: true });
  const timer = window.setTimeout(run, fallbackMs);

  return () => {
    window.removeEventListener("shutter-complete", run);
    window.clearTimeout(timer);
  };
}
