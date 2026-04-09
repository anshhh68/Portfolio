"use client";

import { useEffect, useRef } from "react";

export default function WhoIAm() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [labelRef.current, dividerRef.current, contentRef.current].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="who-i-am" id="who-i-am" aria-label="About Ansh Paswan">
      <div className="who-i-am-inner">
        {/* Section label */}
        <span className="who-i-am-label" ref={labelRef}>
          Who I Am
        </span>

        {/* Decorative divider */}
        <div className="who-divider" ref={dividerRef}>
          <div className="who-divider-line" />
          <div className="who-divider-dot" />
          <div className="who-divider-line" />
        </div>

        {/* Content */}
        <div className="who-i-am-content" ref={contentRef}>
          <p>
            <strong>💻✨ Full-Stack Developer | Builder | Problem Solver</strong>
          </p>

          <p>
            I don&apos;t just write code — I build experiences.
          </p>

          <p>
            Currently pursuing Computer Science, I&apos;m a passionate full-stack developer focused on crafting <strong>scalable, high-performance web applications</strong> with clean architecture and premium UI. From real-time systems to AI-powered tools, I love turning complex ideas into intuitive digital products.
          </p>

          <p>
            ⚡ My work lives at the intersection of:<br/>
            🚀 Performance & scalability<br/>
            🎨 Clean, modern UI/UX<br/>
            🤖 AI + real-world applications
          </p>

          <p>
            I&apos;ve built and deployed multiple full-stack projects — from <strong>real-time chat systems</strong> to <strong>AI-driven video captioning tools</strong> — always focusing on speed, usability, and impact. My development approach is rooted in <strong>problem-solving, system thinking, and continuous iteration</strong>.
          </p>

          <p>
            🧠 Tech I work with:<br/>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>React • Next.js • Node.js • TypeScript • MongoDB • PostgreSQL • Supabase</span>
          </p>

          <p>
            ⚙️ Beyond coding:<br/>
            • Active open-source contributor<br/>
            • Hackathon participant<br/>
            • Always exploring AI, Web3, and cloud tech
          </p>

          <p>
            I believe great products are not just functional — they feel right.
          </p>
          
          <p>
            💡 If it involves building something meaningful, scalable, and slightly challenging — <strong>I&apos;m all in.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
