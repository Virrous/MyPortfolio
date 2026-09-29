import { profile } from "@/data/content";
import { buttonClass, ArrowIcon, ExternalArrowIcon } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import styles from "./hero.module.css";
import { InPageLink } from "@/components/ui/in-page-link";

export function Hero() {
  return (
    <section
      id="top"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className={styles.hero}
    >
      <div aria-hidden="true" className={styles.wash} />

      <div className="shell">
        <div className={styles.intro}>
          <Reveal>
            <p className={`eyebrow ${styles.introEyebrow}`}>
              <span aria-hidden="true" className="eyebrow-dots" />
              {profile.companyName}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 id="hero-title" className={`display-1 ${styles.title}`}>
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className={styles.role}>
              {profile.role} at {profile.companyName}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className={styles.disciplines}>
              System Analyst · System Architect · Product Builder
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className={styles.statement}>{profile.statement}</p>
          </Reveal>

          <Reveal delay={320}>
            <div className={styles.actions}>
              <InPageLink href="/#work" className={buttonClass({ size: "lg" })}>
                View My Work
                <ArrowIcon />
              </InPageLink>
              <InPageLink
                href="/#contact"
                className={buttonClass({ size: "lg", variant: "secondary" })}
              >
                Contact Me
              </InPageLink>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={380}>
          <div className={styles.socials}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <LinkedInIcon className={styles.socialIcon} />
              LinkedIn
              <ExternalArrowIcon className={styles.socialArrow} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <GitHubIcon className={styles.socialIcon} />
              GitHub
              <ExternalArrowIcon className={styles.socialArrow} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
