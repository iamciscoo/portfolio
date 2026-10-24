"use client";
import { scroll, transform } from "motion/react";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "./use-media-query";
import "./reveal.css";

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced || !scope.current) return;
    const container = scope.current;
    const targets = [
      ...container.querySelectorAll<HTMLElement>("h1, h2, h3, p"),
    ];
    // Scroll position drives the same path in both directions. Keep the middle
    // reading area still and legible; never hide copy at either viewport edge.
    const stops = targets.map((element) => {
      const distance = element.tagName === "P" ? 12 : 24;
      const opacity = transform([0, 0.28, 0.72, 1], [0.65, 1, 1, 0.65]);
      const travel = transform([0, 0.28, 0.72, 1], [distance, 0, 0, -distance]);
      return scroll(
        (progress) => {
          const alpha = opacity(progress);
          element.style.opacity = String(alpha);
          element.style.transform = `translateY(${travel(progress)}px)`;
          element.toggleAttribute("data-reveal-pending", alpha < 0.999);
          if (!element.hasAttribute("data-reveal-entered")) {
            element.setAttribute("data-reveal-entered", "true");
            container.dataset.entered = "true";
          }
        },
        { target: element, offset: ["start end", "end start"] },
      );
    });
    return () => {
      stops.forEach((stop) => stop());
      for (const element of targets) {
        element.removeAttribute("data-reveal-pending");
        element.removeAttribute("data-reveal-entered");
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    };
  }, [reduced]);

  return (
    <div ref={scope} className={`text-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
