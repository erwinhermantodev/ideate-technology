export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // Dynamic icon mapper using lucide-react
  accentColor?: string;
  tag?: string;
}

export interface HeroContent {
  tagline: string;
  titleHtml: string; // Support for HTML formatting (like <span class="text-tech-blue">)
  titlePlain: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  bgImageUrl: string;
  sculptureUrl: string;
}

export interface PhilosophyContent {
  tagline: string;
  title: string;
  bodyText: string;
  ctaText: string;
  officeImageUrl: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  benefits: string[];
  metric: { label: string; value: string };
  featureIcon: string;
  techStack: string[];
  primaryCta: string;
}

export interface CmsContentSchema {
  siteName: string;
  navItems: NavItem[];
  hero: HeroContent;
  stats: StatItem[];
  services: ServiceItem[];
  products: ProductItem[];
  philosophy: PhilosophyContent;
  contact: ContactInfo;
}

export interface ContactInquiry {
  name: string;
  projectType: string;
  message: string;
  dateSubmitted?: string;
  status?: 'pending' | 'success' | 'failed';
}

export interface CmsConfig {
  useExternalApi: boolean;
  apiUrl: string;
  lastFetchedAt: string | null;
  isLoading: boolean;
  connectionError: string | null;
}
