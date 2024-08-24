import { SectionHeader } from "@/components/utils/SectionHeader";
import { ExperienceItem } from "./ExperienceItem";

export const Experience = () => {
  return (
    <section className="section-wrapper" id="experience">
      <SectionHeader title="Experience" dir="l" />
      {experience.map((item) => (
        <ExperienceItem key={item.title} {...item} />
      ))}
    </section>
  );
};

const experience = [
  {
    title: "Kifiya Financial Technology",
    position: "Senior Front-end Developer",
    time: "Aug 2022 - Present",
    location: "Addis Ababa, Ethiopia",
    description:
      "Working on developing the front-end of a B2B e-commerce web application. The application has already welcomed 800 retailers and merchants.",
    tech: ["Next JS", "React", "MongoDB", "Postgres", "Git", "Github"],
  },
  {
    title: "KeplerLab Co. Ltd",
    position: "Senior Front-end Developer",
    time: "July 2023 - Aug 2024",
    location: "Remote",
    description:
      "Led front-end development for an AI product. Developed sound processing web application using Open AI API and integrated it with another AI model for text processing and sound generation.",
    tech: [
      "React",
      "Nextjs",
      "Redux",
      "Material UI",
      "React Query",
      "AWS",
      "Docker",
    ],
  },

  {
    title: "JaktTech Engineering",
    position: "Lead Front-end Developer",
    time: "Sep 2022 - Nov 2023",
    location: "Addis Ababa, Ethiopia",
    description:
      "Worked on the development of enterprise web applications for major banks and insurance companies. Automated manual processes and enhancing operational efficiency. Spearheaded the creation of a comprehensive SMS gateway management system, featuring a web application, client dashboard, and multi-role management interface.",
    tech: [
      "React",
      "Nextjs",
      "Redux",
      "Chakra UI",
      "Tailwind",
      "React Query",
      "AWS",
      "Docker",
    ],
  },

  {
    title: "2F-Capital",
    position: "Front-end Developer",
    time: "Mar 2021 - Sep 2022",
    location: "Addis Ababa, Ethiopia",
    description:
      "Developed a taxi-hailing app that manages users, drivers, transactions, and accounts. It includes street pickup management integrated with Google Maps, report management, and journey tracking, reimbursement features for transaction issues and manages registered company profiles. Built the Sewasew ( an Ethiopian music streaming platform connecting fans with artists) and CNCM (the web application and dashboard for an Ethiopian copyright society)",
    tech: [
      "React",
      "Nextjs",
      "Redux",
      "Material UI",
      "Tailwind",
      "React Query",
    ],
  },

  {
    title: "UpScale",
    position: "Full Stack Developer",
    time: "Mar 2019 - Jan 2021",
    location: "Addis Ababa, Ethiopia",
    description:
      "Developed a Learning Management System for a local high school as a backend developer. Developed the landing page and admin management for Adama FC as FullStack.",
    tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
  },
];
