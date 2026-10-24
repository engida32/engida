import styles from "./heading.module.scss";
import { MyLinks } from "./components/MyLinks";
import { OutlineButton } from "../buttons/OutlineButton";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const Heading = () => {
  return (
    <header className={styles.heading}>
      <div className={styles.brandWrap}>
        <a href="#main" className={styles.brand} aria-label="Go to top">
          EL<span>.</span>
        </a>
      </div>

      <nav className={styles.nav} aria-label="Main navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className={styles.navLink}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <MyLinks />
        <OutlineButton onClick={() => window.open("/Engida_b.pdf")}>
          Resume
        </OutlineButton>
      </div>
    </header>
  );
};
