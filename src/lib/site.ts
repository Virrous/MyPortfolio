export const siteConfig = {
  name: "Ashes Pokhrel",
  legalName: "Ashes Pokhrel",
  role: "Co-Founder & CEO",
  companyName: "Nepsof Enterprise Pvt. Ltd.",
  companyBrand: "Nepsof",
  companyUrl: "https://nepsof.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashespokhrel.com.np").replace(
    /\/$/,
    "",
  ),
  locale: "en_US",
  email: "ceo@nepsof.com",
  linkedin: "https://www.linkedin.com/in/ashespokhrel/",
  github: "https://github.com/virrous",
  description:
    "Ashes Pokhrel is Co-Founder and CEO of Nepsof Enterprise Pvt. Ltd. He works across business analysis, system architecture, product strategy and execution to turn real-world organizational problems into practical software systems.",
  shortDescription:
    "Co-Founder & CEO at Nepsof Enterprise Pvt. Ltd. System analyst and system architect building practical software products.",
  keywords: [
    "Ashes Pokhrel",
    "Co-Founder and CEO of Nepsof",
    "Nepsof Enterprise Pvt. Ltd.",
    "Nepsof",
    "system analyst",
    "system architect",
    "product builder",
    "SchoolHub",
    "school management ERP",
  ],
} as const;

export const PERSON_ID = `${siteConfig.url}/#person`;
export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export const personSchema = {
  "@id": PERSON_ID,
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}/photo.jpg`,
  email: `mailto:${siteConfig.email}`,
  worksFor: { "@id": ORGANIZATION_ID },
  sameAs: [siteConfig.linkedin, siteConfig.github],
  knowsAbout: [
    "Business Analysis",
    "System Analysis",
    "System Architecture",
    "Product Strategy",
    "Software Product Development",
  ],
} as const;

export const organizationSchema = {
  "@id": ORGANIZATION_ID,
  "@type": "Organization",
  name: siteConfig.companyName,
  legalName: siteConfig.companyName,
  alternateName: siteConfig.companyBrand,
  url: siteConfig.companyUrl,
  description:
    "Nepsof Enterprise Pvt. Ltd. develops software products and client solutions. Its product portfolio includes SchoolHub, a school management and ERP platform.",
  founder: { "@id": PERSON_ID },
  member: { "@id": PERSON_ID },
} as const;

export const websiteSchema = {
  "@id": WEBSITE_ID,
  "@type": "WebSite",
  name: `${siteConfig.name}, ${siteConfig.role}, ${siteConfig.companyName}`,
  url: siteConfig.url,
  description: siteConfig.shortDescription,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
} as const;

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@id": `${siteConfig.url}/#breadcrumb`,
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const projectSchema = (project: {
  name: string;
  category: string;
  description: string;
  url: string;
  caseStudyPath: string;
}) => ({
  "@id": `${siteConfig.url}${project.caseStudyPath}#project`,
  "@type": "SoftwareApplication",
  name: project.name,
  applicationCategory: project.category,
  description: project.description,
  url: project.url,
  operatingSystem: "Web",
  creator: { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
});
