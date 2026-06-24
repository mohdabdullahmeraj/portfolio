import Link from "next/link";
import AuroraBackground from "@/components/AuroraBackground";
import styles from "./Info.module.css";

export default function InfoPage() {
  return (
    <main className={styles.infoWrapper}>
      {/* Background sits at z-index 0 naturally if the component sets it, 
          or we rely on infoWrapper z-index 1 context */}
      <AuroraBackground />
      
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logoText}>Info</h1>
        <Link href="/" className={styles.backLink}>BACK</Link>
      </header>

      {/* Layout */}
      <div className={styles.mainContent}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            {/* The Plus Markers */}
            <span className={styles.imageMarker} data-pos="tl">+</span>
            <span className={styles.imageMarker} data-pos="tr">+</span>
            <span className={styles.imageMarker} data-pos="bl">+</span>
            <span className={styles.imageMarker} data-pos="br">+</span>
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/WhatsApp Image 2026-06-23 at 3.22.39 AM.jpeg" 
              alt="Mohd. Abdullah Meraj" 
              className={styles.profileImage}
            />
          </div>

          <div className={styles.metaSection}>
            <div className={styles.metaRow}>
              <span>BASED IN</span>
              <span>New Delhi, India</span>
            </div>
            <div className={styles.metaRow}>
              <span>STATUS</span>
              <span>Looking For Internships & Available For Freelance</span>
            </div>
            <div className={styles.metaRow} style={{ borderBottom: 'none' }}>
              <a href="mailto:mohdabdullahmeraj1705@gmail.com">mohdabdullahmeraj1705@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.aboutLabel}>ABOUT</div>
          <h2 className={styles.nameHeading}>Mohd. Abdullah Meraj.</h2>
          
          <p className={styles.bio}>
            Computer Science student, full-stack developer, AI builder, and designer, passionate about creating products that blend technology, design, and real-world impact.
          </p>

          <div className={styles.skillsGrid}>
            <div className={styles.skillCol}>
              <div className={styles.skillTitle}>FRONTEND</div>
              <div className={styles.skillItem}>HTML / CSS</div>
              <div className={styles.skillItem}>JavaScript</div>
              <div className={styles.skillItem}>TypeScript</div>
              <div className={styles.skillItem}>React / Next.js</div>
              <div className={styles.skillItem}>Tailwind</div>
              <div className={styles.skillItem}>Flutter / Dart</div>
            </div>

            <div className={styles.skillCol}>
              <div className={styles.skillTitle}>BACKEND</div>
              <div className={styles.skillItem}>Node.js / Express</div>
              <div className={styles.skillItem}>Python</div>
              <div className={styles.skillItem}>FastAPI</div>
            </div>

            <div className={styles.skillCol}>
              <div className={styles.skillTitle}>DATABASES</div>
              <div className={styles.skillItem}>PostgreSQL</div>
              <div className={styles.skillItem}>MySQL</div>
              <div className={styles.skillItem}>MongoDB</div>
            </div>

            <div className={styles.skillCol}>
              <div className={styles.skillTitle}>DEVOPS & DESIGN</div>
              <div className={styles.skillItem}>Git / GitHub</div>
              <div className={styles.skillItem}>Docker</div>
              <div className={styles.skillItem}>VS Code</div>
              <div className={styles.skillItem}>Figma</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerVersion}>→V1.0</div>
    </main>
  );
}
