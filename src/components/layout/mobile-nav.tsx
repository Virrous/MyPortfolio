"use client";

import { useEffect, useRef, useState } from "react";
import { InPageLink } from "@/components/ui/in-page-link";
import { cn } from "@/lib/cn";
import styles from "./mobile-nav.module.css";

type NavItem = { label: string; href: string };

export function MobileNav({
  items,
  email,
}: {
  items: readonly NavItem[];
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    // Prevent the page behind the panel from scrolling.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className={styles.root}>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className={cn(styles.toggle, open && styles.toggleOpen)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className={styles.bars}>
          <span
            className={cn(styles.bar, styles.barTop, open && styles.barTopOpen)}
          />
          <span
            className={cn(
              styles.bar,
              styles.barMiddle,
              open && styles.barMiddleOpen,
            )}
          />
          <span
            className={cn(
              styles.bar,
              styles.barBottom,
              open && styles.barBottomOpen,
            )}
          />
        </span>
      </button>

      {open ? (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          className={styles.panel}
        >
          <nav aria-label="Mobile">
            <ul className={styles.list}>
              {items.map((item) => (
                <li key={item.href} className={styles.item}>
                  <InPageLink
                    href={item.href}
                    onNavigate={() => setOpen(false)}
                    className={styles.itemLink}
                  >
                    {item.label}
                    <span aria-hidden="true" className={styles.itemArrow}>
                      &rarr;
                    </span>
                  </InPageLink>
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <a href={`mailto:${email}`} className={styles.email}>
                {email}
              </a>
              <p className={styles.meta}>
                Co-Founder &amp; CEO &middot; Nepsof Enterprise Pvt. Ltd.
              </p>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
