"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TransitionLink from "./TransitionLink";
import styles from "./About.module.css";

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const leftTextRef = useRef<HTMLParagraphElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

  const rightCopy =
    "My name is Abdullah. A designer at heart and an engineer by craft, I create digital experiences that balance aesthetics, functionality, and purpose.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP ANIMATION
      mm.add("(min-width: 901px)", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=300%",
            pin: innerRef.current,
            scrub: 1,
          },
        });

        // 1. Unblur the center image
        scrollTl.to(
          imageRef.current,
          {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0
        );

        // 2. Blur out and move the left text
        scrollTl.to(
          leftTextRef.current,
          {
            filter: "blur(15px)",
            opacity: 0,
            x: -50,
            duration: 1.2,
            ease: "power2.in",
          },
          0.2
        );

        // 3. Staggered reveal of the right text words
        if (rightTextRef.current) {
          const words = rightTextRef.current.querySelectorAll(`.${styles.word}`);
          scrollTl.fromTo(
            words,
            { filter: "blur(10px)", opacity: 0, x: 20 },
            {
              filter: "blur(0px)",
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.05,
              ease: "power2.out",
            },
            0.8
          );
        }
      });

      // MOBILE ANIMATION
      mm.add("(max-width: 900px)", () => {
        // Initial states for mobile
        gsap.set(imageRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
        gsap.set(leftTextRef.current, { filter: "blur(0px)", opacity: 1, x: "-50%", y: "-50%" }); // Keep centered via CSS transform

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=200%", // Shorter pin for mobile
            pin: innerRef.current,
            scrub: 1,
          },
        });

        // 1. Blur out image & fade it down
        scrollTl.to(imageRef.current, { filter: "blur(20px)", opacity: 0.2, duration: 1 }, 0);

        // 2. Fade out left text
        scrollTl.to(leftTextRef.current, { filter: "blur(10px)", opacity: 0, scale: 0.9, duration: 0.8 }, 0);

        // 3. Reveal right text from bottom
        if (rightTextRef.current) {
          const words = rightTextRef.current.querySelectorAll(`.${styles.word}`);
          // Set initial state for words explicitly
          gsap.set(words, { filter: "blur(10px)", opacity: 0, y: 20 });
          
          scrollTl.to(
            words,
            { filter: "blur(0px)", opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" },
            0.4
          );
        }
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapperRef} className={styles.aboutWrapper} id="about">
      <div ref={innerRef} className={styles.aboutInner}>
        {/* Left Text (Starts sharp, blurs out) */}
        <p ref={leftTextRef} className={styles.leftText}>
          Crafting <span className={styles.serifItalic}>digital experiences</span> through software,{" "}
          <span className={styles.serifItalic}>design</span>, and product thinking.
        </p>

        {/* Center Image (Starts blurred, becomes sharp) */}
        <div className={styles.imageContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src="/WhatsApp Image 2026-06-23 at 3.22.39 AM.jpeg"
            alt="Mohd. Abdullah Meraj"
            className={styles.image}
          />
        </div>

        {/* Right Text (Starts blurred, staggered reveal) */}
        <div ref={rightTextRef} className={styles.rightText}>
          {rightCopy.split(" ").map((word, i) => (
            <span key={i} className={styles.word}>
              {word}
            </span>
          ))}
          
          <div style={{ flexBasis: "100%", height: 0 }}></div>
          <TransitionLink href="/info" className={`${styles.readMoreLink} ${styles.word}`}>
            Read More
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
