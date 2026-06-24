import TransitionLink from "@/components/TransitionLink";
import AuroraBackground from "@/components/AuroraBackground";
import styles from "./Contact.module.css";

export default function ContactPage() {
  return (
    <main className={styles.contactWrapper}>
      <AuroraBackground />
      
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.logoText}>Contact</h1>
        <TransitionLink href="/" className={styles.backLink} isBack={true}>BACK</TransitionLink>
      </header>

      {/* Layout */}
      <div className={styles.mainContent}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          <div className={styles.infoBox}>
            <h2 className={styles.boxTitle}>Let&apos;s build your next product.</h2>
            <p className={styles.boxText}>
              I collaborate with startups, founders, and businesses to design, build, and launch digital products. Whether you need a scalable web application, an intuitive user experience, or a complete brand identity, I&apos;d love to hear about your idea and help bring it to life.
            </p>
          </div>

          <div className={styles.metaSection}>
            <div className={styles.metaRow}>
              <span>BASED IN</span>
              <span>New Delhi, India</span>
            </div>
            <div className={styles.metaRow}>
              <span>STATUS</span>
              <span>Student / Freelance</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.sectionLabel}>CONTACT</div>
          <h2 className={styles.mainHeading}>Ready to bring your idea to life?</h2>
          
          <p className={styles.primaryBio}>
            Full-stack engineer and designer, creating digital products, brands, and experiences that are functional, scalable, and thoughtfully crafted.
          </p>

          <p className={styles.secondaryBio}>
            Whether you&apos;re building an MVP, launching a startup, redesigning an existing product, or creating a new brand identity, I&apos;d be happy to discuss your vision and explore how we can build something meaningful together.
          </p>

          <div className={styles.bottomGrid}>
            <div className={styles.gridCol}>
              <div className={styles.gridTitle}>SHORTCUTS</div>
              <a href="mailto:mohdabdullahmeraj1705@gmail.com" className={styles.gridItem}>Email</a>
              <a href="https://www.linkedin.com/in/mohdabdullahmeraj/" target="_blank" rel="noopener noreferrer" className={styles.gridItem}>LinkedIn</a>
              <a href="https://github.com/mohdabdullahmeraj/" target="_blank" rel="noopener noreferrer" className={styles.gridItem}>GitHub</a>
              <a href="https://drive.google.com/file/d/1F5Nr0u0QNyjCliCT-LqYpk7CGGFSBpGA/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={styles.gridItem}>Resume</a>
              <a href="https://www.behance.net/gallery/234016403/Portfolio" target="_blank" rel="noopener noreferrer" className={styles.gridItem}>Design Portfolio</a>
            </div>

            <div className={styles.gridCol}>
              <div className={styles.gridTitle}>SERVICES</div>
              <span className={styles.gridItem}>Full-Stack Development</span>
              <span className={styles.gridItem}>UI/UX Design</span>
              <span className={styles.gridItem}>Brand Identity</span>
              <span className={styles.gridItem}>Logo Design</span>
              <span className={styles.gridItem}>Social Media Design</span>
            </div>
          </div>
        </div>
      </div>

      <a href="mailto:mohdabdullahmeraj1705@gmail.com" className={styles.emailLink}>
        mohdabdullahmeraj1705@gmail.com
      </a>
    </main>
  );
}
