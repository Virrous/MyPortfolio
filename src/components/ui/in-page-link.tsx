"use client";

import Link from "next/link";
import { useCallback, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { decideNav, isPlainLeftClick } from "@/lib/in-page-nav";
import { cn } from "@/lib/cn";

/** Section id that means "the very top of the document". */
const TOP_ID = "top";

type InPageLinkProps = {
  /**
   * Where the link points. Use an absolute in-page target such as `/#about`
   * rather than a bare `#about`, so the link still resolves when the visitor is
   * on another route.
   */
  href: string;
  className?: string;
  children: ReactNode;
  /** Runs before the scroll, e.g. to close the mobile panel. */
  onNavigate?: () => void;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

/**
 * A link that always lands on its target.
 *
 * Cross-route clicks are handed straight back to `next/link`. In-page clicks
 * are handled here, because the router does nothing useful with them: the URL
 * is unchanged, so no navigation happens and no scroll is issued. Three things
 * happen on an in-page jump that the router does not reliably do:
 *
 * 1. The scroll is issued even when the URL is already correct, so clicking the
 *    link you are already on still moves the page.
 * 2. The top anchor maps to the very top of the document. The header is
 *    `position: sticky` and therefore still occupies the top of the flow, so
 *    scrolling to the hero element itself would push it up under the header.
 * 3. Focus moves to the target. Without that, focus stays on a link at the top
 *    of the DOM while the viewport is at the bottom of the page, which reads
 *    as a glitch and strands keyboard and screen reader users.
 */
export function InPageLink({
  href,
  className,
  children,
  onNavigate,
  ...rest
}: InPageLinkProps) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isPlainLeftClick(event)) return;

      const decision = decideNav({
        href,
        currentPathname: window.location.pathname,
        topId: TOP_ID,
        hasElement: (id) => document.getElementById(id) !== null,
      });

      if (decision.kind === "delegate") return;

      const target = document.getElementById(decision.id);
      // Already checked by hasElement, but the element could be removed between
      // the two reads. Bail rather than throwing inside a click handler.
      if (!target) return;

      event.preventDefault();
      onNavigate?.();

      /*
        Deferred one frame on purpose. Closing the mobile panel releases its
        body scroll lock in an effect cleanup, which runs after this handler
        returns. Scrolling synchronously would be swallowed by a body that is
        still `overflow: hidden`.
      */
      requestAnimationFrame(() => {
        // "auto" defers to the CSS `scroll-behavior`, which is smooth by
        // default and flips to instant under `prefers-reduced-motion`. That
        // keeps the animation policy in one place instead of in JavaScript.
        if (decision.toTop) {
          window.scrollTo({ top: 0, behavior: "auto" });
        } else {
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }

        // Keep the address bar truthful and let the back button step through
        // sections. Skipped when the hash is unchanged so re-clicking the
        // current section does not pile up duplicate history entries.
        const nextHash = `#${decision.id}`;
        if (window.location.hash !== nextHash) {
          try {
            window.history.pushState(null, "", nextHash);
          } catch {
            // A refused history call must not undo the scroll that already ran.
          }
        }

        // preventScroll so focusing does not fight the scroll still in flight.
        target.focus({ preventScroll: true });
      });
    },
    [href, onNavigate],
  );

  return (
    <Link href={href} className={cn(className)} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
