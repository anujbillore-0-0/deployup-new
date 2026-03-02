"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Sparkles, Zap, Globe } from "lucide-react";

const floatingCards = [
  { icon: Code2,     label: "Full-Stack Dev",  sub: "React · Node.js",     pos: "top-[22%] left-[3%]",  delay: "0.1s" },
  { icon: Sparkles,  label: "AI Integration",  sub: "GPT · LangChain",     pos: "top-[16%] right-[4%]", delay: "0.25s" },
  { icon: Zap,       label: "Fast Delivery",   sub: "Sprint-based",        pos: "bottom-[26%] left-[2%]", delay: "0.4s" },
  { icon: Globe,     label: "SEO Ready",       sub: "Core Web Vitals",     pos: "bottom-[20%] right-[3%]", delay: "0.55s" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(0.50 0.22 260) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating badges - large screens only */}
      {floatingCards.map(({ icon: Icon, label, sub, pos, delay }) => (
        <div
          key={label}
          className={`absolute hidden xl:flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3 shadow-md ${pos}`}
          style={{ animation: `fadeInUp 0.6s ${delay} ease both, floatY 5s ${delay} ease-in-out infinite` }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon size={14} className="text-primary" />
          </div>
          <div>
            <div className="text-xs font-semibold text-foreground leading-tight">{label}</div>
            <div className="text-[10px] text-muted-foreground">{sub}</div>
          </div>
        </div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24 lg:py-32">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{ animation: "fadeInUp 0.65s 0.05s ease both" }}
        >
          <Badge
            variant="outline"
            className="mb-7 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-primary border-primary/30 bg-primary/5"
          >
            IT Services Agency
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black leading-[1.1] tracking-tight text-foreground mb-6">
            We Build Digital
            <br />
            <span className="gradient-text">Products That Grow</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
            DeployUp delivers end-to-end IT solutions: websites, mobile apps, AI integrations,
            cloud infrastructure and growth-focused digital marketing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full px-8 gap-2 font-semibold shadow-md">
              <Link href="#contact">
                Start Your Project
                <ArrowRight size={15} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 font-semibold border-border"
            >
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex items-center justify-center gap-10 sm:gap-16 flex-wrap">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "12+", label: "Service Areas" },
              { value: "100%", label: "Client Focused" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-primary leading-none">{value}</div>
                <div className="text-xs text-muted-foreground mt-1.5 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
