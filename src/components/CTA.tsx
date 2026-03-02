"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function CTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`relative rounded-3xl overflow-hidden ${inView ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-indigo-600" />

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />

          <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Rocket size={24} className="text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Ready to Build Something Great?
            </h2>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-9 max-w-2xl mx-auto">
              Tell us about your project and we will get back to you within 24 hours with a
              free consultation and a clear plan of action.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-9 bg-white text-primary hover:bg-white/90 gap-2 font-bold shadow-lg"
              >
                <Link href="#contact">
                  Get a Free Quote
                  <ArrowRight size={15} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-9 border-white/40 text-white bg-transparent hover:bg-white/10 hover:text-white font-semibold"
              >
                <Link href="mailto:deployup.co@gmail.com">Email Us Directly</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
