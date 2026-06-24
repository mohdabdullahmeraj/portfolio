"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const wrapperRef = useRef<HTMLFooterElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 80%", // Start animating just as the top of the footer comes into view
          end: "bottom bottom", // Finish exactly when the user reaches the absolute bottom
          scrub: 1, // Smooth scrolling animation
        },
      });

      // Slide down and fade in the top metadata container
      tl.to(topRef.current, { opacity: 1, y: 0, duration: 1 }, 0);

      // Typing effect for the letters inside the metadata
      const typeLetters = topRef.current?.querySelectorAll(".type-letter");
      if (typeLetters && typeLetters.length > 0) {
        tl.to(
          typeLetters,
          { opacity: 1, duration: 0.1, stagger: 0.02 },
          0.2 // Start slightly after the container begins fading in
        );
      }

      // Slide up the massive name words
      tl.to(
        nameRefs.current,
        {
          y: "0%",
          duration: 1.5,
          stagger: 0.1, // Slight delay between words for a fluid reveal
          ease: "power2.out",
        },
        0 // Start at the same time as the top elements
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  function splitText(text: string) {
    return text.split("").map((char, i) => (
      <span key={i} className="type-letter" style={{ opacity: 0 }}>
        {char}
      </span>
    ));
  }

  return (
    <footer className={styles.footerWrapper} ref={wrapperRef} id="contact">
      <div className={styles.footerInner}>
        {/* Top Metadata */}
        <div className={styles.footerTop} ref={topRef}>
          <div className={styles.footerCol}>
            <a href="mailto:mohdabdullahmeraj1705@gmail.com">
              {splitText("mohdabdullahmeraj1705@gmail.com")}
            </a>
            <div className={styles.copyright}>© 2026</div>
          </div>

          <div className={styles.footerCol}>
            <a href="https://github.com/mohdabdullahmeraj/" target="_blank" rel="noopener noreferrer">
              {splitText("GITHUB")}
            </a>
            <a href="https://www.linkedin.com/in/mohdabdullahmeraj/" target="_blank" rel="noopener noreferrer">
              {splitText("LINKEDIN")}
            </a>
            <a href="https://www.behance.net/gallery/234016403/Portfolio" target="_blank" rel="noopener noreferrer">
              {splitText("BEHANCE")}
            </a>
          </div>

          <div className={`${styles.footerCol} ${styles.navCol}`}>
            <Link href="#projects">{splitText("WORK")}</Link>
            <Link href="/info">{splitText("INFO")}</Link>
            <Link href="/contact">{splitText("CONTACT")}</Link>
          </div>
        </div>

        {/* Massive Bottom Name */}
        <div className={styles.footerNameContainer}>
          <div className={styles.nameLine}>
            <h1
              className={styles.firstName}
              ref={(el) => {
                nameRefs.current[0] = el;
              }}
            >
              Mohd.
            </h1>
          </div>
          <div className={styles.nameLine}>
            <h1
              className={styles.firstName}
              ref={(el) => {
                nameRefs.current[1] = el;
              }}
            >
              Abdullah
            </h1>
          </div>
          <div className={styles.nameLine}>
            <h1
              className={styles.lastName}
              ref={(el) => {
                nameRefs.current[2] = el;
              }}
            >
              Meraj<span className={styles.blueDot}>.</span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
}
