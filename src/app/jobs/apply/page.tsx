"use client";

import { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { ChevronDown, Upload, X, CheckCircle2, Loader2 } from "lucide-react";

const ROLES = [
  { value: "ai-fullstack-intern", label: "AI and Fullstack Engineer Intern" },
  { value: "android-intern", label: "Android Development Intern" },
];

const BATCHES = ["2027", "2028", "2029"];
const GENDERS = ["Male", "Female"];

function SelectField({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-xl border px-4 py-2.5 pr-10 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
            error ? "border-destructive" : "border-input"
          } ${value === "" ? "text-muted-foreground" : "text-foreground"}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-foreground bg-background">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
        />
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  maxLength,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function TextareaField({
  label,
  id,
  value,
  onChange,
  placeholder,
  required,
  error,
  rows = 4,
  hint,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
          error ? "border-destructive" : "border-input"
        }`}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

type FormData = {
  role: string;
  name: string;
  email: string;
  batch: string;
  gender: string;
  address: string;
  skills: string;
  projectDescription: string;
  projectLink: string;
  whyJoin: string;
  legallyAuthorized: string;
  requiresSponsorship: string;
};

type FormErrors = Partial<Record<keyof FormData | "resume", string>>;

function ApplyForm() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") ?? "";

  const [form, setForm] = useState<FormData>({
    role: ROLES.find((r) => r.value === roleParam) ? roleParam : "",
    name: "",
    email: "",
    batch: "",
    gender: "",
    address: "",
    skills: "",
    projectDescription: "",
    projectLink: "",
    whyJoin: "",
    legallyAuthorized: "",
    requiresSponsorship: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (key: keyof FormData) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setErrors((er) => ({ ...er, resume: "Only PDF files are accepted." }));
      return;
    }
    if (file.size > 1024 * 1024) {
      setErrors((er) => ({ ...er, resume: "File size must be under 1 MB." }));
      return;
    }
    setResume(file);
    setErrors((er) => ({ ...er, resume: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.role) e.role = "Please select a position.";
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "A valid email address is required.";
    if (!form.batch) e.batch = "Please select your graduation batch.";
    if (!form.gender) e.gender = "Please select your gender.";
    if (!form.address.trim()) e.address = "Address is required.";
    if (!resume) e.resume = "Please attach your resume (PDF, max 1 MB).";
    if (!form.skills.trim()) e.skills = "Please list your skills.";
    if (!form.projectDescription.trim())
      e.projectDescription = "Please describe a relevant project.";
    if (!form.whyJoin.trim()) e.whyJoin = "Please tell us why you want to join DeployUp.";
    if (!form.legallyAuthorized)
      e.legallyAuthorized = "Please answer this question.";
    if (!form.requiresSponsorship)
      e.requiresSponsorship = "Please answer this question.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrKey = Object.keys(errs)[0];
      document.getElementById(firstErrKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append("resume", resume!);

      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <>
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center px-4 py-32">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
              Thank you for applying to DeployUp. We've received your application and will
              review it carefully. Our recruitment process includes a profile screening,
              followed by a technical assessment, and a final interview round. You'll hear
              from us if your profile moves forward. In the meantime, stay updated on
              company news, open roles, and announcements by following us on{" "}
              
                href="https://www.linkedin.com/company/deployup/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                LinkedIn
              </a>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline" className="rounded-full px-6 font-semibold">
                <Link href="/jobs">View All Jobs</Link>
              </Button>
              <Button asChild className="rounded-full px-6 font-semibold">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/30 to-background border-b border-border">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronDown size={14} className="rotate-90" />
              Back to All Jobs
            </Link>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 tracking-wide uppercase">
              Job Application
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-3">
              Apply at DeployUp
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Complete all fields below. All fields marked with an asterisk are mandatory. Your resume must be a PDF file under 1 MB.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">

              {/* Section: Position */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Position
                </h2>
                <SelectField
                  label="Position Applying For"
                  id="role"
                  value={form.role}
                  onChange={setField("role")}
                  options={ROLES}
                  placeholder="Select a position"
                  required
                  error={errors.role}
                />
              </div>

              {/* Section: Personal Information */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Personal Information
                </h2>
                <InputField
                  label="Full Name"
                  id="name"
                  value={form.name}
                  onChange={setField("name")}
                  placeholder="Enter your full name"
                  required
                  error={errors.name}
                />
                <InputField
                  label="Email Address"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="you@example.com"
                  required
                  error={errors.email}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <SelectField
                    label="Graduation Batch"
                    id="batch"
                    value={form.batch}
                    onChange={setField("batch")}
                    options={BATCHES.map((b) => ({ value: b, label: `Batch of ${b}` }))}
                    placeholder="Select batch"
                    required
                    error={errors.batch}
                  />
                  <SelectField
                    label="Gender"
                    id="gender"
                    value={form.gender}
                    onChange={setField("gender")}
                    options={GENDERS.map((g) => ({ value: g, label: g }))}
                    placeholder="Select gender"
                    required
                    error={errors.gender}
                  />
                </div>
                <TextareaField
                  label="Current Address"
                  id="address"
                  value={form.address}
                  onChange={setField("address")}
                  placeholder="Enter your full current address including city, state, and pincode"
                  required
                  rows={3}
                  error={errors.address}
                />
              </div>

              {/* Section: Resume */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Resume
                </h2>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-foreground">
                    Attach Resume <span className="text-destructive">*</span>
                  </label>
                  <p className="text-xs text-muted-foreground">PDF format only. Maximum file size: 1 MB.</p>

                  {resume ? (
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/30 bg-primary/5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">PDF</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{resume.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(resume.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResume(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="p-1 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full flex flex-col items-center justify-center gap-2 px-4 py-8 rounded-xl border-2 border-dashed transition-colors hover:bg-accent cursor-pointer ${
                        errors.resume ? "border-destructive" : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Upload size={22} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-medium">
                        Click to upload your resume
                      </span>
                      <span className="text-xs text-muted-foreground">PDF only, max 1 MB</span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {errors.resume && <p className="text-xs text-destructive">{errors.resume}</p>}
                </div>
              </div>

              {/* Section: Professional Background */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Professional Background
                </h2>
                <TextareaField
                  label="Skills"
                  id="skills"
                  value={form.skills}
                  onChange={setField("skills")}
                  placeholder="List your technical skills, tools, frameworks, and languages (e.g., Python, React, PostgreSQL, LangChain, Flutter, etc.)"
                  required
                  rows={3}
                  error={errors.skills}
                  hint="Include programming languages, frameworks, tools, and any other relevant technical skills."
                />
                <TextareaField
                  label="Describe a Relevant Project"
                  id="projectDescription"
                  value={form.projectDescription}
                  onChange={setField("projectDescription")}
                  placeholder="Describe a project you have built that is relevant to the role you are applying for. Include the problem it solved, your role, the technologies used, and the outcome."
                  required
                  rows={5}
                  error={errors.projectDescription}
                  hint="This should be a project closely aligned with the role you are applying for."
                />
                <InputField
                  label="Project Link (if deployed or hosted)"
                  id="projectLink"
                  type="url"
                  value={form.projectLink}
                  onChange={setField("projectLink")}
                  placeholder="https://your-project.com or https://github.com/yourname/project"
                  error={errors.projectLink}
                />
                <TextareaField
                  label="Why Do You Want to Join DeployUp?"
                  id="whyJoin"
                  value={form.whyJoin}
                  onChange={setField("whyJoin")}
                  placeholder="Tell us why you are interested in joining DeployUp specifically, what you hope to contribute, and what you aim to learn during this internship."
                  required
                  rows={5}
                  error={errors.whyJoin}
                />
              </div>

              {/* Section: Legal */}
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm space-y-5">
                <h2 className="text-base font-bold text-foreground border-b border-border pb-3">
                  Legal Authorization
                </h2>
                <SelectField
                  label="Are you legally authorized to work in India?"
                  id="legallyAuthorized"
                  value={form.legallyAuthorized}
                  onChange={setField("legallyAuthorized")}
                  options={[
                    { value: "yes", label: "Yes, I am legally authorized to work in India" },
                    { value: "no", label: "No, I am not legally authorized to work in India" },
                  ]}
                  placeholder="Select an answer"
                  required
                  error={errors.legallyAuthorized}
                />
                <SelectField
                  label="Will you now or in the future require sponsorship for employment authorization?"
                  id="requiresSponsorship"
                  value={form.requiresSponsorship}
                  onChange={setField("requiresSponsorship")}
                  options={[
                    { value: "no", label: "No, I will not require sponsorship" },
                    { value: "yes", label: "Yes, I will require sponsorship" },
                  ]}
                  placeholder="Select an answer"
                  required
                  error={errors.requiresSponsorship}
                />
              </div>

              {/* Error Banner */}
              {status === "error" && (
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {errorMsg}
                </div>
              )}

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="rounded-full px-10 font-bold shadow-sm text-base"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Submitting Application...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm pt-2 sm:pt-3">
                  By submitting this form, you confirm that the information provided is accurate and complete to the best of your knowledge.
                </p>
              </div>
            </form>
          </div>
          </section>
        </main>
        <Footer />
      </>
    );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ApplyForm />
    </Suspense>
  );
}

