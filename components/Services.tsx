"use client";

import { useEffect } from "react";

const services = [
  {
    number: "01",
    title: "Full-Stack Development",
    desc: "From frontend interactions to backend APIs, I build complete web solutions. React, Node.js, Express.js, and cloud deployment with modern stacks that are scalable and maintainable.",
  },
  {
    number: "02",
    title: "UI/UX & Frontend",
    desc: "Design is more than looks — it's about clarity and connection. I develop clean, responsive interfaces with TailwindCSS and modern frameworks that feel intuitive across all devices.",
  },
  {
    number: "03",
    title: "Backend & APIs",
    desc: "Building robust server-side logic with Node.js, Express.js, Python, and Java. RESTful APIs, GraphQL endpoints, and database optimization for high-performance applications.",
  },
];

export default function Services() {
  useEffect(() => {
    const items = document.querySelectorAll(".service-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("animated"), i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services">
      <div className="section-header">
        <h2 className="section-title" data-animate="reveal">
          What I Do /
        </h2>
      </div>

      <div className="services-grid">
        {services.map((svc) => (
          <div key={svc.number} className="service-item" data-animate="slide-up">
            <div className="service-number">{svc.number}</div>
            <h3 className="service-title">{svc.title}</h3>
            <p className="service-desc">{svc.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
