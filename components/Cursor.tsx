"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch/mobile
    if (window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      cursor!.style.left = cursorX + "px";
      cursor!.style.top = cursorY + "px";

      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      follower!.style.left = followerX + "px";
      follower!.style.top = followerY + "px";

      animId = requestAnimationFrame(animateCursor);
    }
    animId = requestAnimationFrame(animateCursor);

    // Hover effects
    const addHoverListeners = () => {
      document.querySelectorAll("a, button, input, textarea, .project-item, .skill-tag").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          cursor!.classList.add("hover");
          follower!.classList.add("hover");
        });
        el.addEventListener("mouseleave", () => {
          cursor!.classList.remove("hover");
          follower!.classList.remove("hover");
        });
      });
    };
    addHoverListeners();

    // Light cursor in dark sections
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = document.querySelector(".hero")?.clientHeight || 0;
      const contactTop = (document.querySelector(".contact") as HTMLElement)?.offsetTop ?? Infinity;
      const footerTop = (document.querySelector(".footer") as HTMLElement)?.offsetTop ?? Infinity;

      if (scrollY < heroHeight || (scrollY >= contactTop && scrollY < footerTop)) {
        cursor!.classList.remove("light");
        follower!.classList.remove("light");
      } else {
        cursor!.classList.add("light");
        follower!.classList.add("light");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}
