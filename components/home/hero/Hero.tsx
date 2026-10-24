import Image from "next/image";
import { motion } from "framer-motion";
import { DotGrid } from "./DotGrid";
import styles from "./hero.module.scss";
import Profile from "@/public/Profile.jpg";
import { Reveal } from "../../utils/Reveal";
import { StandardButton } from "../../buttons/StandardButton";

export const Hero = () => {
  return (
    <section className={`section-wrapper ${styles.hero}`}>
      <div className={styles.heroGrid}>
        <div className={styles.copyWrapper}>
          <Reveal>
            <span className={styles.eyebrow}>Frontend engineer • product-minded</span>
          </Reveal>
          <Reveal>
            <h1 className={styles.title}>
              I build calm,
              <br />
              thoughtful digital experiences.
            </h1>
          </Reveal>
          <Reveal>
            <p className={styles.aboutCopy}>
              I&apos;m Engida Lishan — a software developer focused on elegant,
              high-performing interfaces for products, startups, and growing brands.
            </p>
          </Reveal>
          <Reveal>
            <div className={styles.actionsRow}>
              <StandardButton onClick={() => document.getElementById("contact")?.scrollIntoView()}>
                Let&apos;s talk
              </StandardButton>
              <a href="#projects" className={styles.secondaryCta}>
                View work
              </a>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.profileWrap}
        >
          <div className={styles.profileFrame}>
            <Image
              className={styles.profile}
              src={Profile}
              priority
              alt="Engida, Software Developer"
              width={260}
              height={260}
            />
          </div>
        </motion.div>
      </div>
      <DotGrid />
    </section>
  );
};
