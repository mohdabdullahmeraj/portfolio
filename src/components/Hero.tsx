"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuroraBackground from "./AuroraBackground";
import styles from "./Hero.module.css";

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const dLetterRef = useRef<HTMLSpanElement>(null);
  const portalContentRef = useRef<HTMLDivElement>(null);
  const statementTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ====== ENTRANCE ANIMATION ======
      const entranceTl = gsap.timeline({ defaults: { ease: "power4.out" } });

      if (firstNameRef.current) {
        const letters = firstNameRef.current.querySelectorAll(".letter");
        entranceTl.fromTo(
          letters,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.04 },
          0.3
        );
      }

      if (lastNameRef.current) {
        const letters = lastNameRef.current.querySelectorAll(".letter");
        entranceTl.fromTo(
          letters,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.04 },
          0.5
        );
      }

      entranceTl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.8
      );

      entranceTl.fromTo(
        footerRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        1.0
      );

      // ====== SCROLL TRANSITION (after entrance settles) ======
      entranceTl.then(() => {
        // Double rAF to ensure layout is stable after entrance
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ctx.add(() => {
              setupScrollTransition();
            });
          });
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  function setupScrollTransition() {
    const hero = heroRef.current;
    const name = nameContainerRef.current;
    const dLetter = dLetterRef.current;
    const portal = portalContentRef.current;
    const tagline = taglineRef.current;
    const footer = footerRef.current;
    const statementText = statementTextRef.current;

    if (!hero || !name || !dLetter || !portal || !tagline || !footer || !statementText || !wrapperRef.current) return;

    // ---- Measure positions ----
    const heroRect = hero.getBoundingClientRect();
    const nameRect = name.getBoundingClientRect();
    const dRect = dLetter.getBoundingClientRect();

    // Y offset to vertically center the name
    const nameRelativeCenterY =
      nameRect.top - heroRect.top + nameRect.height / 2;
    const yOffset = heroRect.height / 2 - nameRelativeCenterY;

    // "d" position relative to hero (AFTER name is centered)
    // The "d" has an ascender, so the counter (hole) is lower and slightly to the left.
    // Adjusting from 0.5 to 0.4 (width) and 0.72 (height) precisely targets the hole center.
    const dCenterX = dRect.left + dRect.width * 0.52  - heroRect.left;
    const dCenterY = dRect.top + dRect.height * 0.6 - heroRect.top + yOffset;

    const dPercentX = (dCenterX / heroRect.width) * 100;
    const dPercentY = (dCenterY / heroRect.height) * 100;

    // Transform-origin on name at "d" position (relative to name element)
    const dInNameX = dRect.left + dRect.width * 0.52 - nameRect.left;
    const dInNameY = dRect.top + dRect.height * 0.6 - nameRect.top;
    name.style.transformOrigin = `${dInNameX}px ${dInNameY}px`;

    // Set portal clip-path center
    portal.style.setProperty("--d-x", `${dPercentX}%`);
    portal.style.setProperty("--d-y", `${dPercentY}%`);

    // ---- Create scroll timeline ----
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=350%",
        pin: hero,
        scrub: 0.8,
      },
    });

    // Phase 1 (0 → 0.25): Fade out tagline/footer, center name
    scrollTl.to(
      tagline,
      { opacity: 0, y: -20, duration: 0.12, ease: "power2.in" },
      0
    );
    scrollTl.to(
      footer,
      { opacity: 0, y: 20, duration: 0.12, ease: "power2.in" },
      0
    );
    scrollTl.to(
      name,
      { y: yOffset, duration: 0.25, ease: "power3.inOut" },
      0
    );

    // Phase 2 (0.25 → 0.75): Scale name up + grow portal ellipse
    scrollTl.to(
      name,
      { scale: 70, duration: 0.5, ease: "power2.in" },
      0.25
    );
    scrollTl.fromTo(
      portal,
      { "--portal-size": 0 },
      { "--portal-size": 160, duration: 0.5, ease: "power2.in" },
      0.25
    );
    
    // Fade and scale in the statement text as the portal opens
    scrollTl.fromTo(
      statementText,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      0.45
    );

    // Fade out name text as it gets very large
    scrollTl.to(
      name,
      { opacity: 0, duration: 0.1, ease: "power1.in" },
      0.65
    );

    // Phase 3 (0.75 → 1.0): Hold on statement — user reads it
    // (nothing animates, pin stays, statement is fully visible)
  }

  function splitIntoLetters(text: string, dIndex?: number) {
    return text.split("").map((char, i) => {
      const isDTarget = dIndex !== undefined && i === dIndex;
      return (
        <span
          key={i}
          ref={isDTarget ? dLetterRef : undefined}
          className={`letter inline-block ${char === " " ? styles.space : ""}`}
          style={{ display: "inline-block" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  }

  return (
    <div ref={wrapperRef} className={styles.heroWrapper}>
      <div ref={heroRef} className={styles.hero} id="hero">
        <AuroraBackground />
        
        {/* Tagline — top left */}
        <p ref={taglineRef} className={styles.tagline}>
          Crafting digital experiences,{" "}
          <span className="font-serif">where code meets design,</span>
          <br />
          through precision, detail and creativity.
        </p>

        {/* Portal content — revealed through the "d" hole */}
        <div ref={portalContentRef} className={styles.portalContent}>
          <div className={styles.portalInner}>
            <span className={styles.cornerMarker} data-pos="tl">
              +
            </span>
            <span className={styles.cornerMarker} data-pos="tr">
              +
            </span>
            <span className={styles.cornerMarker} data-pos="bl">
              +
            </span>
            <span className={styles.cornerMarker} data-pos="br">
              +
            </span>
            <div ref={statementTextRef} className={styles.statementTextWrap}>
              <p className={styles.statementText}>
                <span className="font-serif">I engineer systems.</span>
                <br />
                <span className="font-serif">I design experiences.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Name — positioned at bottom, animated to center then scaled */}
        <div ref={nameContainerRef} className={styles.nameContainer}>
          <div ref={firstNameRef} className={styles.firstName}>
            {splitIntoLetters("Mohd. Abdullah", 8)}
          </div>
          <div ref={lastNameRef} className={styles.lastName}>
            {splitIntoLetters("Meraj.")}
          </div>
        </div>

        {/* Footer bar */}
        <div ref={footerRef} className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.version}>→V1.0</span>
          </div>
          <div className={styles.footerCenter}>
            <a href="https://github.com" className={styles.footerLink}>
              GITHUB
            </a>
            <span className={styles.footerDivider}>/</span>
            <a href="https://linkedin.com" className={styles.footerLink}>
              LINKEDIN
            </a>
            <span className={styles.footerDivider}>/</span>
            <a href="https://behance.com" className={styles.footerLink}>
              BEHANCE
            </a>
          </div>
          <div className={styles.footerRight}>
            <a href="/work" className={styles.footerLink}>
              WORK
            </a>
            <a href="/info" className={styles.footerLink}>
              INFO
            </a>
            <a href="/contact" className={styles.footerLink}>
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
