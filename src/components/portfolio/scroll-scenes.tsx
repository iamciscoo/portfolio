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
  const backY = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const captionY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -15]);
  return (
    <section ref={ref} className="personal-hero wrap" data-sc-act="hero">
      {top}
      <div className="personal-hero-main">
        <motion.div className="personal-hero-copy" style={{ y: copyY }}>
          {copy}
        </motion.div>
        <div className="personal-hero-art" data-sc-stage>
          <motion.div
            aria-hidden="true"
            className="hero-blue-plane"
            style={{ y: backY }}
          />
          <motion.div className="hero-photo-print" style={{ y: photoY }}>
            {photo}
          </motion.div>
          <motion.div className="hero-person-caption" style={{ y: captionY }}>
            {caption}
          </motion.div>
        </div>
      </div>
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
