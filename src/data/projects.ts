export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectData {
  id: string;
  title: string;
  label: string;
  year: string;
  description: string[];
  tags: string[];
  links: ProjectLink[];
  mainImage: string;
  thumbnails?: string[];
}

export const projects: ProjectData[] = [
    {
    id: "popin",
    title: "Popin",
    label: "Internship Project",
    year: "2025-2026",
    description: [
      "Contributed across the entire product stack, building scalable backend services, intuitive Flutter interfaces, and production-ready features for an event discovery platform.",
      "Led the development of key platform capabilities including media uploads, deployment automation, and quality assurance to deliver a faster and more reliable product."
    ],
    tags: ["Flutter", "Prisma", "REST API", "AWS S3", "GitLab CI/CD"],
    links: [
      { label: "Product Site", url: "https://popin.city/" },
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.eventio.app" }
    ],
    mainImage: "/popin.png",
  },

  {
    id: "tracix",
    title: "Tracix",
    label: "AI Engineering Project",
    year: "2026",
    description: [
      "Built an open-source visual debugging and observability platform for AI web agents, featuring a Python SDK that hooks into LangChain's callback system to capture real-time screenshots via Playwright, stream trace events to a FastAPI backend using Server-Sent Events (SSE), and store them in PostgreSQL with binary screenshot storage.",
      "Integrated Google Gemini 2.5 Flash as a multimodal AI diagnosis engine that analyzes trace logs and screenshots together to automatically identify visual failures (cookie popups, login walls, bot detection), with an async queue-based SDK architecture featuring a circuit breaker pattern for zero-overhead agent monitoring."
    ],
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "Gemini AI"],
    links: [
      { label: "Demo", url: "https://www.loom.com/share/fd48ff1e888545819391d356d9fe6dd9" },
      { label: "GitHub", url: "https://github.com/mohdabdullahmeraj/tracix" }
    ],
    mainImage: "/tracix.png",
  },
  {
    id: "moms-verdict",
    title: "Moms Verdict",
    label: "AI Engineering Project",
    year: "2026",
    description: [
      "Built an end-to-end AI pipeline for Mumzworld (Middle East's largest mother-and-baby e-commerce platform) that synthesizes hundreds of raw product reviews into structured, grounded bilingual (English/Arabic) verdicts with mechanical safeguards against hallucination and fake review detection.",
      "Engineered a 7-stage modular architecture using OpenRouter LLMs, local sentence-transformer embeddings for spam detection (cosine similarity), KMeans clustering for theme extraction, and deterministic confidence scoring — achieving 89.6 % on a 12-case adversarial eval suite."
    ],
    tags: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Docker", "Gemini AI"],
    links: [
      { label: "Demo", url: "https://www.loom.com/share/e9e0089db98740f18cde217bd9aff0a2" },
      { label: "GitHub", url: "https://github.com/mohdabdullahmeraj/moms-verdict" }
    ],
    mainImage: "/moms.png",
  },
  {
    id: "carbon-drivient",
    title: "Carbon Drivient",
    label: "Full Stack Project",
    year: "2026",
    description: [
      "Developed a full-stack carbon footprint tracker using React, Node.js, Express, and Sequelize, integrating the Carbon Interface API to calculate real-world vehicle emissions and visualize trip-based carbon data through interactive dashboards."
    ],
    tags: ["React", "Node.js", "Express", "MySQL", "Sequelize"],
    links: [
      { label: "GitHub", url: "https://github.com/mohdabdullahmeraj/carbon-drivient" }
    ],
    mainImage: "/carbon.png",
  },
  {
    id: "under-25",
    title: "Under 25 App Redesign",
    label: "Design Project",
    year: "2026",
    description: [
      "Established a cohesive design system with reusable components, typography, and a color palette tailored for a Gen-Z audience, ensuring a consistent user interface across all 15+ screens and improving the efficiency of the design-to-development handoff process."
    ],
    tags: ["UI/UX", "Figma", "Design Systems"],
    links: [
      { label: "Design System", url: "https://www.figma.com/design/dzVNsyG5zWuZqYciQw6Qop/UNDER-25-APP-UI_mohdabdullahmeraj?node-id=0-1&t=wyC568OXBhMQxal3-1" },
      { label: "Prototype", url: "https://www.figma.com/proto/dzVNsyG5zWuZqYciQw6Qop/UNDER-25-APP-UI_mohdabdullahmeraj?node-id=1-22&p=f&t=K8ebIFML4MjyB1uv-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A22" }
    ],
    mainImage: "/under25.png",
  },
  {
    id: "xpulse",
    title: "XPulse: Gaming Community Hub",
    label: "Design Project",
    year: "2026",
    description: [
      "Led the end-to-end UI/UX design for the \"XPulse\" gaming community hub, from a compelling landing page to a personalized user dashboard, creating a cohesive and visually immersive experience for gamers aimed at increasing new user acquisition and improving information accessibility for returning players."
    ],
    tags: ["UI/UX", "Figma", "Design Systems"],
    links: [
      { label: "Design System", url: "https://www.figma.com/design/rjXZLxGYQwQA6AHUsSsoRr/Mohd.-Abdullah-Meraj_DesignVerse?node-id=0-1&t=JxNdXvEkvTC7rW6M-1" },
      { label: "Prototype", url: "https://www.figma.com/proto/rjXZLxGYQwQA6AHUsSsoRr/Mohd.-Abdullah-Meraj_DesignVerse?node-id=2187-5&p=f&t=4jEKUfvs83ehQRh4-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2187%3A5" }
    ],
    mainImage: "/xpulse.png",
  }
];
