"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  href: string;
  isBack?: boolean;
}

export default function TransitionLink({ children, href, className, target, rel, onClick, isBack, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it has an onClick handler, fire it
    if (onClick) {
      onClick(e);
    }

    // If it's opening in a new tab, is an anchor link, or is external, don't hijack it
    if (
      target === "_blank" ||
      href.toString().startsWith("http")
    ) {
      return;
    }

    // Otherwise, intercept the navigation
    e.preventDefault();

    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      // Play the "fade to black" transition
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Once the screen is black, trigger the actual route change
          if (isBack && window.history.length > 2) {
            router.back();
          } else {
            router.push(href.toString());

            // If navigating to a hash on the same page, Next.js won't remount template.tsx.
            // We must manually fade the overlay back out.
            const currentPath = window.location.pathname;
            const targetPath = href.toString().split("#")[0] || currentPath;

            if (currentPath === targetPath || (targetPath === "/" && currentPath === "/")) {
              gsap.to(overlay, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
                delay: 0.1,
              });
            }
          }
        },
      });
    } else {
      // Fallback if overlay is missing
      if (isBack && window.history.length > 2) {
        router.back();
      } else {
        router.push(href.toString());
      }
    }
  };

  return (
    <Link href={href} className={className} target={target} rel={rel} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
