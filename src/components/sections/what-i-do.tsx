import { capabilities } from "@/data/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import styles from "./what-i-do.module.css";

export function WhatIDo() {
  return (
    <Section
      id="what-i-do"
      eyebrow="What I Do"
      title="Five responsibilities that make a product ship."
      className="sectionAlt"
    >
      <ul className={styles.grid}>
        {capabilities.map((capability, index) => (
          <Reveal
            as="li"
            key={capability.index}
            delay={index * 70}
            className={styles.cell}
          >
            <span className={styles.index}>{capability.index}</span>
            <h3 className={styles.title}>{capability.title}</h3>
            <p className={styles.description}>{capability.description}</p>
          </Reveal>
        ))}
        <Reveal
          as="li"
          delay={capabilities.length * 70}
          className={styles.cellStatement}
        >
          <p className={styles.statementTitle}>
            Analysis before architecture. Architecture before code.
          </p>
          <p className={styles.statementBody}>
            The sequence is the method. Skipping a step is how software ends up
            solving the wrong problem well.
          </p>
        </Reveal>
      </ul>
    </Section>
  );
}
