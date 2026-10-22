"use client";
import { motion, useReducedMotion } from "motion/react";
import { useCompactMotion } from "./use-compact-motion";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const compact = useCompactMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduced
          ? {}
          : { opacity: [compact ? 0.92 : 0.65, 1], y: [compact ? 8 : 15, 0] }
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: compact ? 0.28 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
