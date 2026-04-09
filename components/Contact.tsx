"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/* ── Verified badge SVG ───────────────────────────── */
function VerifiedBadge() {
  return (
    <svg className="verified-badge" viewBox="0 0 22 22" fill="currentColor">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

/* ── Twitter (X) icon ─────────────────────────────── */
function XIcon() {
  return (
    <svg className="twitter-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const cards = [
  {
    index: 0,
    content:
      "Deep diving into Computer Vision! 🧠 Just integrated YOLOv8 with Whisper for my Video Captioning Tool. The accuracy is insane. #AI #MachineLearning #BuildInPublic",
    date: "Jan 3, 2026",
    likes: 42,
    retweets: 8,
  },
  {
    index: 1,
    content:
      "Real-time communication is key. ⚡️ Engineered a seamless Chat Application using Socket.io and MERN stack. Handling concurrency like a pro! 💻 #WebDev #FullStack",
    date: "Jan 2, 2026",
    likes: 28,
    retweets: 5,
  },
  {
    index: 2,
    content:
      "Officially OPEN FOR WORK! 🚀 Specializing in Next.js, React, and scalable backend systems. Ready to build robust applications. Let's make it happen! 🔥 #OpenForWork #HireMe",
    date: "Jan 1, 2026",
    likes: 156,
    retweets: 23,
  },
];

function TwitterCard({
  card,
  hovered,
  onEnter,
  onLeave,
}: {
  card: (typeof cards)[number];
  hovered: number | null;
  onEnter: (i: number) => void;
  onLeave: () => void;
}) {
  return (
    <div
      className={`twitter-card card-${card.index}`}
      data-index={card.index}
      onMouseEnter={() => onEnter(card.index)}
      onMouseLeave={onLeave}
    >
      <div className="card-header">
        <div className="card-avatar-wrapper">
          <Image
            src="/profile.jpg"
            alt="Ansh Paswan"
            width={44}
            height={44}
            className="card-avatar-img"
          />
        </div>
        <div className="card-user-info">
          <div className="card-name-row">
            <span className="card-name">Ansh Paswan</span>
            <VerifiedBadge />
          </div>
          <span className="card-handle">@anshhh68</span>
        </div>
        <XIcon />
      </div>

      <p className="card-content">{card.content}</p>

      <div className="card-footer">
        <span className="card-date">{card.date}</span>
        <div className="card-stats">
          <div className="stat-item">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{card.likes}</span>
          </div>
          <div className="stat-item">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>{card.retweets}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [hovered, setHovered] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [btnState, setBtnState] = useState<"idle" | "sending" | "sent">("idle");

  // Reveal animations
  useEffect(() => {
    const els = document.querySelectorAll(".contact-form-container, .contact-info");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animated");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Magnetic submit button
  useEffect(() => {
    const btn = document.querySelector<HTMLElement>(".submit-btn");
    if (!btn) return;
    const move = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.2}px,${y * 0.2}px) scale(1.05)`;
    };
    const leave = () => { btn.style.transform = ""; };
    btn.addEventListener("mousemove", move);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mousemove", move);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current!;
    const name = (form.querySelector("#name") as HTMLInputElement).value;
    const email = (form.querySelector("#email") as HTMLInputElement).value;
    const message = (form.querySelector("#message") as HTMLTextAreaElement).value;

    const text = `*New Contact Request from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    const url = `https://wa.me/919769823409?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");

    setBtnState("sent");
    form.reset();
    setTimeout(() => setBtnState("idle"), 3000);
  };

  const btnLabel = btnState === "sent" ? "Message Sent!" : btnState === "sending" ? "Sending..." : "Send Message";

  return (
    <section className="contact" id="contact">
      <div className="contact-header">
        <div className="contact-header-left">
          <h2 className="contact-title" data-animate="reveal">
            <span className="contact-line">Let&apos;s</span>
            <span className="contact-line">Make It</span>
            <span className="contact-line">Happen</span>
          </h2>
        </div>

        <div className="contact-header-right">
          <div
            className={`testimonial-stack${hovered !== null ? ` hover-${hovered}` : ""}`}
            id="testimonial-stack"
          >
            {cards.map((card) => (
              <TwitterCard
                key={card.index}
                card={card}
                hovered={hovered}
                onEnter={setHovered}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-form-container" data-animate="slide-up">
          <h3 className="form-title">Say Hello</h3>
          <form className="contact-form" id="contact-form" ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" id="name" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder="Your Message" rows={4} required />
            </div>
            <button type="submit" className="submit-btn" disabled={btnState !== "idle"}>
              <span>{btnLabel}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7V17M17 7H7" />
              </svg>
            </button>
          </form>
        </div>

        <div className="contact-info" data-animate="slide-up">
          <div className="info-item">
            <span className="info-label">Email</span>
            <a href="mailto:paswanansh68@gmail.com" className="info-value">
              paswanansh68@gmail.com
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">Phone</span>
            <a href="tel:+919769823409" className="info-value">
              +91 97698 23409
            </a>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span className="info-value">Vadodara, Gujarat, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
