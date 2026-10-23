"use client";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useCompactMotion } from "./use-compact-motion";
import "./reveal.css";
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const compact = useCompactMotion();
  const [entered, setEntered] = useState(false);
  return (
    <motion.div
      className={`text-reveal ${className}`.trim()}
      data-entered={entered}
      initial={false}
      whileInView={
        reduced
          ? { transform: "none" }
          : {
              transform: [`translateY(${compact ? 10 : 18}px)`, "none"],
            }
      }
      onViewportEnter={() => setEntered(true)}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
      transition={{ duration: compact ? 0.36 : 0.48, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
