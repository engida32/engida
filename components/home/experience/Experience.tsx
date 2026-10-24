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
      "Leading frontend work for a B2B commerce platform serving 800+ retailers and merchants, with a focus on scale, usability, and operational clarity.",
    tech: ["Next JS", "React", "MongoDB", "Postgres", "Git", "Github"],
  },
  {
    title: "KeplerLab Co. Ltd",
    position: "Senior Front-end Developer",
    time: "July 2023 - Aug 2024",
    location: "Remote",
    description:
      "Built AI-driven product experiences, including audio and text-processing interfaces integrated with OpenAI-powered workflows.",
    tech: ["React", "Nextjs", "Redux", "Material UI", "React Query", "AWS", "Docker"],
  },
  {
    title: "JaktTech Engineering",
    position: "Lead Front-end Developer",
    time: "Sep 2022 - Nov 2023",
    location: "Addis Ababa, Ethiopia",
    description:
      "Drove the frontend architecture for enterprise systems across banking and insurance workflows, improving operational efficiency and digital adoption.",
    tech: ["React", "Nextjs", "Redux", "Chakra UI", "Tailwind", "React Query", "AWS", "Docker"],
  },
  {
    title: "2F-Capital",
    position: "Front-end Developer",
    time: "Mar 2021 - Sep 2022",
    location: "Addis Ababa, Ethiopia",
    description:
      "Developed a full taxi-hailing workflow including account management, geolocation tracking, reports, and transaction processing.",
    tech: ["React", "Nextjs", "Redux", "Material UI", "Tailwind", "React Query"],
  },
  {
    title: "UpScale",
    position: "Full Stack Developer",
    time: "Mar 2019 - Jan 2021",
    location: "Addis Ababa, Ethiopia",
    description:
      "Built a learning management system and multiple web products for education and local business use cases, covering both frontend and backend work.",
    tech: ["PHP", "Laravel", "Bootstrap", "MySQL"],
  },
];
