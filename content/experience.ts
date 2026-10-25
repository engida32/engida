import type { ExperienceItem } from "@/content/types";

export const experience: ExperienceItem[] = [
  {
    company: "Turing",
    role: "Full-Stack Developer and AI Engineer",
    start: "Nov 2024",
    end: "Sep 2026",
    location: "Remote",
    scope:
      "Agent platform for global clients. pgvector retrieval, ReAct tool calls with schema validation, critic and human review loops, fine-tuning, AWS and Docker.",
    outcome:
      "Multi-step work runs against real tools with checked inputs and a human escape hatch.",
  },
  {
    company: "Kifiya",
    role: "Senior Front-End Developer",
    start: "Aug 2023",
    end: "Nov 2024",
    location: "Addis Ababa",
    scope:
      "B2B commerce for 500+ merchants with Next.js 14, TypeScript, Redux, and Tailwind.",
    outcome:
      "30% faster loads, 25% higher adoption, and releases 50% faster.",
    companyUrl: "https://kifiya.com",
  },
  {
    company: "Kepler Lab",
    role: "Software Developer",
    start: "Jan 2023",
    end: "Dec 2023",
    location: "Remote, South Korea",
    scope:
      "AI sound processing app with Next.js, React, OpenAI APIs, and AWS Lambda.",
    outcome: "Render time fell 40%.",
  },
  {
    company: "2F Capital",
    role: "Front-End Developer",
    start: "Mar 2021",
    end: "Sep 2022",
    location: "Addis Ababa",
    scope:
      "Taxi app with 100,000+ users and 10,000+ drivers, plus Sewasew music streaming.",
    outcome: "50,000+ transactions processed through the app.",
    companyUrl: "https://2f-capital.com/",
  },
];
