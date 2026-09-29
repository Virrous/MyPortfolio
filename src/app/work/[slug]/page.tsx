import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/content";
import { siteConfig, projectSchema, breadcrumbSchema } from "@/lib/site";
import { JsonLdGraph } from "@/lib/jsonld";
import { ProjectCaseStudy } from "@/components/sections/project-case-study";
import { Contact } from "@/components/sections/contact";
import { buttonClass, ArrowIcon, ExternalArrowIcon } from "@/components/ui/button";
import styles from "./work.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = `${project.name}, ${project.category}`;
  const description = `${project.summary} Built by ${project.company} and led by ${siteConfig.name}, ${siteConfig.role}.`;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${siteConfig.url}/work/${project.slug}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const others = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <article className={styles.header}>
        <div className="shell">
          <nav aria-label="Breadcrumb">
            <ol className={styles.crumbs}>
              <li>
                <Link href="/" className={`link-underline ${styles.crumbLink}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/#work"
                  className={`link-underline ${styles.crumbLink}`}
                >
                  Work
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className={styles.crumbCurrent}>
                {project.name}
              </li>
            </ol>
          </nav>

          <div className={styles.masthead}>
            <p className={`eyebrow ${styles.eyebrow}`}>
              <span aria-hidden="true" className="eyebrow-dots" />
              Case Study
            </p>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.summary}>{project.summary}</p>

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
              <Link
                href="/#work"
                className={buttonClass({ size: "lg", variant: "secondary" })}
              >
                All work
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </article>

      <div className={`shell ${styles.body}`}>
        <div className={styles.study}>
          <ProjectCaseStudy project={project} variant="featured" standalone />
        </div>

        {others.length > 0 ? (
          <section aria-labelledby="other-projects" className={styles.others}>
            <h2 id="other-projects" className={`eyebrow ${styles.othersHeading}`}>
              <span aria-hidden="true" className="eyebrow-dots" />
              More from Nepsof
            </h2>
            <ul className={styles.othersList}>
              {others.map((item) => (
                <li key={item.slug} className={styles.otherCard}>
                  <p className={styles.otherName}>{item.name}</p>
                  <p className={styles.otherCategory}>{item.category}</p>
                  <Link href={`/work/${item.slug}`} className={styles.otherLink}>
                    Read case study
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>

      <Contact />

      <JsonLdGraph
        nodes={[
          projectSchema({
            name: project.name,
            category: project.category,
            description: project.summary,
            url: project.url,
            caseStudyPath: `/work/${project.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.url },
            { name: "Work", url: `${siteConfig.url}/#work` },
            {
              name: project.name,
              url: `${siteConfig.url}/work/${project.slug}`,
            },
          ]),
        ]}
      />
    </>
  );
}
