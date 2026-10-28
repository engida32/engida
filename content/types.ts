export type WorkImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type WorkItem = {
  title: string;
  year: string;
  category?: "Platform" | "Client" | "Independent";
  description: string;
  stack: string[];
  caseStudySlug?: string;
  liveUrl?: string;
  sourceUrl?: string;
  note?: string;
  noteInPreviewOnly?: boolean;
  featured?: boolean;
  visibility?: "internal";
  image?: WorkImage;
};

export type ExperienceItem = {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  scope: string;
  outcome: string;
  companyUrl?: string;
  metrics?: string[];
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudyDiagram = {
  title: string;
  kind: "flow" | "group";
  items: string[];
};

export type CaseStudyScreenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  year: string;
  role: string;
  status: string;
  summary: string;
  outcome?: string;
  stack: string[];
  deliverables?: string[];
  problem: string[];
  build: string[];
  decisions?: string[];
  scope?: string;
  context?: string;
  diagram?: CaseStudyDiagram;
  hero?: CaseStudyScreenshot;
  validation?: string[];
  result?: string;
  tradeoff?: string;
  next?: string[];
  links: CaseStudyLink[];
  screenshots: CaseStudyScreenshot[];
};
