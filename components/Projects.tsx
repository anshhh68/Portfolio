"use client";

import Image from "next/image";
import { useEffect } from "react";

const projects = [
  {
    number: "01",
    type: "Emergency Services",
    title: "Ride Rescue",
    meta: ["Next.js & Maps", "Development", "2025"],
    href: "https://github.com/anshhh68/RideRescueproject",
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop",
    imageAlt: "Ride Rescue Preview",
  },
  {
    number: "02",
    type: "Real-Time Application",
    title: "Chat Application",
    meta: ["Full-Stack Social", "Development", "2025"],
    href: "https://github.com/anshhh68/Instasphere",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop",
    imageAlt: "Instasphere Preview",
  },
  {
    number: "03",
    type: "Data Visualization",
    title: "Analytics Dashboard",
    meta: ["Next.js & Chart.js", "Development", "2025"],
    href: "https://github.com/anshhh68/NextAdmin",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    imageAlt: "Analytics Dashboard Preview",
  },
  {
    number: "04",
    type: "AI/ML Project",
    title: "Video Captioning Tool",
    meta: ["Whisper & YOLOv8", "AI Development", "2025"],
    href: "https://github.com/anshhh68/Videocaptioningtool",
    image:
      "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=300&fit=crop",
    imageAlt: "Video Captioning Preview",
  },
  {
    number: "05",
    type: "Full-Stack E-Commerce",
    title: "E-Commerce Platform",
    meta: ["Next.js & Supabase", "Development", "2025"],
    href: "https://github.com/anshhh68/Infinity-System-solution",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
    imageAlt: "E-Commerce Preview",
  },
];

export default function Projects() {
  useEffect(() => {
    const items = document.querySelectorAll(".project-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("animated"), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" id="projects">
      <div className="section-header">
        <h2 className="section-title" data-animate="reveal">
          Selected Works /
        </h2>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <a
            key={project.number}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item"
            data-animate="slide-up"
          >
            <div className="project-number">
              <span className="number-text">{project.number}</span>
              <span className="number-glitch">{project.number}</span>
            </div>

            <div className="project-info">
              <span className="project-type">{project.type}</span>
              <h3 className="project-title">{project.title}</h3>
              <div className="project-meta">
                {project.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            <div className="project-preview">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                sizes="200px"
                className="preview-image-fill"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
