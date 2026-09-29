import Link from "next/link";
import { featuredProjects, type Project } from "@/data/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowIcon,
  ExternalArrowIcon,
  buttonClass,
} from "@/components/ui/button";
import styles from "./project-case-study.module.css";

export function ProjectCaseStudy({
  project,
  variant = "featured",
  headingLevel = 3,
  standalone = false,
}: {
  project: Project;
  variant?: "featured" | "compact";
  /**
   * Heading level for the project title. On the homepage it sits under the
   * "Selected Work" h2; on its own route it must be the h1.
   */
  headingLevel?: 1 | 2 | 3;
  /** On its own route the page h1 already exists, so no nested article. */
  standalone?: boolean;
}) {
  const Title = `h${headingLevel}` as const;
  const blockLevel = standalone ? 2 : 4;

  /*
    "My Role" joins these blocks only on the case study route. On the homepage
    the four item breakdown is too much weight for a teaser, so the role is
    folded into the condensed `roleLine` instead.
  */
  const caseStudyBlocks: { label: string; value: string | string[] }[] = [
    { label: "The Problem", value: project.caseStudy.problem },
    { label: "The Approach", value: project.caseStudy.approach },
    { label: "The Solution", value: project.caseStudy.solution },
    ...(standalone
      ? [{ label: "My Role", value: project.caseStudy.role }]
      : []),
    { label: "Outcome", value: project.caseStudy.outcome },
  ];

  if (variant === "compact") {
    return (
      <Reveal as="li" className={styles.compact}>
        <h3 className={styles.compactTitle}>{project.name}</h3>
        <p className={styles.compactSummary}>{project.summary}</p>
        <div className={styles.compactLinks}>
          <Link
            href={`/work/${project.slug}`}
            className={`link-underline ${styles.compactLink}`}
          >
            Read the case study
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.compactVisit}
          >
            Visit live
            <ExternalArrowIcon />
            <span className="sr-only">site (opens in a new tab)</span>
          </a>
        </div>
      </Reveal>
    );
  }

  const body = (
    <div className={styles.card}>
      <header className={styles.cardHead}>
        {standalone ? (
          <p className={styles.kicker}>The case study</p>
        ) : (
          <Title className={styles.cardTitle}>{project.name}</Title>
        )}
        <p className={styles.summary}>{project.summary}</p>
      </header>

      <div className={styles.narrative}>
        <div className={styles.blocks}>
          {caseStudyBlocks.map((block) => (
            <CaseBlock
              key={block.label}
              label={block.label}
              value={block.value}
              level={blockLevel}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ size: "lg" })}
          >
            Visit {project.name}
            <ExternalArrowIcon />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {standalone ? null : (
            <Link
              href={`/work/${project.slug}`}
              className={buttonClass({ size: "lg", variant: "secondary" })}
            >
              Full case study
              <ArrowIcon />
            </Link>
          )}
        </div>
      </div>

      {standalone ? null : (
        <div className={styles.roleLine}>
          <p className={styles.blockLabel}>My Role</p>
          <p className={styles.roleText}>{project.caseStudy.roleSummary}</p>
        </div>
      )}

      <div className={styles.scopeSection}>
        <p className={`eyebrow ${styles.scopeHeading}`}>
          <span aria-hidden="true" className="eyebrow-dots" />
          Scope
        </p>
        <ul className={styles.scopeGrid}>
          {project.scope.map((item) => (
            <li key={item.title} className={styles.scopeItem}>
              <p className={styles.scopeTitle}>{item.title}</p>
              <p className={styles.scopeDescription}>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.stackSection}>
        <p className={`eyebrow ${styles.scopeHeading}`}>
          <span aria-hidden="true" className="eyebrow-dots" />
          Built with
        </p>
        <ul className={styles.stackList}>
          {project.technologies.map((tech) => (
            <li key={tech} className={styles.stackItem}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (standalone) {
    return <Reveal>{body}</Reveal>;
  }

  return <Reveal as="article">{body}</Reveal>;
}

function CaseBlock({
  label,
  value,
  level,
}: {
  label: string;
  value: string | string[];
  level: 2 | 3 | 4;
}) {
  const Heading = `h${level}` as const;

  return (
    <div>
      <Heading className={styles.blockLabel}>{label}</Heading>
      {Array.isArray(value) ? (
        <ul className={styles.blockList}>
          {value.map((item) => (
            <li key={item.slice(0, 40)} className={styles.blockItem}>
              <span aria-hidden="true" className={styles.bullet} />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.blockBody}>{value}</p>
      )}
    </div>
  );
}

export function SelectedWork() {
  return (
    <Section
      id="work"
      eyebrow="Selected Work"
      title="Selected Work"
      lede="Products and systems built through Nepsof Enterprise Pvt. Ltd. Each one is presented as the case study it is: the problem, the approach, and the part I played."
      className="sectionAlt"
    >
      <div className={styles.stack}>
        {featuredProjects.map((project) => (
          <ProjectCaseStudy key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  );
}
