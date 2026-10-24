import styles from "./headinglinks.module.scss";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { FaTelegram } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const links = [
  { href: "https://linkedin.com/in/engida", label: "LinkedIn", icon: AiFillLinkedin },
  { href: "https://github.com/engida32", label: "GitHub", icon: AiFillGithub },
  { href: "https://t.me/engida32", label: "Telegram", icon: FaTelegram },
  { href: "https://x.com/engida_lish", label: "X", icon: AiFillTwitterCircle },
];

export const MyLinks = () => {
  return (
    <div className={styles.links}>
      {links.map(({ href, label, icon: Icon }, index) => (
        <motion.span
          key={label}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, delay: index * 0.05 }}
        >
          <Link href={href} target="_blank" rel="nofollow" aria-label={label}>
            <Icon size="1.8rem" />
          </Link>
        </motion.span>
      ))}
    </div>
  );
};
