"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // When a new page mounts, the overlay should be black (opacity: 1)
    // from the TransitionLink. We fade it out to reveal the new page.
    const overlay = document.getElementById("page-transition-overlay");
    if (overlay) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        delay: 0.1, // tiny delay ensures DOM is painted before fading out
      });
    }
  }, []);

  return <>{children}</>;
}
