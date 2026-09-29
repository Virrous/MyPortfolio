import { profile, featuredProjects } from "@/data/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ExternalArrowIcon } from "@/components/ui/button";
import styles from "./nepsof.module.css";
import { InPageLink } from "@/components/ui/in-page-link";

const chain = [
  { label: profile.name, detail: "Co-Founder & CEO" },
  {
    label: profile.companyName,
    detail: "Software products and client solutions",
  },
  { label: "Products & Systems", detail: "Built, delivered, and run in the market" },
] as const;

export function Nepsof() {
  return (
    <Section
      id="nepsof"
      eyebrow="Nepsof"
      title="Building Nepsof"
      lede={
        <>
          {profile.companyName} is the company I co-founded and lead. It is the
          vehicle through which I work with organisations: analysing how they
          operate, designing the system that fits, and building it with a team
          into a product that runs in the market. SchoolHub is the clearest
          example of that path end to end.
        </>
      }
    >
      <Reveal>
        <ol className={styles.chain}>
          {chain.map((node, index) => (
            <li key={node.label} className={styles.chainItem}>
              <span className={styles.step}>
                Step {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.chainLabel}>{node.label}</p>
              <p className={styles.chainDetail}>{node.detail}</p>
              {index < chain.length - 1 ? (
                <span aria-hidden="true" className={styles.chainArrow}>
                  &rarr;
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={100}>
        <div className={styles.cta}>
          <div>
            <p className={styles.ctaName}>{profile.companyName}</p>
            <p className={styles.ctaBody}>
              A software company building products and tailored solutions for
              organisations that need their operations to work as one system.
            </p>
          </div>
          <a
            href={profile.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaLink}
          >
            nepsof.com
            <ExternalArrowIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Reveal>

      {featuredProjects.length > 0 ? (
        <Reveal delay={140}>
          <p className={styles.footnote}>
            The product side of that work is in{" "}
            <InPageLink
              href="/#work"
              className={`link-underline ${styles.footnoteLink}`}
            >
              Selected Work
            </InPageLink>
            .
          </p>
        </Reveal>
      ) : null}
    </Section>
  );
}
