"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useCompactMotion } from "@/components/common/use-compact-motion";

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
  const compact = useCompactMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const travel = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.35,
  });
  const photoY = useTransform(travel, [0, 1], [0, compact ? 24 : 72]);
  const photoScale = useTransform(
    travel,
    [0, 1],
    [1.03, compact ? 1.06 : 1.12],
  );
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
        <div className="personal-hero-copy">{copy}</div>
        <div className="cinematic-footer">{caption}</div>
      </div>
    </section>
  );
}

export function ProjectScene({
  children,
  desktop,
  phone,
}: {
  children: ReactNode;
  desktop: ReactNode;
  phone: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const compact = useCompactMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const settled = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.3,
  });
  const desktopScale = useTransform(
    settled,
    [0, 1],
    [compact ? 0.985 : 0.96, 1],
  );
  const phoneY = useTransform(settled, [0, 1], [compact ? 12 : 28, 0]);
  const phoneRotate = useTransform(settled, [0, 1], [compact ? 0.8 : 2, 0]);
  return (
    <article className="project-exhibit" data-sc-act="project">
      <div className="exhibit-copy">{children}</div>
      <div ref={ref} className="exhibit-stage" data-sc-stage>
        <motion.div className="exhibit-desktop" style={{ scale: desktopScale }}>
          {desktop}
        </motion.div>
        <motion.div
          className="exhibit-phone"
          style={{ y: phoneY, rotate: phoneRotate }}
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
  const compact = useCompactMotion();
  const settled = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 32,
    mass: 0.3,
  });
  const scale = useTransform(settled, [0, 1], [compact ? 0.985 : 0.97, 1]);
  return (
    <div ref={ref} data-sc-act="case">
      <motion.div className="case-visual-motion" style={{ scale }}>
        {children}
      </motion.div>
    </div>
  );
}
