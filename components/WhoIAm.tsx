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
            <strong>✨ Architecting the Digital Future | Lifelong Learner | Maker</strong>
          </p>

          <p>
            To me, code isn&apos;t just syntax — it&apos;s a canvas. I don&apos;t just build apps; I forge digital experiences that feel intuitive, seamless, and alive. 
          </p>

          <p>
            I&apos;m currently navigating the depths of Computer Science, driven by an obsession with turning complex logic into <strong>scalable, high-performance solutions</strong>. I thrive on the challenge of taking an abstract idea and sculpting it into a product that genuinely resonates with people.
          </p>

          <p>
            ⚡ My philosophy lives at the intersection of:<br/>
            🚀 Uncompromising performance<br/>
            🎨 Beautiful, purposeful design<br/>
            🧠 Forward-thinking system architecture
          </p>

          <p>
            My approach is deeply rooted in <strong>curiosity, systems thinking, and relentless iteration</strong>. I believe that an exceptional application shouldn&apos;t just work perfectly—it should feel like magic to the user. Every pixel, every database query, and every animation is a deliberate choice toward that goal.
          </p>

          <p>
            💻 My creative toolkit:<br/>
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>React • Next.js • Node.js • TypeScript • MongoDB • PostgreSQL • Supabase</span>
          </p>

          <p>
            ⚙️ When I step away from the IDE:<br/>
            • I&apos;m diving into open-source communities<br/>
            • Brainstorming at hackathons<br/>
            • Surfing the bleeding edge of AI, Web3, and cloud tech
          </p>

          <p>
            I don&apos;t just want to keep pace with technology — I want to push its boundaries.
          </p>
          
          <p>
            💡 If it involves building something bold, solving a difficult puzzle, or making a lasting impact — <strong>I&apos;m all in.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
