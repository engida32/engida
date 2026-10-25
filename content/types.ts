export type WorkItem = {
  title: string;
  year: string;
  description: string;
  stack: string[];
  caseStudySlug?: string;
  liveUrl?: string;
  sourceUrl?: string;
  note?: string;
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
};

export type CaseStudyLink = {
  label: string;
  href: string;
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
  stack: string[];
  problem: string[];
  build: string[];
  decisions?: string[];
  scope?: string;
  validation?: string[];
  result?: string;
  tradeoff?: string;
  next?: string[];
  links: CaseStudyLink[];
  screenshots: CaseStudyScreenshot[];
};
