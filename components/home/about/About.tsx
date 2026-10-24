import { MyLinks } from "@/components/nav/components/MyLinks";
import { Reveal } from "@/components/utils/Reveal";
import { SectionHeader } from "@/components/utils/SectionHeader";
import styles from "./about.module.scss";
import { Stats } from "./Stats";
import { AiOutlineArrowRight } from "react-icons/ai";

export const About = () => {
  return (
    <section id="about" className="section-wrapper">
      <SectionHeader title="About" dir="l" />
      <div className={styles.about}>
        <div className={styles.copyBlock}>
          <Reveal>
            <p className={`${styles.aboutText} ${styles.highlightFirstLetter}`}>
              I&apos;m Engida Lishan, a software developer based in Addis Ababa,
              Ethiopia, building interfaces that are as thoughtful as they are fast.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              I work across frontend and product engineering, with a focus on
              creating polished user experiences, clear interactions, and scalable UI
              systems for real-world products.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              My toolkit includes React, Next.js, TypeScript, Node.js, Firebase,
              MongoDB, and a handful of modern frontend stacks used to ship dependable
              digital experiences.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.links}>
              <div className={styles.linksText}>
                <span>My links</span>
                <AiOutlineArrowRight />
              </div>
              <MyLinks />
            </div>
          </Reveal>
        </div>

        <Stats />
      </div>
    </section>
  );
};
