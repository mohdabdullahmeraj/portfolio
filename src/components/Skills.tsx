"use client";

import { useState } from "react";
import TransitionLink from "./TransitionLink";
import styles from "./Skills.module.css";

const skillsData = [
  {
    category: "Frontend",
    skills: [
      "React.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Flutter",
      "Dart",
    ],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "Python"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Git", "GitHub", "VS Code"],
  },
  {
    category: "Design",
    skills: ["Figma"],
  },
];

export default function Skills() {
  // Keeping the first accordion open by default matches standard UI patterns
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    // If clicking the already open item, close it. Otherwise, open the new one.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.skillsWrapper} id="skills">
      {/* Left Column: Sticky Bio */}
      <div className={styles.leftColumn}>
        <p className={styles.sectionLabel}>Skills</p>
        <h2 className={styles.bioText}>
          Computer Science student, full-stack developer, AI builder, and
          designer, passionate about creating products that blend technology,
          design, and real-world impact.
        </h2>
        <TransitionLink href="/contact" className={styles.contactLink}>
          Contact Me
        </TransitionLink>
      </div>

      {/* Right Column: Scrolling Accordion */}
      <div className={styles.rightColumn}>
        {skillsData.map((section, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={section.category} className={styles.accordionItem}>
              <button
                className={styles.accordionHeader}
                onClick={() => toggleAccordion(index)}
              >
                <h3 className={styles.categoryTitle}>{section.category}</h3>
                <span className={styles.icon}>{isOpen ? "—" : "+"}</span>
              </button>

              <div
                className={`${styles.accordionContent} ${
                  isOpen ? styles.open : ""
                }`}
              >
                <div className={styles.contentInner}>
                  <ul className={styles.skillList}>
                    {section.skills.map((skill) => (
                      <li key={skill} className={styles.skillItem}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
