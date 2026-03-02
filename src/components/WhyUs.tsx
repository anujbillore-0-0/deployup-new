"use client";

import { useInView } from "react-intersection-observer";
import { CheckCircle2, Clock, Users2, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: CheckCircle2,
    title: "End-to-End Ownership",
    desc: "We handle every phase from discovery and design through development, deployment and post-launch support.",
    color: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We set realistic timelines and stick to them. No surprises, no delays and clear communication throughout.",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: Users2,
    title: "Founder-Led Execution",
    desc: "You work directly with the founders, not a chain of account managers. Senior attention from day one.",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    icon: Lightbulb,
    title: "Technology That Fits",
    desc: "We recommend the right stack for your goals, not the trendiest one. Practical choices that grow with you.",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

export default function WhyUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="why-us" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className={inView ? "animate-fade-in-up" : "opacity-0"}>
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-primary border-primary/30 bg-primary/5"
            >
              Why DeployUp
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-5">
              A Partner You Can{" "}
              <span className="gradient-text">Actually Trust</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-10">
              We are a lean, founder-run agency combining deep technical expertise with genuine
              business understanding. Every line of code is aimed at one outcome: measurable
              results for you.
            </p>

            <div className="flex flex-col gap-6">
              {reasons.map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="flex gap-4 items-start group">
                  <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${color} flex items-center justify-center mt-0.5 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div
            className={inView ? "animate-fade-in-up" : "opacity-0"}
            style={{ animationDelay: "0.15s" }}
          >
            <div className="relative">
              <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                {/* Brand */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
                    <span className="text-2xl font-black text-primary-foreground">D</span>
                  </div>
                  <div>
                    <div className="text-xl font-black text-foreground">DeployUp</div>
                    <div className="text-sm text-muted-foreground">deployup.in</div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { value: "50+", label: "Projects" },
                    { value: "12+", label: "Services" },
                    { value: "2", label: "Founders" },
                    { value: "24h", label: "Response Time" },
                  ].map(({ value, label }) => (
                    <div key={label} className="bg-muted/60 rounded-2xl p-5 text-center">
                      <div className="text-3xl font-black text-primary leading-none">{value}</div>
                      <div className="text-xs text-muted-foreground mt-2 font-medium">{label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-center text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
                  Building reliable digital products for startups and growing businesses across
                  India and beyond.
                </p>
              </div>

              {/* Decorative blobs */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-indigo-500/6 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
