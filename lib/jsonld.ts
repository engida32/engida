import { profile } from "@/content/profile";
import { caseStudies } from "@/content/case-studies";
import type { CaseStudy } from "@/content/types";
import { absoluteUrl } from "@/lib/site";

const personId = absoluteUrl("/#person");
const siteId = absoluteUrl("/#website");

function personNode() {
  return {
    "@type": "Person",
    "@id": personId,
    name: profile.name,
    url: absoluteUrl("/"),
    image: absoluteUrl("/og.png"),
    jobTitle: "Full-stack engineer",
    description: profile.headline,
    address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
    email: `mailto:${profile.email}`,
    sameAs: [profile.github, profile.linkedin, profile.x],
    knowsAbout: ["Next.js", "Python", "AI agents", "RAG", "pgvector"],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Adama Science and Technology University",
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": siteId,
    url: absoluteUrl("/"),
    name: profile.name,
    inLanguage: "en",
    publisher: { "@id": personId },
  };
}

function workNode(study: CaseStudy) {
  return {
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: absoluteUrl(`/work/${study.slug}/`),
    dateCreated: study.year.slice(0, 4),
    creator: { "@id": personId },
    keywords: study.stack.join(", "),
    isPartOf: { "@id": siteId },
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode(), ...caseStudies.map(workNode)],
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@graph": [personNode(), websiteNode(), workNode(study)],
  };
}
