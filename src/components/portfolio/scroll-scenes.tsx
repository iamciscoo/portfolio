"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HeroScene({
  copy,
  photo,
  caption,
  top,
}: {
  copy: ReactNode;
  photo: ReactNode;
  caption: ReactNode;
  top: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.16]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  return (
    <section ref={ref} className="cinematic-hero" data-sc-act="hero">
      <motion.div
        className="hero-photo-print"
        data-sc-stage
        style={{ y: photoY, scale: photoScale }}
      >
        {photo}
      </motion.div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="cinematic-inner wrap">
        {top}
        <motion.div className="personal-hero-copy" style={{ y: copyY }}>
          {copy}
        </motion.div>
        <div className="cinematic-footer">{caption}</div>
      </div>
      <motion.div
        className="hero-bottom-line"
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
      />
    </section>
  );
}

export function ProjectScene({
  children,
  desktop,
  phone,
  color,
}: {
  children: ReactNode;
  desktop: ReactNode;
  phone: ReactNode;
  color: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [78, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [3, -3]);
  return (
    <article ref={ref} className="project-exhibit" data-sc-act="project">
      <div className="exhibit-copy">{children}</div>
      <div
        className="exhibit-stage"
        data-sc-stage
        style={{ background: color }}
      >
        <motion.div className="exhibit-desktop" style={{ scale: scale, y: y }}>
          {desktop}
        </motion.div>
        <motion.div
          className="exhibit-phone"
          style={{ y: phoneY, rotate: rotate }}
        >
          {phone}
        </motion.div>
      </div>
    </article>
  );
}

export function CaseVisual({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 15%"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);
  return (
    <div ref={ref} data-sc-act="case">
      <motion.div className="case-visual-motion" style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
}
