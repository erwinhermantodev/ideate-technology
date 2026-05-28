import { CmsContentSchema } from '../types';

export const defaultCmsData: CmsContentSchema = {
  siteName: "Ideate Technology",
  navItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    // { label: "Legal", href: "#legal" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    tagline: "PRECISION ENGINEERING",
    titleHtml: "Engineering the<br/>Future of <span class=\"text-[#0057FF] font-extrabold\">Digital Solutions</span>",
    titlePlain: "Engineering the Future of Digital Solutions",
    primaryCtaText: "View Expertise",
    secondaryCtaText: "Our Approach",
    bgImageUrl: "",
    sculptureUrl: "https://lh3.googleusercontent.com/aida/ADBb0uhKPY7xk9e70PeWQX9JB0cs2n2ockjxWPlCiwrGhZSx4dqC13DqORgT5SdJE8aFENkwfi7h1vK_dBjph1PoJCK6vgBj_8FfPvYJXGScwuQnVEaEjiju_mwZcWNDmkmFzJ07dhefggnJc7R5wTgJjsZSkvMQFvUc9-EJgN_veJYtl4KH5Q7CcsfJ69oeH1QMWuxxPev8Z3bc6El6VKpiF3VK8BlmVpDhR_lGFPzKwiC4MfhveEV3eu7YJLw"
  },
  stats: [
    { id: "stat-founded", label: "FOUNDED", value: "2024" },
    { id: "stat-industry", label: "INDUSTRY FOCUS", value: "IT, Software, Security" },
    { id: "stat-location", label: "LOCATION", value: "Bandung, Indonesia" },
    { id: "stat-legal", label: "LEGAL STATUS", value: "Official Entity" }
  ],
  services: [
    {
      id: "srv-software-dev",
      index: "01",
      title: "Software Development",
      description: "Architecting robust, scalable applications with precision-engineered codebases and modern frameworks.",
      longDescription: "Our primary team of expert engineers specializes in full-stack clean code architecture, type-safe development (TypeScript, Go, Rust), and high-security web apps designed to scale past millions of parallel requests.",
      iconName: "Code",
      accentColor: "#0057FF",
      tag: "Software"
    },
    {
      id: "srv-cloud-infra",
      index: "02",
      title: "Cloud Infrastructure",
      description: "Optimized cloud orchestration for the modern enterprise, maintaining maximum security boundaries.",
      longDescription: "Deploy securely on Cloud Run, GCP, AWS or private Kubernetes clouds. We orchestrate robust deployments with auto-healing, smart load balancing, cost-reduction pipelines, and Terraform infrastructure-as-code.",
      iconName: "Cloud",
      accentColor: "#FF5C00",
      tag: "Cloud"
    },
    {
      id: "srv-cybersecurity",
      index: "03",
      title: "Cybersecurity",
      description: "Defensive architecture and threat intelligence integration protecting critical corporate sectors.",
      longDescription: "Comprehensive compliance auditing, active penetration testing, firewall setups, and end-to-end token auditing to shield client workspaces and financial ledgers from data compromise.",
      iconName: "Shield",
      tag: "Security"
    },
    {
      id: "srv-data-analytics",
      index: "04",
      title: "Data Analytics",
      description: "Turning complex datasets into actionable strategic roadmaps via precise real-time models.",
      longDescription: "Harness modern Business Intelligence, standard data pipelines (ETL/ELT), vector DB modeling, and beautiful D3 dashboards to uncover critical growth metrics and streamline operations.",
      iconName: "BarChart3",
      tag: "Analytics"
    },
    {
      id: "srv-it-consulting",
      index: "05",
      title: "IT Consulting",
      description: "Strategic guidance for digital transformation journeys with focused architectural execution.",
      longDescription: "Let we design your software playbook. We align business goals with modern solutions to save development overhead and build future-proof system blueprints.",
      iconName: "Brain",
      accentColor: "#FF5C00",
      tag: "Consulting"
    }
  ],
  products: [
    {
      id: "prod-syumra",
      name: "Syumra Companion",
      tagline: "SACRED PILGRIMAGE COMPANION",
      description: "Integrated mobile application and live pilgrimage portal simplifying the sacred Umrah journey through real-time telemetry.",
      longDescription: "Syumra blends spiritual devotion with technical precision. Developed under GoyongNet for iOS, Android, and Web, it empowers pilgrims with automated Tawaf circuit counts, instant Qibla tracking, and real-time Sa'i milestone alerts, backed by a comprehensive Supplication library and dedicated 24/7 chat support.",
      benefits: [
        "Automated Tawaf tracking via Al Hajar Aswad calibration",
        "Real-time Sa'i milestone alerts & distance trackers",
        "Offline-first prayer timetable & high-precision Qibla compass",
        "Unified pilgrimage portal with booking checklist management"
      ],
      metric: { label: "USER SATISFACTION", value: "5.0 ★ Rating" },
      featureIcon: "Compass",
      techStack: ["Flutter", "Golang", "Redis", "PostgreSQL", "Next.js", "Docker"],
      primaryCta: "Download App"
    },
    {
      id: "prod-tokovio",
      name: "Tokovio Terminal",
      tagline: "DECENTRALIZED COMMERCE SYSTEM",
      description: "High-performance merchant operations ecosystem offering decentralized storefront infrastructure and automated settlements.",
      longDescription: "Tokovio reorganizes the digital commerce landscape for independent sellers, specialized boutiques, and premium service providers. Built with a unified seller terminal panel, automated payment settlements, real-time metrics dashboards, and localized search grids, it empowers merchants in Bandung, Tangerang, Malang, and beyond to scale their local economy securely with maximum autonomy.",
      benefits: [
        "High-performance unified seller terminal panel",
        "Automated decentralized payment settlements",
        "Real-time synchronization for metrics & settings",
        "Localized buyer network with advanced search indexes"
      ],
      metric: { label: "NETWORK MERCHANTS", value: "3 Active Stores" },
      featureIcon: "Cpu",
      techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS", "Redis"],
      primaryCta: "Launch Console"
    }
  ],
  philosophy: {
    tagline: "OUR PHILOSOPHY",
    title: "Structural Modernism",
    bodyText: "We believe that technology should be as stable as architecture. At Ideate Technology, we apply Swiss minimalist principles to digital engineering—removing the redundant and perfecting the essential. Our layouts, code, and systems reflect functional integrity and robust durability.",
    ctaText: "Our Process",
    officeImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA02Ko9ppRc0FRwMfTBihlkYRA8qv4Ln1WZWw8VTYbDAPJc5LunCsj-hDsJJz-pan6Bo3wfsId-xw0IYI2seMmvRmilGTGozKkZ5IhO9gTbuP9NPUUhEQn8L8w3GE3TwRt0Ol3WcMS6jty-HHhQTqrzVyJ9rI3moyBqp-RZb8zZkR6Qgayf6ubdFVKaD2RfPgGVrPEP8BaT9UEoLZrKViUvXqdKWteDLJ3eKFfDS8Dy9CHN9mFE3pvag7Mkti8H3Rbu08tLhdPnWag"
  },
  contact: {
    email: "",
    phone: "+62 812 2348 6798",
    address: "Jalan Kuningan XI No 16 B, Bandung, Indonesia"
  }
};
