import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Asya Unal",
    template: "%s | Asya Unal",
  },
  description: "Computer Science student at Bilkent University. Building AI systems, exploring LLM agents, and doing full-stack development.",
  keywords: ["software engineer", "AI", "machine learning", "LLM", "full-stack", "Bilkent University"],
  authors: [{ name: "Asya Unal" }],
  creator: "Asya Unal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asyaunal.com",
    siteName: "Asya Unal",
    title: "Asya Unal - Software Engineer & Researcher",
    description: "Computer Science student at Bilkent University. Building AI systems, exploring LLM agents, and doing full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Asya Unal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asya Unal - Software Engineer & Researcher",
    description: "Computer Science student at Bilkent University. Building AI systems and software.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="Asya Unal's Blog" href="/feed.xml" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
