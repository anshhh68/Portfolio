"use client";

import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/resume.pdf", label: "Resume", isExternal: true },
];

const mobileNavLinks = [
  { href: "#", label: "Home", index: "01" },
  { href: "#services", label: "Services", index: "02" },
  { href: "#projects", label: "Works", index: "03" },
  { href: "#about", label: "About", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
  { href: "/resume.pdf", label: "Resume", index: "06", isExternal: true },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolled down more than 50px, show if scrolled up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal?: boolean
  ) => {
    if (isExternal) {
      closeMenu();
      return;
    }

    e.preventDefault();
    closeMenu();

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const offset = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className={`header${isHidden ? " hidden" : ""}`} id="header">
        <div className="header-left">
          <span className="header-label">Full-Stack Developer</span>
        </div>

        <nav className="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href, link.isExternal)}
              {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`menu-toggle${menuOpen ? " active" : ""}`}
          id="menu-toggle"
          aria-label="Toggle menu"
          onClick={menuOpen ? closeMenu : openMenu}
        >
          <span className="menu-line" />
          <span className="menu-line" />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay${menuOpen ? " active" : ""}`} id="menu-overlay">
        <nav className="mobile-nav">
          {mobileNavLinks.map((link) => (
            <a
              key={link.href + link.index}
              href={link.href}
              className="mobile-nav-link"
              data-index={link.index}
              onClick={(e) => handleNavClick(e, link.href, link.isExternal)}
              {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-socials">
            <a
              href="https://linkedin.com/in/ansh-paswan-388b2b370/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/anshhh68"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
