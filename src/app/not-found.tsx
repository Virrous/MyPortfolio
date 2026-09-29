import Link from "next/link";
import { buttonClass, ArrowIcon } from "@/components/ui/button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={`shell ${styles.section}`}>
      <p className={`eyebrow ${styles.eyebrow}`}>
        <span aria-hidden="true" className="eyebrow-dots" />
        404
      </p>
      <h1 className={styles.title}>This page does not exist.</h1>
      <p className={styles.lede}>
        The link may be out of date. Everything on this site is one page away.
      </p>
      <div className={styles.action}>
        <Link href="/" className={buttonClass({ size: "lg" })}>
          Back to home
          <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
