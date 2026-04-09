"use client";

import { useEffect } from "react";
import { useScrollVelocity } from "@/lib/scrollAnimations";

const row1Skills = [
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "VS Code",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

const row2Skills = [
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
];

function SkillItem({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="skill-item">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} alt={name} width={24} height={24} loading="lazy" />
      <span>{name}</span>
    </div>
  );
}

function SkillTrack({ skills, suffix }: { skills: typeof row1Skills; suffix: string }) {
  return (
    <div className="skills-track">
      {skills.map((s) => (
        <SkillItem key={s.name + suffix} name={s.name} icon={s.icon} />
      ))}
    </div>
  );
}

const MARQUEE_WORDS = ["DEVELOPER", "DESIGNER", "CREATOR"];

export default function About() {
  useScrollVelocity();

  useEffect(() => {
    const cards = document.querySelectorAll(".education-card, .certifications-grid");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("animated"), i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Build 4 repetitions of the marquee for seamless loop
  const marqueeItems = Array.from({ length: 4 }).flatMap((_, rep) =>
    MARQUEE_WORDS.flatMap((word, wi) => [
      <span key={`word-${rep}-${wi}`}>{word}</span>,
      wi < MARQUEE_WORDS.length - 1 ? (
        <span key={`dot-${rep}-${wi}`} className="marquee-separator">•</span>
      ) : (
        <span key={`slash-${rep}`} className="marquee-separator">/</span>
      ),
    ])
  );

  return (
    <section className="about" id="about">
      {/* Marquee header */}
      <div className="about-header">
        <h2 className="marquee-text">{marqueeItems}</h2>
      </div>

      {/* Scroll-velocity skill rows */}
      <div className="skills-section">
        <div className="skills-velocity-wrapper">
          <div className="skills-velocity-row" id="skills-row-1" data-direction="1">
            <SkillTrack skills={row1Skills} suffix="-a" />
            <SkillTrack skills={row1Skills} suffix="-b" />
          </div>
        </div>

        <div className="skills-velocity-wrapper">
          <div className="skills-velocity-row" id="skills-row-2" data-direction="-1">
            <SkillTrack skills={row2Skills} suffix="-a" />
            <SkillTrack skills={row2Skills} suffix="-b" />
          </div>
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="education-section">
        <div className="education-card" data-animate="slide-up">
          <div className="education-icon">🎓</div>
          <h3 className="education-title">Bachelor of Technology</h3>
          <p className="education-subtitle">Computer Science &amp; Engineering</p>
          <p className="education-institution">Parul University, Vadodara, Gujarat</p>
          <span className="education-year">2026</span>
        </div>

        <div className="certifications-grid" data-animate="slide-up">
          {[
            { title: "Machine Learning", issuer: "Infosys Springboard" },
            { title: "Computer Network", issuer: "IIT Kharagpur" },
            { title: "IoT",             issuer: "IIT Kharagpur" },
          ].map((cert) => (
            <div className="cert-item" key={cert.title}>
              <span className="cert-title">{cert.title}</span>
              <span className="cert-issuer">{cert.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
