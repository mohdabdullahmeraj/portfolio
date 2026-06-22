import Hero from "@/components/Hero";
import AuroraBackground from "@/components/AuroraBackground";

export default function Home() {
  return (
    <main className="page-wrapper">
      <AuroraBackground />
      <Hero />
      {/* Temporary spacer to allow scrolling past the pinned hero section */}
      <div style={{ height: "150vh", background: "var(--color-bg)" }}></div>
    </main>
  );
}
