import { navigation, profile } from "@/data/content";
import { siteConfig } from "@/lib/site";
import { MobileNav } from "./mobile-nav";
import { buttonClass } from "@/components/ui/button";
import { InPageLink } from "@/components/ui/in-page-link";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        {/*
          "/#top" rather than "/". A bare "/" resolves to the page that is
          already open, which the router treats as nothing to do, so clicking
          the name while parked further down the homepage did not scroll.
        */}
        <InPageLink
          href="/#top"
          className={styles.brand}
          aria-label={`${profile.name}, home`}
        >
          <span aria-hidden="true" className={styles.mark}>
            AP
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{profile.name}</span>
            <span className={styles.brandRole}>{profile.role}</span>
          </span>
        </InPageLink>

        <nav aria-label="Primary" className={styles.nav}>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.href}>
                <InPageLink href={item.href} className={styles.navLink}>
                  {item.label}
                </InPageLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <InPageLink
            href="/#contact"
            className={buttonClass({ size: "md", className: styles.contactLink })}
          >
            Contact
          </InPageLink>
          <MobileNav items={navigation} email={siteConfig.email} />
        </div>
      </div>
    </header>
  );
}
