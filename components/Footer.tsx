"use client";

import { useEffect, useState } from "react";
import { formatLocalTime } from "@/utils/time";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://linkedin.com/in/ansh-paswan-388b2b370/", label: "LinkedIn" },
  { href: "https://github.com/anshhh68", label: "GitHub" },
];

export default function Footer() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    setTime(formatLocalTime());
    const interval = setInterval(() => setTime(formatLocalTime()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({ top: (target as HTMLElement).offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-nav">
          <h4>Menu</h4>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-socials">
          <h4>Socials</h4>
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-time">
          <span className="local-time-label">Local Time</span>
          <span className="local-time" id="local-time">
            {time}
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Ansh Paswan. All rights reserved.</span>
      </div>
    </footer>
  );
}
