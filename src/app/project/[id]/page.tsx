import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { projects } from "@/data/projects";
import styles from "./Project.module.css";

// Tell Next.js to pre-build all these dynamic routes
export function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.projectWrapper}>
      <header className={styles.header}>
        <TransitionLink href="/#projects" className={styles.backLink} isBack={true}>
          &#8598; BACK
        </TransitionLink>
      </header>

      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.textContent}>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>{project.title}</h1>
              <span className={styles.year}>{project.year}</span>
            </div>

            <div className={styles.description}>
              {project.description.map((paragraph, idx) => (
                <p key={idx} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={styles.badgesRow}>
              {project.tags.map((tag, idx) => (
                <span key={idx} className={styles.badge}>
                  {tag}
                </span>
              ))}
            </div>

            {project.links && project.links.length > 0 && (
              <div className={styles.linksRow}>
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkBtn}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails (conditional) */}
          {project.thumbnails && project.thumbnails.length > 0 && (
            <div className={styles.thumbnailColumn}>
              {project.thumbnails.map((thumb, idx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={idx}
                  src={thumb}
                  alt={`${project.title} thumbnail ${idx + 1}`}
                  className={styles.thumbnail}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Main Image */}
        <div className={styles.rightColumn}>
          <div className={styles.mainImageWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.mainImage}
              alt={project.title}
              className={styles.mainImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
