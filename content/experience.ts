import type { ExperienceItem } from "@/content/types";

export const experience: ExperienceItem[] = [
  {
    company: "Turing",
    role: "Full-Stack Developer & AI Engineer",
    start: "Nov 2024",
    end: "Present",
    location: "USA (Remote)",
    scope:
      "Agent evaluation platform for AI labs. Release and deployment flows, cloned SaaS environments, task assertions, LLM-as-judge scoring, and client variants for NVIDIA, Amazon, Salesforce, and Microsoft.",
    outcome:
      "One control plane for releasing and grading agent environments, from GitHub to Cloud Run.",
  },
  {
    company: "Paismo",
    role: "Senior Software Developer",
    start: "Oct 2023",
    end: "Oct 2024",
    location: "USA (Remote)",
    scope:
      "Built an HR and payroll platform with People Directory, Time & Attendance, Scheduler, Goals & Performance, Leave Management, Payroll, and Recruitment. Brought payroll processing, tax filing, employee self-service, and benefits administration into the same product.",
    outcome:
      "Processed payroll for 200+ employees with 99.9% accuracy and reduced month-end close time from 5 days to 1 day.",
    metrics: ["200+ employees", "99.9% accuracy"],
    companyUrl: "https://paismo.com/",
  },
  {
    company: "Kepler Lab",
    role: "Software Developer",
    start: "Oct 2022",
    end: "Sep 2023",
    location: "South Korea (Remote)",
    scope:
      "DreamBience, an AI meditation web app that builds personalized guided sessions from three user keywords, with Next.js, React, OpenAI APIs, and AWS Lambda.",
    outcome: "Cut the meditation app's render time by 40%.",
    metrics: ["40%"],
  },
  {
    company: "Kifiya",
    role: "Full-Stack Developer",
    start: "Oct 2021",
    end: "Sep 2022",
    location: "Addis Ababa",
    scope:
      "B2B commerce for 500+ merchants with Next.js, TypeScript, Redux, Tailwind, Node.js, PostgreSQL, and AWS.",
    outcome:
      "The platform saw 30% faster loads, 25% higher adoption, and 50% faster releases.",
    metrics: ["30% faster loads", "25% higher adoption", "50% faster releases"],
    companyUrl: "https://kifiya.com",
  },
  {
    company: "JaktTech Engineering",
    role: "Lead Front-End Developer",
    start: "Oct 2020",
    end: "Sep 2021",
    location: "Addis Ababa",
    scope:
      "Enterprise web apps for banks and insurance companies, plus an SMS gateway management system used across multiple organizations.",
    outcome: "I led work that improved internal operations by 30% across the delivered systems.",
    metrics: ["30%"],
  },
  {
    company: "2F Capital",
    role: "Front-End Developer",
    start: "Mar 2019",
    end: "Sep 2020",
    location: "Addis Ababa",
    scope:
      "Taxi platform with 100,000+ users, plus subscription management and an internal tool for Sewasew, an Ethiopian music streaming service, covering users, subscriptions, and chart of accounts.",
    outcome: "The taxi platform handled 50,000+ transactions.",
    metrics: ["50,000+ transactions"],
    companyUrl: "https://2f-capital.com/",
  },
];
