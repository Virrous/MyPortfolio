/**
 * Single source of truth for site content.
 *
 * Everything below is a factual statement about Ashes Pokhrel, Nepsof
 * Enterprise Pvt. Ltd. and SchoolHub. Nothing here is an invented metric,
 * client, testimonial, award or certification. To add a project, append an
 * entry to `projects`. The Selected Work section and the case study route
 * both read from this array.
 */

export type Project = {
  slug: string;
  name: string;
  category: string;
  company: string;
  status: string;
  summary: string;
  url: string;
  /** Sections rendered on the case study route, in order. */
  caseStudy: {
    problem: string;
    approach: string[];
    solution: string;
    role: string[];
    /**
     * One condensed sentence carrying the same facts as `role`, used where the
     * full four item breakdown would be too heavy. Never a broader claim than
     * the list it condenses.
     */
    roleSummary: string;
    outcome: string;
  };
  /** Grouped capability areas, kept descriptive rather than numeric. */
  scope: { title: string; description: string }[];
  technologies: string[];
  /** Newest first. */
  year: string;
  featured: boolean;
};

export const profile = {
  name: "Ashes Pokhrel",
  role: "Co-Founder & CEO",
  companyName: "Nepsof Enterprise Pvt. Ltd.",
  companyBrand: "Nepsof",
  companyUrl: "https://nepsof.com",
  email: "ceo@nepsof.com",
  linkedin: "https://www.linkedin.com/in/ashespokhrel/",
  github: "https://github.com/virrous",
  photo: "/photo.jpg",
  photoAlt:
    "Portrait photograph of Ashes Pokhrel, Co-Founder and CEO of Nepsof Enterprise Pvt. Ltd.",
  statement:
    "I build software systems that turn real-world problems into practical digital products.",
  positioning: [
    "As Co-Founder and CEO of Nepsof Enterprise Pvt. Ltd., I work across business analysis, product strategy, system architecture and execution.",
    "I focus on turning real-world organizational problems into software systems that people can actually operate: understanding the workflow first, designing the system second, and building it with a team.",
    "My role spans the full path: understanding the problem, analysing how the organisation works today, designing the architecture, making product trade-offs, and coordinating execution until the system is in use.",
  ],
  roles: [
    "System Analyst",
    "System Architect",
    "Product Builder",
    "Technology Entrepreneur",
  ],
  /** The domain-name path that encodes the personal-brand hierarchy. */
  narrative: ["Problem", "Think", "Design", "Build", "Product", "Nepsof"],
} as const;

// "Contact" is deliberately not repeated here: the header carries a persistent
// Contact CTA, so listing it in the nav as well just renders it twice.
/*
  Absolute in-page targets, not bare "#about" fragments. A bare fragment
  resolves against the current route, so these links silently did nothing on
  /work/schoolhub, which has no such ids. Prefixing with "/" keeps one set of
  links working from every route.
*/
export const navigation = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Nepsof", href: "/#nepsof" },
] as const;

export const capabilities = [
  {
    index: "01",
    title: "Product Strategy",
    description:
      "Deciding what to build and what to leave out. I translate an operational problem into a product scope, sequence the work, and keep the result tied to the outcome it is supposed to produce.",
  },
  {
    index: "02",
    title: "Business & System Analysis",
    description:
      "Studying how the organisation actually operates today, across people, roles, records, approvals and hand-offs, and mapping that into explicit requirements before any code is written.",
  },
  {
    index: "03",
    title: "System Architecture",
    description:
      "Choosing the structure that will carry the product: data model, modules, integrations, permissions and the boundaries between them, so the system stays maintainable as it grows.",
  },
  {
    index: "04",
    title: "Product Development",
    description:
      "Directing the build from architecture to working software by reviewing design decisions, unblocking the team, and holding the implementation to the architecture rather than to guesswork.",
  },
  {
    index: "05",
    title: "Team & Execution",
    description:
      "Organising the people who do the work, setting the sequence, and keeping delivery honest. As CEO I own the direction and the standard; the team owns the craft of getting there.",
  },
] as const;

export const process = [
  {
    index: "01",
    title: "Understand the Problem",
    description:
      "Start from the operational reality, not the requested feature list.",
  },
  {
    index: "02",
    title: "Analyze the System",
    description:
      "Map the current workflow, data and constraints into something explicit.",
  },
  {
    index: "03",
    title: "Design the Architecture",
    description:
      "Decide modules, data model and boundaries before implementation detail.",
  },
  {
    index: "04",
    title: "Build the Product",
    description: "Work through the design with the team, in dependency order.",
  },
  {
    index: "05",
    title: "Test & Iterate",
    description:
      "Validate against real usage and the original problem, then correct.",
  },
  {
    index: "06",
    title: "Deploy & Improve",
    description:
      "Ship, observe operation, and keep improving what the system reveals.",
  },
] as const;

export const projects: Project[] = [
  {
    slug: "schoolhub",
    name: "SchoolHub",
    category: "School Management / ERP Platform",
    company: "Nepsof Enterprise Pvt. Ltd.",
    status: "Completed · Running",
    summary:
      "A school management and ERP platform built by Nepsof Enterprise Pvt. Ltd., covering academic and administrative operations in one system.",
    url: "https://schoolhub.nepsof.com",
    year: "2026",
    featured: true,
    caseStudy: {
      problem:
        "School administration runs on scattered records: enrolment and student data, class and schedule management, staff and attendance, and the financial records that sit behind them. When those live in separate registers and spreadsheets, the same facts get entered more than once, and the people accountable for them cannot see a current picture without asking someone else.",
      approach: [
        "Started from the school's own daily operations rather than a generic feature list. How a record is created, who owns it, what it depends on, and where it needs to be visible all shape it.",
        "Mapped the institution into domains with clear ownership and permissions, so each part of the system reflects an actual area of responsibility instead of a flat collection of screens.",
        "Designed the data model and service boundaries before implementation, so the platform could carry academic and administrative work together without the modules fighting each other.",
        "Built iteratively against real operating scenarios and corrected the design where it did not match how the institution actually ran.",
      ],
      solution:
        "SchoolHub is a web-based school management and ERP platform developed by Nepsof Enterprise Pvt. Ltd. It brings academic and administrative operations into a single system of record, with role-based access so that the people responsible for a given area work with the data they are accountable for. It is a multi-tenant platform: schools are isolated tenants within one deployment, with subscription, billing and platform administration handled at the company level.",
      role: [
        "Co-Founder and CEO of Nepsof Enterprise Pvt. Ltd., where I am responsible for company direction, product decisions and the standard the product is held to.",
        "System analyst and system architect for the platform, responsible for understanding the institutional requirements, designing the system structure and data model, and making the architectural calls that the implementation follows.",
        "Coordinated the team that built and runs the product, including its multi-tenant architecture, the super-admin and billing layer, and the day-to-day delivery against requirements.",
        "The product is the work of Nepsof and its team; my contribution is the analysis, architecture and leadership behind it.",
      ],
      roleSummary:
        "Co-Founder and CEO at Nepsof, and SchoolHub's system analyst and architect. I own company direction, product decisions, the data model and the architectural calls, and coordinate the team that builds and runs the platform.",
      outcome:
        "SchoolHub is completed and running in the market as a Nepsof product. It is live at schoolhub.nepsof.com, serving as the company's working school management and ERP platform.",
    },
    scope: [
      {
        title: "Academic Management",
        description:
          "Class and section organisation, subject and schedule management, and the academic structure a school runs its year on.",
      },
      {
        title: "Student & Staff Records",
        description:
          "Admissions, student profiles, staff records and attendance, held as structured data rather than registers.",
      },
      {
        title: "Administration",
        description:
          "Role-based institutional administration with access scoped to each area of responsibility.",
      },
      {
        title: "Accounting",
        description:
          "Voucher-based accounting, billing and financial reporting areas, including fiscal-year handling.",
      },
      {
        title: "Multi-tenant Platform",
        description:
          "Each school runs as an isolated tenant in one deployment, with super-admin control, subscriptions and billing.",
      },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "MySQL",
      "JWT",
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
