"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Linkedin,
  Globe,
  ExternalLink,
  CheckCircle2,
  Loader2,
  MapPin,
} from "lucide-react";

const founders = [
  {
    name: "Anuj Billore",
    role: "Co-Founder",
    initials: "AB",
    gradient: "from-blue-500 to-indigo-600",
    linkedin: "https://www.linkedin.com/in/anuj-billore-a1b26b252/",
    portfolio: "https://anuj-portfolio-web.vercel.app/",
  },
  {
    name: "Aditya Saxena",
    role: "Co-Founder",
    initials: "AS",
    gradient: "from-violet-500 to-purple-600",
    linkedin: "https://www.linkedin.com/in/aditya-saxena-452773266/",
    portfolio: null,
  },
];

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Main contact section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20">
          {/* Left column */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                <span className="text-primary-foreground font-black text-base">D</span>
              </div>
              <span className="font-black text-xl tracking-tight text-foreground">
                Deploy<span className="text-primary">Up</span>
              </span>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              A founder-run IT services agency building reliable digital products for startups
              and businesses across India and beyond.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mb-8">
              <a
                href="mailto:deployup.co@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                <Mail size={14} />
                deployup.co@gmail.com
              </a>
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                India
              </div>
            </div>

            {/* Founders */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-5">
                Meet the Founders
              </p>
              <div className="flex flex-col gap-5">
                {founders.map((f) => (
                  <div key={f.name} className="flex items-center gap-4">
                    {/* Avatar circle */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-background`}
                    >
                      {f.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-foreground text-sm leading-tight">{f.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{f.role}, DeployUp</div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <a
                          href={f.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline underline-offset-4"
                        >
                          <Linkedin size={11} />
                          LinkedIn
                        </a>
                        {f.portfolio && (
                          <a
                            href={f.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-4"
                          >
                            <Globe size={11} />
                            Portfolio
                            <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-1.5">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Fill in the form and we will respond within 24 hours.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center bg-primary/5 rounded-2xl border border-primary/20">
                <CheckCircle2 size={48} className="text-primary" />
                <h3 className="text-lg font-bold text-foreground">Message Sent!</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks for reaching out. We will respond within 24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1 rounded-full"
                  onClick={() => setStatus("idle")}
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name" className="text-xs font-bold text-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-xs font-bold text-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="subject" className="text-xs font-bold text-foreground">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Tell us about your project"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="message" className="text-xs font-bold text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your project, timeline and any relevant details..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="resize-none rounded-xl"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full w-full sm:w-auto sm:self-start px-10 gap-2 font-bold"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DeployUp. All rights reserved.
          </p>
          <nav className="flex items-center gap-5 flex-wrap justify-center">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
