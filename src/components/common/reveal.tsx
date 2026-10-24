"use client";
import { scroll, springValue, transform } from "motion/react";
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
    // Follow the same path in either direction. A damped spring preserves
    // momentum on reversal without changing native scrolling or hiding copy.
    const stops = targets.map((element) => {
      const distance = element.tagName === "P" ? 12 : 24;
      const travel = transform([0, 0.28, 0.72, 1], [distance, 0, 0, -distance]);
      const position = springValue<number>(0, {
        stiffness: 260,
        damping: 30,
        mass: 0.4,
        restDelta: 0.01,
        restSpeed: 0.1,
      });
      const render = (y: number) => {
        const alpha = Math.max(0.65, 1 - (Math.abs(y) / distance) * 0.35);
        element.style.opacity = String(alpha);
        element.style.transform = `translateY(${y}px)`;
        element.toggleAttribute("data-reveal-pending", alpha < 0.999);
        if (!element.hasAttribute("data-reveal-entered")) {
          element.setAttribute("data-reveal-entered", "true");
          container.dataset.entered = "true";
        }
      };
      const stopChange = position.on("change", render);
      let initialized = false;
      const stopScroll = scroll(
        (progress) => {
          const y = travel(progress);
          if (!initialized) {
            // Match restored scroll positions immediately on mount.
            position.jump(y);
            render(y);
            initialized = true;
          } else {
            position.set(y);
          }
        },
        { target: element, offset: ["start end", "end start"] },
      );
      return () => {
        stopScroll();
        stopChange();
        position.destroy();
      };
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
