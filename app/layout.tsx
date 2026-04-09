import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ansh Paswan - Full-Stack Developer",
  description:
    "Explore the portfolio of Ansh Paswan. Full-stack projects, web apps, and innovative solutions built with React, Next.js, Node.js, and modern technologies.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Ansh Paswan",
  ],
  authors: [{ name: "Ansh Paswan" }],
  openGraph: {
    title: "Ansh Paswan - Full-Stack Developer",
    description:
      "Passionate Full-Stack Developer building scalable web applications with React, Node.js, and cloud technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansh Paswan - Full-Stack Developer",
    description:
      "Passionate Full-Stack Developer building scalable web applications.",
    creator: "@anshhh68",
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
    <html lang="en" className={`${spaceMono.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
