"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "popin",
    date: "Nov 2025 – May 2026",
    title: "Full Stack Intern",
    company: "Popin",
    description:
      "Engineered end-to-end full-stack features, including an optimized media upload pipeline and complex Flutter UI flows. Automated the entire CI/CD release process, significantly reducing manual overhead and UI regression risks.",
  },
  {
    id: "docuhub",
    date: "Jan 2026 – Mar 2026",
    title: "Product Engineer Intern",
    company: "DocuHub",
    description:
      "Led the UX architecture and end-to-end UI design for a 0→1 AI-powered document platform. Transitioned seamlessly into full-stack development to translate those design decisions into robust, production-ready features.",
  },
  {
    id: "ayanshtech",
    date: "Jun 2025 – Sep 2025",
    title: "Software Development Intern",
    company: "Ayanshtech Solutions",
    description:
      "Built responsive, modular frontend interfaces in React while architecting secure, scalable backend APIs with Node.js. Optimized database schemas and queries in MySQL to significantly improve overall data retrieval and API response times.",
  },
  {
    id: "banao",
    date: "May 2024 – Present",
    title: "Graphic Design Intern (UI/UX)",
    company: "Across The Globe - Banao Technologies",
    description:
      "Redesigned core client dashboards to boost usability and built comprehensive UI component libraries to eliminate design-developer handoff errors. Rapidly prototyped MVP-ready interfaces while aligning visual assets with strict brand guidelines.",
  },
  {
    id: "texium",
    date: "Apr 2024 – May 2024",
    title: "Graphic Design Intern",
    company: "Texium Solutions",
    description:
      "Revamped landing page UI designs to perfectly align with a science-focused brand identity, heavily improving user engagement and clarity. Crafted high-quality digital mockups that drove a massive increase in social media interaction.",
  },
];

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bg2026Ref = useRef<HTMLDivElement>(null);
  const bg2025Ref = useRef<HTMLDivElement>(null);
  const bg2024Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing
        },
      });

      // Role Animation Sequence
      // Each role takes 1 unit to fade in, 1 unit to hold, and 1 unit to fade out.
      // Total 3 units per role to prevent overlapping.
      roleRefs.current.forEach((el, index) => {
        if (!el) return;
        const startTime = index * 3; // 0, 3, 6, 9, 12

        // Fade in from bottom with blur
        tl.fromTo(
          el,
          { opacity: 0, y: 100, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          startTime
        );

        // Fade out to top with blur (except maybe the last one stays a bit longer)
        if (index < roleRefs.current.length - 1) {
          tl.to(
            el,
            { opacity: 0, y: -100, filter: "blur(10px)", duration: 1 },
            startTime + 2
          );
        } else {
           // Last item fades out right at the end to clear the screen
           tl.to(
            el,
            { opacity: 0, y: -100, filter: "blur(10px)", duration: 1 },
            startTime + 2
          );
        }
      });

      // Background Year Animation Sequence
      // 2026 fades out at time 6 (transition from Role 1 to Role 2)
      if (bg2026Ref.current && bg2025Ref.current && bg2024Ref.current) {
        // Starts at opacity 0.03 natively via CSS
        tl.to(bg2026Ref.current, { opacity: 0, duration: 1 }, 6);
        
        // 2025 fades in at time 6, fades out at time 9
        tl.fromTo(
          bg2025Ref.current,
          { opacity: 0 },
          { opacity: 0.03, duration: 1 },
          6
        );
        tl.to(bg2025Ref.current, { opacity: 0, duration: 1 }, 9);

        // 2024 fades in at time 9
        tl.fromTo(
          bg2024Ref.current,
          { opacity: 0 },
          { opacity: 0.03, duration: 1 },
          9
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.experienceWrapper} ref={wrapperRef} id="experience">
      <div className={styles.experienceInner}>
        
        {/* Background Years */}
        <div className={styles.bgYear} ref={bg2026Ref}>2026</div>
        <div className={styles.bgYear} style={{ opacity: 0 }} ref={bg2025Ref}>2025</div>
        <div className={styles.bgYear} style={{ opacity: 0 }} ref={bg2024Ref}>2024</div>

        {/* Foreground Roles */}
        <div className={styles.rolesContainer}>
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={styles.roleCard}
              ref={(el) => {
                roleRefs.current[index] = el;
              }}
            >
              <div className={styles.roleDate}>{exp.date}</div>
              <h3 className={styles.roleTitle}>{exp.title}</h3>
              <div className={styles.roleCompany}>{exp.company}</div>
              <p className={styles.roleDescription}>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
