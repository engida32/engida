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
        <div>
          <Reveal>
            <p className={`${styles.aboutText} ${styles.highlightFirstLetter}`}>
              Hello ! I&apos;m Engida Lishan, and I&apos;m a software developer
              based in Addis Ababa, Ethiopia.
              <br />
              <br />I have experience working in both the Frontend and Backend
              development worlds, with a focus on frontend development. I&apos;m
              passionate about creating beautiful, responsive websites that
              provide a great user experience.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              My skills include HTML, CSS, JavaScript, and various frontend
              frameworks like React,Next and Vue.js. I&apos;ve also worked with
              backend technologies like Node.js, Firebase, MongoDB and Nest.js ,
              allowing me to build full-stack applications.
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              {/* When I&apos;m not coding, I enjoy digital painting. I believe that
              maintaining a healthy work-life balance is crucial for staying
              productive and motivated. */}
              When I&apos;m not coding, I learn new technologies, read books,
            </p>
          </Reveal>
          <Reveal>
            <p className={styles.aboutText}>
              I’m constantly seeking new challenges and opportunities to expand
              my skills and grow as a developer. If you&apos;re looking for a
              dedicated and versatile developer to bring your project to life,
              or if you have any questions, feel free to reach out! 🔗
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
