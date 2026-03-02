import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DeployUp | IT Services Agency",
  description:
    "DeployUp is a professional IT services agency offering web development, mobile apps, AI integration, SEO, cloud solutions and more. Built by developers, for businesses.",
  keywords:
    "IT services, web development, app development, AI integration, SEO, cloud, DeployUp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
