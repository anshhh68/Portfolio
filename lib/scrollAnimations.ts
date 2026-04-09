import { useEffect, useRef } from "react";

/**
 * useScrollReveal
 * Adds the `animated` class to elements that have `data-scroll-reveal` attribute
 * when they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-scroll-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = parseInt(
              (entry.target as HTMLElement).dataset.scrollDelay || "0"
            );
            setTimeout(() => {
              entry.target.classList.add("animated");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

/**
 * useScrollVelocity
 * Drives the marquee and skills row scroll-velocity animations.
 */
export function useScrollVelocity() {
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const row1 = document.getElementById("skills-row-1");
    const row2 = document.getElementById("skills-row-2");
    const marquee = document.querySelector(".marquee-text") as HTMLElement | null;

    const baseSpeed = 0.05;
    const scrollFactor = 0.15;

    let currentScrollY = window.scrollY;
    let targetVelocity = 0;
    let currentVelocity = 0;

    let pos1 = 0;
    let pos2 = -50; // start at -50% for rightward scroll
    let posMq = 0;

    function update() {
      const newScrollY = window.scrollY;
      const scrollDelta = Math.abs(newScrollY - currentScrollY);
      currentScrollY = newScrollY;

      targetVelocity = scrollDelta * scrollFactor;
      currentVelocity += (targetVelocity - currentVelocity) * 0.1;

      const move = baseSpeed + currentVelocity;

      if (row1) {
        pos1 -= move;
        if (pos1 <= -50) pos1 += 50;
        row1.style.transform = `translate3d(${pos1}%, 0, 0)`;
      }

      if (row2) {
        pos2 += move;
        if (pos2 >= 0) pos2 -= 50;
        row2.style.transform = `translate3d(${pos2}%, 0, 0)`;
      }

      if (marquee) {
        posMq -= move * 0.7;
        if (posMq <= -50) posMq += 50;
        marquee.style.transform = `translate3d(${posMq}%, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(update);
    }

    frameRef.current = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);
}
