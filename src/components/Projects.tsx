"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./Projects.module.css";

// Easy-to-edit project data
const projects = [
  {
    id: "tracix",
    title: "Tracix",
    label: "AI Engineering Project",
    image: "/image.png",
  },
  {
    id: "moms-verdict",
    title: "Moms Verdict",
    label: "AI Engineering Project",
    image: "/image.png",
  },
  {
    id: "carbon-drivient",
    title: "Carbon Drivient",
    label: "Full Stack Project",
    image: "/image.png",
  },
  {
    id: "popin",
    title: "Popin",
    label: "Internship Project",
    image: "/image.png",
  },
  {
    id: "under-25",
    title: "Under 25 App Redesign",
    label: "Design Project",
    image: "/image.png",
  },
  {
    id: "xpulse",
    title: "XPulse: Gaming Community Hub",
    label: "Design Project",
    image: "/image.png",
  },
];

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a ScrollTrigger for each project title on the left
      leftRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",     // When the top of the element hits the center of the screen
          end: "bottom center",    // When the bottom of the element hits the center of the screen
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className={styles.projectsWrapper} id="projects">
      {/* LEFT COLUMN: Scrolling List */}
      <div className={styles.leftColumn}>
        {projects.map((project, index) => (
          <Link
            href={`/project/${project.id}`}
            key={project.id}
            className={styles.projectItem}
            ref={(el) => {
              leftRefs.current[index] = el;
            }}
          >
            <h3
              className={`${styles.projectTitle} ${
                index === activeIndex ? styles.active : ""
              }`}
            >
              {project.title}
            </h3>
          </Link>
        ))}
      </div>

      {/* RIGHT COLUMN: Sticky Gallery */}
      <div className={styles.rightColumn}>
        <div className={styles.galleryContainer}>
          {projects.map((project, index) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <div
                className={`${styles.galleryItem} ${
                  index === activeIndex ? styles.active : ""
                }`}
              >
                <div className={styles.galleryMetadata}>
                  <span>2026</span>
                  <span className={styles.projectLabel}>{project.label}</span>
                </div>
                <div className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
