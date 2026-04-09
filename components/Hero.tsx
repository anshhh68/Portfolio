"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Hero() {
  // Parallax effect on hero image
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroImage = document.querySelector(
            ".hero-image-container"
          ) as HTMLElement | null;
          const scrollY = window.scrollY;
          if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrollY * 0.1}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>(".hero-cta");
    const handlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];

    btns.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
      };
      const leave = () => {
        btn.style.transform = "";
      };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section className="hero" id="hero">
      {/* Top Row: Name + Image */}
      <div className="hero-top">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">
              <span className="title-text" data-animate="title">
                ANSH
              </span>
            </span>
            <span className="title-line">
              <span className="title-text" data-animate="title">
                PASWAN
              </span>
            </span>
          </h1>
          <div className="hero-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7V17M17 7H7" />
            </svg>
          </div>
        </div>

        <div className="hero-image-container" data-animate="scale">
          <div className="hero-image">
            <Image
              src="/profile.jpg"
              alt="Ansh Paswan - Full-Stack Developer"
              fill
              sizes="(max-width: 768px) 200px, 320px"
              className="hero-image-fill"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Row: Description, CTA, Status */}
      <div className="hero-bottom">
        <div className="hero-left">
          <div className="hero-description">
            <p data-animate="fade">✨ crafting aesthetic & scalable web apps.</p>
            <p data-animate="fade">☕ turning coffee into sleek digital experiences.</p>
            <p data-animate="fade">🌍 based anywhere. open to cool global gigs.</p>
          </div>

          <a href="#contact" className="hero-cta" data-animate="fade">
            <span>CONTACT</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7V17M17 7H7" />
            </svg>
          </a>
        </div>

        <div className="hero-status">
          <span className="status-label" data-animate="fade">
            PING FOR WORK
          </span>
        </div>
      </div>
    </section>
  );
}
