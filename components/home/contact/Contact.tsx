import { Reveal } from "@/components/utils/Reveal";
import styles from "./contact.module.scss";
import { AiFillMail } from "react-icons/ai";
import Link from "next/link";

export const Contact = () => {
  return (
    <section className="section-wrapper" id="contact">
      <div className={styles.contactWrapper}>
        <Reveal width="100%">
          <p className={styles.eyebrow}>Let&apos;s work together</p>
        </Reveal>
        <Reveal width="100%">
          <h4 className={styles.contactTitle}>Available for product and frontend work.</h4>
        </Reveal>
        <Reveal width="100%">
          <p className={styles.contactCopy}>
            I&apos;m open to collaborations, product design-driven engineering projects,
            and frontend work for teams that value clarity, craft, and thoughtful UX.
            Reach out on <Link href="https://www.linkedin.com/in/engida/" target="_blank" rel="nofollow">LinkedIn</Link>,
            <Link href="https://t.me/engida32" target="_blank" rel="nofollow"> Telegram</Link>, or email me directly.
          </p>
        </Reveal>
        <Reveal width="100%">
          <Link href="mailto:dev.engida32lishan@gmail.com" className={styles.contactEmail}>
            <AiFillMail size="2rem" />
            <span>Send Email</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};
