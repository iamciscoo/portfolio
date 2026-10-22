"use client";
import { motion, useReducedMotion } from "motion/react";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { opacity: [0.65, 1], y: [15, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
