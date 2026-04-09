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
            i&apos;m a <strong>builder at heart</strong> 🛠️ — someone who doesn&apos;t just write
            code, but <strong>crafts aesthetic experiences</strong> ✨.
          </p>
          <p>
            currently diving deep into <strong>computer science</strong> 🎓 while shipping{" "}
            <strong>full-stack web apps</strong> 🚀. i&apos;m all about blending robust backend systems with visually stunning frontends 🎨.
          </p>
          <p>
            from <strong>real-time platforms</strong> ⚡ to{" "}
            <strong>AI-powered tools</strong> 🤖, my goal is to solve real problems with <strong>performance, clarity, & sick design</strong> 🤌.
          </p>
          <p>
            i thrive on <strong>analytical thinking</strong> 🧠 and{" "}
            <strong>continuous iteration</strong> 🔄 — building things that aren&apos;t just
            functional, but <strong>sleek, scalable, and rad</strong> 🔥.
          </p>
          <p>
            if it involves <strong>clean architecture</strong>, smooth UIs, or building
            something genuinely cool — <strong>count me in</strong> 🎯.
          </p>
        </div>
      </div>
    </section>
  );
}
