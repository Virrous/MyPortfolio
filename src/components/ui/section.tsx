import type { ReactNode } from "react";
import styles from "./section.module.css";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Supporting detail shown centred under the heading, e.g. role chips. */
  aside?: ReactNode;
};

/**
 * Section shell: one centred column with a centred header, then the content.
 *
 * The previous version split into a 4/8 grid, which left a mostly empty rail on
 * the left and pushed the heading and body to the right. Centring the header and
 * letting the content span the full container removes that split entirely.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  aside,
}: SectionProps) {
  return (
    <section
      id={id}
      // Anchor target for the header links. tabIndex={-1} keeps it out of the
      // tab order but lets focus follow an in-page jump, so keyboard and screen
      // reader position matches the viewport.
      tabIndex={-1}
      aria-labelledby={`${id}-title`}
      className={className ? `${styles.section} ${className}` : styles.section}
    >
      <div className="shell">
        <div className={styles.header}>
          <p className="eyebrow">
            <span aria-hidden="true" className="eyebrow-dots" />
            {eyebrow}
          </p>
          <h2 id={`${id}-title`} className={`display-2 ${styles.title}`}>
            {title}
          </h2>
          {lede ? <p className={styles.lede}>{lede}</p> : null}
          {aside ? <div className={styles.aside}>{aside}</div> : null}
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
