import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="page-wrapper">
      <Hero />
      {/* Temporary spacer to allow scrolling past the pinned hero section */}
      <div style={{ height: "150vh", background: "var(--color-bg)" }}></div>
    </main>
  );
}
