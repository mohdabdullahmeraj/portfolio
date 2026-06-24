"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";
import { projects } from "@/data/projects";
import styles from "./Projects.module.css";

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
          <TransitionLink
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
          </TransitionLink>
        ))}
      </div>

      {/* RIGHT COLUMN: Sticky Gallery */}
      <div className={styles.rightColumn}>
        <div className={styles.galleryContainer}>
          {projects.map((project, index) => (
            <TransitionLink href={`/project/${project.id}`} key={project.id}>
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
                    src={project.mainImage}
                    alt={project.title}
                    className={styles.projectImage}
                  />
                </div>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
