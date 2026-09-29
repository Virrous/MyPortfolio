import { profile } from "@/data/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowIcon } from "@/components/ui/button";
import styles from "./about.module.css";
import { InPageLink } from "@/components/ui/in-page-link";

const steps = [
  ["Business problem", "What is actually failing, and for whom."],
  ["Analysis", "The workflow, roles and data behind it."],
  ["System design", "Structure, modules and boundaries."],
  ["Execution", "Directing the team that builds it."],
  ["Product", "A system that works in practice."],
] as const;

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I work from the problem to the product."
      aside={profile.roles.map((role) => (
        <span key={role} className="tag">
          {role}
        </span>
      ))}
    >
      <Reveal>
        <div className={styles.prose}>
          {profile.positioning.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className={styles.card}>
          <p className={`eyebrow ${styles.cardEyebrow}`}>
            <span aria-hidden="true" className="eyebrow-dots" />
            How the work runs
          </p>
          <ol className={styles.steps}>
            {steps.map(([step, detail], index) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.stepTitle}>{step}</p>
                  <p className={styles.stepDetail}>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <InPageLink href="/#nepsof" className={styles.cardLink}>
            Inside Nepsof
            <ArrowIcon />
          </InPageLink>
        </div>
      </Reveal>
    </Section>
  );
}
