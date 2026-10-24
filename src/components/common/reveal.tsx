"use client";
import { inView, useAnimate } from "motion/react";
import { useEffect } from "react";
import { useMediaQuery } from "./use-media-query";
import "./reveal.css";

const restingOpacity = 0.65;

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const container = scope.current;
    const targets = Array.from(
      container.querySelectorAll<HTMLElement>("h1, h2, h3, p"),
    );
    // IntersectionObserver percentages use width, so calculate the reading
    // area's bottom inset from viewport height explicitly, including on phones.
    const bottomInset = () =>
      Math.round(
        window.innerHeight *
          (window.matchMedia("(max-width: 700px)").matches ? 0.38 : 0.24),
      );
    for (const element of targets) {
      if (
        !element.hasAttribute("data-reveal-entered") &&
        element.getBoundingClientRect().top >=
          window.innerHeight - bottomInset()
      ) {
        element.dataset.revealPending = "true";
        element.style.opacity = String(restingOpacity);
        element.style.transform = "none";
      }
    }
    let stopObserving = () => {};
    function observe() {
      stopObserving();
      stopObserving = inView(
        targets,
        (element) => {
          if (element.hasAttribute("data-reveal-entered")) return;
          container.dataset.entered = "true";
          element.removeAttribute("data-reveal-pending");
          element.setAttribute("data-reveal-entered", "true");
          animate(
            element,
            {
              opacity: [restingOpacity, 1],
              transform: [
                `translateY(${element.tagName === "P" ? 12 : 24}px)`,
                "translateY(0px)",
              ],
            },
            {
              duration: 1,
              delay: element.tagName === "P" ? 0.18 : 0,
              ease: [0.2, 0.65, 0.3, 1],
            },
          );
        },
        { amount: 0.2, margin: `0px 0px ${-bottomInset()}px 0px` },
      );
    }
    observe();
    window.addEventListener("resize", observe);
    return () => {
      stopObserving();
      window.removeEventListener("resize", observe);
      // Restore pending copy when reduced motion is enabled or scope changes.
      for (const element of targets) {
        if (!element.hasAttribute("data-reveal-pending")) continue;
        element.removeAttribute("data-reveal-pending");
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      }
    };
  }, [animate, reduced, scope]);

  return (
    <div ref={scope} className={`text-reveal ${className}`.trim()}>
      {children}
    </div>
  );
}
