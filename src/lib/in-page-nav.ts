/**
 * Navigation decisions for in-page links.
 *
 * Kept free of React and the DOM so the rules can be read in one place and
 * tested directly. The component in `ui/in-page-link.tsx` only carries out
 * whatever these functions decide.
 *
 * Why any of this is needed: `next/link` is the correct tool for changing
 * routes, but a link whose href resolves to the page you are already on gives
 * the router nothing to do. The URL does not change, so nothing re-renders and
 * nothing scrolls. Clicking the name in the navbar while parked at the bottom
 * of the homepage was therefore a silent no-op. Leaving these cases to the
 * router is also what made the behaviour feel intermittent, since it only
 * worked on the journeys that happened to leave a hash in the URL.
 */

export type NavDecision =
  /** Let `next/link` or the browser handle the click. */
  | { kind: "delegate" }
  /** The target is on the current page, so scroll to it in place. */
  | { kind: "scroll"; id: string; toTop: boolean };

/**
 * Splits an href into the path and hash it points at, resolved against the
 * path of the page currently shown.
 *
 * An empty pre-hash segment means "this page", so `#about` and `/#about` both
 * resolve to the current path. That is the distinction that matters here: the
 * header used to emit bare `#about`, which silently stopped working on any
 * route other than the homepage.
 */
export function splitHref(
  href: string,
  currentPathname: string,
): { pathname: string; hash: string } {
  const hashAt = href.indexOf("#");
  const hash = hashAt === -1 ? "" : href.slice(hashAt + 1);
  const beforeHash = hashAt === -1 ? href : href.slice(0, hashAt);
  return {
    pathname: beforeHash === "" ? currentPathname : beforeHash,
    hash,
  };
}

export function decideNav({
  href,
  currentPathname,
  topId,
  hasElement,
}: {
  href: string;
  currentPathname: string;
  /** Id that means "the very top of the document", not just a section. */
  topId: string;
  hasElement: (id: string) => boolean;
}): NavDecision {
  const { pathname, hash } = splitHref(href, currentPathname);

  // A different path is a real route change and belongs to the router.
  if (pathname !== currentPathname) return { kind: "delegate" };
  // No hash, so there is no in-page target to aim at.
  if (!hash) return { kind: "delegate" };
  // A hash with no matching element is a broken anchor. Let the default happen
  // rather than swallowing the click and doing nothing.
  if (!hasElement(hash)) return { kind: "delegate" };

  return { kind: "scroll", id: hash, toTop: hash === topId };
}

/**
 * True for an ordinary left click that the page should act on.
 *
 * Anything else belongs to the browser: a new tab, a new window, a download, or
 * a click another handler already claimed.
 */
export function isPlainLeftClick(event: {
  defaultPrevented: boolean;
  button: number;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
}): boolean {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}
