"use client";
import { inView, useAnimate, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import "./reveal.css";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const container = scope.current;
    const targets = Array.from(
      container.querySelectorAll<HTMLElement>("h1, h2, h3, p"),
    );
    // Observe text itself: a tall section can enter long before its copy does.
    return inView(
      targets,
      (element) => {
        if (element.hasAttribute("data-reveal-entered")) return;
        container.dataset.entered = "true";
        element.setAttribute("data-reveal-entered", "true");
        animate(
          element,
          {
            opacity: [0, 1],
            transform: ["translateY(32px)", "translateY(0px)"],
          },
          {
            duration: 0.85,
            delay: element.tagName === "P" ? 0.14 : 0,
            ease: [0.2, 0.65, 0.3, 1],
          },
        );
      },
      { amount: 0.2, margin: "0px 0px -10% 0px" },
    );
  }, [animate, reduced, scope]);

  return (
    <div ref={scope} className={`text-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
