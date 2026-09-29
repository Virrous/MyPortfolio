import { process } from "@/data/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import styles from "./how-i-build.module.css";

export function HowIBuild() {
  return (
    <Section
      id="how-i-build"
      eyebrow="How I Build"
      title="From problem to deployed system."
      lede="The same sequence every time. Each stage answers a different question, and the next one is not worth starting until the current one is settled."
    >
      <ol className={styles.grid}>
        {process.map((step, index) => (
          <Reveal
            as="li"
            key={step.index}
            delay={index * 60}
            className={styles.cell}
          >
            <div className={styles.heading}>
              <span aria-hidden="true" className={styles.numeral}>
                {step.index}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
            </div>
            <p className={styles.description}>{step.description}</p>
            {index < process.length - 1 ? (
              <span aria-hidden="true" className={styles.arrow}>
                <ArrowDown />
              </span>
            ) : null}
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={styles.arrowIcon}>
      <path
        d="M8 2v11.5M4 9.5l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
