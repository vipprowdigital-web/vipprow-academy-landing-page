// Shared loader for the lazy Meta Pixel components. Meta supports several
// pixels on one page: the first one installs the `fbq` queue and fbevents.js,
// later ones only `init` and fire their own PageView with `trackSingle`
// (a plain `track` would fire PageView again for every pixel already on the page).

declare global {
  interface Window {
    fbq: ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[][];
      loaded: boolean;
      version: string;
      push?: (...args: unknown[]) => void;
      _fbq?: Window["fbq"];
    };
    _fbq?: Window["fbq"];
    /** Set when fbq was installed by loadMetaPixel (as opposed to GTM or a hand-pasted snippet). */
    __lazyFbq?: boolean;
  }
}

const started = new Set<string>();

/**
 * @param skipIfForeign Do nothing when `fbq` was installed by something else
 *   (e.g. GTM), so a pixel that tag already fires is not double-counted.
 */
export function loadMetaPixel(
  pixelId: string,
  { skipIfForeign = false }: { skipIfForeign?: boolean } = {},
) {
  if (started.has(pixelId)) return;
  started.add(pixelId);

  const existing = (window as Partial<Window>).fbq;

  if (!existing) {
    // Command-queue stub: fbevents.js replays anything queued here once it loads.
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Window["fbq"];
    fbq.push = fbq;
    fbq.loaded = false;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    window.__lazyFbq = true;

    fbq("init", pixelId);
    fbq("track", "PageView");

    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.async = true;
    document.head.appendChild(script);
    return;
  }

  if (!window.__lazyFbq && skipIfForeign) return;

  existing("init", pixelId);
  existing("trackSingle", pixelId, "PageView");
}
