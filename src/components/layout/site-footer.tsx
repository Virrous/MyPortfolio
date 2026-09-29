import { profile } from "@/data/content";
import styles from "./site-footer.module.css";

const footerLinks = [
  { label: "Nepsof", href: profile.companyUrl, external: true },
  { label: "LinkedIn", href: profile.linkedin, external: true },
  { label: "GitHub", href: profile.github, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <div>
            <p className={styles.name}>{profile.name}</p>
            <p className={styles.role}>
              {profile.role} &middot; {profile.companyName}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className={styles.linkList}>
              {footerLinks.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`link-underline ${styles.link}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`link-underline ${styles.link}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {year} {profile.name}
          </p>
          <p className={styles.credit}>
            +977 9869334194
          </p>
        </div>
      </div>
    </footer>
  );
}
