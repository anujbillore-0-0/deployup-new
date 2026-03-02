"use client";

import { useInView } from "react-intersection-observer";
import {
  Globe,
  Smartphone,
  Brain,
  Search,
  Cloud,
  ShieldCheck,
  BarChart3,
  Palette,
  Database,
  ShoppingCart,
  Megaphone,
  Settings2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Custom responsive websites built with modern frameworks. From landing pages to full-scale web applications.",
    tags: ["Next.js", "React", "WordPress"],
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform and native mobile apps for iOS and Android designed for performance and great UX.",
    tags: ["React Native", "Flutter"],
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Embed intelligent features into your product: chatbots, recommendation engines and automation workflows.",
    tags: ["OpenAI", "LangChain", "Python"],
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Rank higher and drive organic traffic with technical SEO, on-page optimisation and content strategy.",
    tags: ["Technical SEO", "Analytics", "Core Vitals"],
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    desc: "Deploy and scale infrastructure on AWS, GCP or Azure with best-practice DevOps pipelines.",
    tags: ["AWS", "GCP", "Docker", "CI/CD"],
    color: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    desc: "User-first design systems, wireframes and high-fidelity prototypes that convert visitors into customers.",
    tags: ["Figma", "Prototyping", "Design Systems"],
    color: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  },
  {
    icon: Database,
    title: "Backend Development",
    desc: "Scalable REST and GraphQL APIs, microservices and database architecture built for reliability.",
    tags: ["Node.js", "PostgreSQL", "Redis"],
    color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity Audits",
    desc: "Identify and remediate vulnerabilities in your web applications and infrastructure before attackers do.",
    tags: ["Penetration Testing", "OWASP"],
    color: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
  {
    icon: BarChart3,
    title: "Analytics and Reporting",
    desc: "Set up data pipelines, dashboards and KPI tracking so every decision is backed by real data.",
    tags: ["GA4", "Looker Studio", "BigQuery"],
    color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Development",
    desc: "Full-featured online stores with payment gateways, inventory management and seamless checkout flows.",
    tags: ["Shopify", "Stripe", "WooCommerce"],
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Strategic paid ads, email campaigns and social media growth plans that deliver measurable ROI.",
    tags: ["Google Ads", "Meta Ads", "Email"],
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  {
    icon: Settings2,
    title: "IT Consulting",
    desc: "Technology roadmaps, architecture reviews and hands-on consulting to help your team ship faster.",
    tags: ["Strategy", "Architecture", "Audits"],
    color: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
];

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="services" className="py-24 bg-muted/30 dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-primary border-primary/30 bg-primary/5"
          >
            What We Do
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            Services Built for{" "}
            <span className="gradient-text">Modern Businesses</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            From idea to deployment, we cover every layer of your digital stack with expertise and
            precision.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map(({ icon: Icon, title, desc, tags, color }, i) => (
            <div
              key={title}
              className={`group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300 flex flex-col gap-4 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={20} />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-bold text-foreground text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Subtle top accent bar on hover */}
              <div className="absolute top-0 left-6 right-6 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
