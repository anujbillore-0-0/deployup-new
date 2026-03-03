"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const jobs = [
  {
    id: "ai-fullstack-intern",
    title: "AI and Fullstack Engineer Intern",
    type: "Internship",
    location: "Remote / Hybrid",
    department: "Engineering",
    description: `DeployUp is seeking a highly motivated and technically capable AI and Fullstack Engineer Intern to join our growing engineering team. This internship offers a rare opportunity to work across the full spectrum of modern software development, spanning artificial intelligence, machine learning, backend systems, and frontend engineering. The ideal candidate is passionate about building real-world applications, eager to learn from experienced engineers, and capable of contributing meaningfully from day one.

As an AI and Fullstack Engineer Intern at DeployUp, you will participate in the design, development, and deployment of intelligent systems and web applications for our clients and internal products. You will gain hands-on experience with production-grade codebases, collaborate with cross-functional teams, and develop a deep understanding of how AI systems and web applications are architected, built, and maintained at scale.

This is a rigorous, learning-intensive internship. We expect interns to be proactive, self-directed, and committed to delivering high-quality work. You will be mentored by senior engineers and will receive regular feedback to help you grow professionally and technically.`,
    responsibilities: [
      "Design, develop, and maintain AI-powered features and pipelines using Python, LangChain, LangGraph, and related frameworks.",
      "Build and optimize Retrieval-Augmented Generation (RAG) pipelines using vector databases and large language model APIs.",
      "Develop and train classical machine learning models using scikit-learn, Keras, and TensorFlow for classification, regression, clustering, and time-series tasks.",
      "Perform data analysis, visualization, and preprocessing using NumPy, Pandas, and Matplotlib to derive actionable insights from raw datasets.",
      "Implement and evaluate deep learning architectures including convolutional neural networks, recurrent neural networks, and transformer-based models.",
      "Develop full-stack web applications using Next.js for the frontend and Django or FastAPI for backend REST API services.",
      "Design and manage relational database schemas using PostgreSQL, including query optimization, indexing strategies, and data migrations.",
      "Integrate third-party APIs and services, document API contracts using Postman, and ensure robust error handling and validation.",
      "Deploy and manage applications on AWS cloud infrastructure including EC2, S3, RDS, and Lambda, as well as VPS-based environments.",
      "Participate in code reviews, write clear documentation, and adhere to established engineering standards and best practices.",
      "Collaborate closely with the product and design teams to translate requirements into functional, performant, and maintainable software.",
      "Contribute to the continuous improvement of internal tooling, CI/CD pipelines, and development workflows.",
    ],
    requirements: [
      "Proficiency in Python and familiarity with AI/ML libraries including LangChain, LangGraph, LlamaIndex, or equivalent frameworks.",
      "Working knowledge of RAG architectures, prompt engineering, and integration with OpenAI, Anthropic, Gemini, or open-source LLM APIs.",
      "Experience with classical machine learning workflows using scikit-learn, including model training, evaluation, cross-validation, and hyperparameter tuning.",
      "Familiarity with deep learning frameworks such as Keras and TensorFlow for building and training neural network models.",
      "Strong understanding of data manipulation and analysis using Pandas and NumPy, and data visualization using Matplotlib and Seaborn.",
      "Experience building frontend applications using Next.js and React, with a solid understanding of component architecture, hooks, and state management.",
      "Familiarity with RESTful API design principles and experience building or consuming APIs using Django REST Framework or FastAPI.",
      "Basic to intermediate proficiency with PostgreSQL, including writing efficient SQL queries, designing normalized schemas, and managing migrations.",
      "Exposure to cloud platforms such as AWS (EC2, S3, RDS, IAM) or experience deploying applications to VPS environments using Nginx and systemd.",
      "Understanding of version control workflows using Git and familiarity with collaborative development on GitHub or GitLab.",
      "Experience testing and documenting APIs using Postman or equivalent tools.",
      "Strong problem-solving skills, attention to detail, and the ability to work independently and in a team setting.",
    ],
    stack: [
      "Python", "LangChain", "LangGraph", "RAG", "OpenAI API", "Vector Databases",
      "scikit-learn", "Keras", "TensorFlow", "PyTorch (basic)", "NumPy", "Pandas",
      "Matplotlib", "Seaborn", "Next.js", "React", "TypeScript", "Django",
      "Django REST Framework", "FastAPI", "PostgreSQL", "AWS (EC2, S3, RDS)",
      "VPS / Nginx", "REST API", "Postman", "Git", "Docker (basic)",
    ],
  },
  {
    id: "android-intern",
    title: "Android Development Intern",
    type: "Internship",
    location: "Remote / Hybrid",
    department: "Mobile Engineering",
    description: `DeployUp is looking for a passionate and skilled Android Development Intern to join our mobile engineering team. This internship is designed for individuals who are genuinely enthusiastic about mobile application development and eager to build polished, performant, and user-centric Android applications. The successful candidate will have the opportunity to work on real client projects and internal products, gaining exposure to professional mobile development workflows from design and architecture through to testing and deployment.

As an Android Development Intern at DeployUp, you will work under the guidance of senior mobile engineers and contribute directly to production applications distributed on the Google Play Store. You will be involved in feature development, bug resolution, code review participation, and the continuous improvement of mobile codebases. This is an opportunity to significantly accelerate your Android development career in a fast-paced, collaborative environment.

We value candidates who take initiative, write clean and well-documented code, and are committed to delivering excellent user experiences. You will be expected to understand mobile development fundamentals deeply, stay current with industry best practices, and bring thoughtful solutions to complex engineering problems.`,
    responsibilities: [
      "Design and develop native Android applications using Kotlin as the primary programming language, following modern Android development patterns and guidelines.",
      "Build cross-platform mobile applications using Flutter and Dart, ensuring consistent UI and functionality across Android and iOS platforms.",
      "Implement responsive, accessible, and visually polished user interfaces using Jetpack Compose and XML-based layout systems.",
      "Integrate RESTful APIs and third-party SDKs, handling authentication, data serialization, and network error states gracefully.",
      "Manage application state using architecture patterns such as MVVM, Clean Architecture, and state management solutions including Provider, Riverpod, or BLoC in Flutter.",
      "Implement local data persistence using Room Database, SQLite, and SharedPreferences for offline-capable application experiences.",
      "Utilize Firebase services including Firestore, Firebase Authentication, Cloud Messaging (FCM), Crashlytics, and Remote Config for backend integration and analytics.",
      "Write unit tests and integration tests using JUnit, Mockito, and Flutter's testing framework to maintain code quality and reliability.",
      "Optimize application performance through profiling, memory leak detection using Android Studio's Profiler, and efficient use of coroutines and asynchronous programming.",
      "Collaborate with UI/UX designers to implement pixel-perfect designs, animations, and transitions that enhance the user experience.",
      "Publish and manage applications on the Google Play Store, including handling versioning, signing, release tracks, and rollout strategies.",
      "Participate in sprint planning, daily standups, and code reviews, contributing constructively to a collaborative agile development process.",
    ],
    requirements: [
      "Strong proficiency in Kotlin and a solid understanding of Java for Android development, including object-oriented and functional programming paradigms.",
      "Experience developing mobile applications using Flutter and Dart, including widget composition, navigation, and platform-specific integrations.",
      "Familiarity with Android Studio IDE, including the emulator, logcat, debugger, and performance profiling tools.",
      "Understanding of Android SDK components including Activities, Fragments, Services, BroadcastReceivers, ContentProviders, and Intents.",
      "Experience with Jetpack libraries including LiveData, ViewModel, Navigation Component, WorkManager, and Jetpack Compose.",
      "Proficiency integrating REST APIs using Retrofit, OkHttp, or Dio (Flutter), with proper handling of authentication headers, interceptors, and error responses.",
      "Familiarity with Firebase services including Authentication, Firestore or Realtime Database, and Cloud Messaging.",
      "Basic understanding of Room Database and SQLite for local data persistence, including entity design and DAO patterns.",
      "Knowledge of dependency injection patterns, preferably with Hilt or Dagger for Android, or GetIt for Flutter projects.",
      "Strong understanding of asynchronous programming using Kotlin Coroutines, Flow, and async/await patterns in Dart.",
      "Experience with Git version control and collaborative workflows using pull requests, branching strategies, and conflict resolution.",
      "Ability to read and implement designs from Figma or Adobe XD, including custom animations using Lottie or Flutter's animation APIs.",
    ],
    stack: [
      "Kotlin", "Java", "Flutter", "Dart", "Android Studio", "Jetpack Compose",
      "Jetpack Libraries", "MVVM", "Clean Architecture", "Room Database", "SQLite",
      "SharedPreferences", "Retrofit", "OkHttp", "Dio", "Firebase", "Firestore",
      "FCM", "Crashlytics", "Hilt / Dagger", "GetIt", "Kotlin Coroutines",
      "BLoC / Riverpod", "REST API", "Google Play Store", "Git", "Figma",
    ],
  },
];

export default function JobsPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-accent/30 to-background border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-4 tracking-wide uppercase">
              We are Hiring
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-5">
              Join the <span className="gradient-text">DeployUp</span> Team
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              We are a fast-growing IT services company building real-world products for clients across the globe. We are looking for talented interns who are hungry to learn, build, and make a meaningful impact.
            </p>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">
              Open Positions ({jobs.length})
            </h2>

            {jobs.map((job) => {
              const isExpanded = expandedJob === job.id;
              return (
                <div
                  key={job.id}
                  className="border border-border rounded-2xl bg-card overflow-hidden shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Job Header */}
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                            {job.type}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                            {job.department}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border">
                            {job.location}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                          {job.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {job.description.split("\n\n")[0]}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:items-end shrink-0">
                        <Button asChild className="rounded-full px-6 font-semibold shadow-sm">
                          <Link href={`/jobs/apply?role=${job.id}`}>Apply Now</Link>
                        </Button>
                        <button
                          onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                          className="text-xs text-primary hover:underline font-medium text-center"
                        >
                          {isExpanded ? "Hide Details" : "View Full Description"}
                        </button>
                      </div>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {job.stack.slice(0, 12).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent text-accent-foreground border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {job.stack.length > 12 && (
                        <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border">
                          +{job.stack.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="border-t border-border px-6 sm:px-8 pb-8 pt-6 space-y-8 bg-muted/20">
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          About the Role
                        </h4>
                        {job.description.split("\n\n").map((para, i) => (
                          <p key={i} className="text-foreground text-sm leading-relaxed mb-3 last:mb-0">
                            {para}
                          </p>
                        ))}
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((item, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-foreground leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((item, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-foreground leading-relaxed">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Full Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {job.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md text-xs font-medium bg-accent text-accent-foreground border border-border"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <Button asChild className="rounded-full px-8 font-semibold shadow-sm">
                        <Link href={`/jobs/apply?role=${job.id}`}>Apply for this Position</Link>
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-2xl border border-border bg-card p-10 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Do not see a role that fits?
              </h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                We are always on the lookout for exceptional talent. Reach out to us directly and let us know how you can contribute to DeployUp.
              </p>
              <Button asChild variant="outline" className="rounded-full px-6 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/#contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
