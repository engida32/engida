import React from "react";
import { Heading } from "../nav/Heading";
import { Hero } from "./hero/Hero";
import { About } from "./about/About";
import { Projects } from "./projects/Projects";
import { Experience } from "./experience/Experience";
import { Contact } from "./contact/Contact";
import styles from "./home.module.scss";

export const Home = () => {
  return (
    <div className={styles.home}>
      <Heading />
      <main id="main" className={styles.main}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
    </div>
  );
};
