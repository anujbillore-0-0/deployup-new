"use client";

import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import {
  PhoneCall,
  FileText,
  Layers,
  FlaskConical,
  Rocket,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Discovery Call",
    desc: "A free consultation to understand your goals, audience and technical requirements. No fluff, just clarity.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Proposal and Scoping",
    desc: "You receive a detailed proposal with clear scope, timeline and fixed pricing. Full transparency before we write a line.",
  },
  {
    number: "03",
    icon: Layers,
    title: "Design and Development",
    desc: "We build iteratively, sharing progress at regular checkpoints so you stay informed and in control.",
  },
  {
    number: "04",
    icon: FlaskConical,
    title: "Testing and QA",
    desc: "Every deliverable goes through rigorous QA including cross-device testing, performance audits and security checks.",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Launch",
    desc: "We handle deployment, DNS and go-live checks so your product ships smoothly without last-minute chaos.",
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Support and Growth",
    desc: "Post-launch we stay available for maintenance, updates and iterative improvements to keep you ahead.",
  },
];

export default function Process() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="process" className="py-24 bg-muted/30 dark:bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-[11px] font-bold tracking-[0.12em] uppercase text-primary border-primary/30 bg-primary/5"
          >
            How We Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            A Clear Process,{" "}
            <span className="gradient-text">Start to Finish</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            No surprises. Every project follows a structured workflow that keeps you informed
            and in control at every stage.
          </p>
        </div>

        {/* Steps */}
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {steps.map(({ number, icon: Icon, title, desc }, i) => (
            <div
              key={number}
              className={`relative group bg-card border border-border rounded-2xl p-7 hover:border-primary/40 hover:shadow-md transition-all duration-300 ${
                inView ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Step number - decorative */}
              <div className="absolute top-5 right-6 text-4xl font-black text-primary/8 group-hover:text-primary/15 transition-colors select-none leading-none">
                {number}
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <Icon size={18} className="text-primary" />
              </div>

              <h3 className="font-bold text-foreground text-sm mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-7 right-7 h-[2px] rounded-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
