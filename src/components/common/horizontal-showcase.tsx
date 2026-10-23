"use client";
import {
  Children,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export function HorizontalShowcase({
  children,
  label,
  previous,
  next,
  className = "",
}: {
  children: ReactNode;
  label: string;
  previous: string;
  next: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const count = Children.count(children);
  const { scrollXProgress } = useScroll({ container: ref });
  const progress = useTransform(
    scrollXProgress,
    [0, 1],
    [1 / Math.max(1, count), 1],
  );
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    const slides = [...rail.children];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === slides[0])
            setEdges((v) => ({ ...v, start: entry.intersectionRatio >= 0.98 }));
          if (entry.target === slides.at(-1))
            setEdges((v) => ({ ...v, end: entry.intersectionRatio >= 0.98 }));
        }
      },
      { root: rail, threshold: [0.98] },
    );
    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);
  function move(direction: number, instant = false) {
    const rail = ref.current;
    if (!rail) return;
    const slides = [...rail.children] as HTMLElement[];
    const current = slides.reduce(
      (best, slide, i) =>
        Math.abs(slide.offsetLeft - rail.offsetLeft - rail.scrollLeft) <
        Math.abs(slides[best].offsetLeft - rail.offsetLeft - rail.scrollLeft)
          ? i
          : best,
      0,
    );
    const target =
      slides[Math.max(0, Math.min(slides.length - 1, current + direction))];
    if (!target) return;
    rail.scrollTo({
      left: target.offsetLeft - rail.offsetLeft,
      behavior:
        instant || matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  }
  return (
    <div className={`horizontal-showcase ${className}`}>
      <div className="showcase-controls">
        <span>{label}</span>
        <div>
          <button
            className="icon-button"
            aria-label={previous}
            aria-controls={id}
            disabled={edges.start}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            className="icon-button"
            aria-label={next}
            aria-controls={id}
            disabled={edges.end}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
      <div className="showcase-progress" aria-hidden="true">
        <motion.span style={{ scaleX: progress }} />
      </div>
      <div
        ref={ref}
        id={id}
        className="showcase-rail"
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          const direction = {
            ArrowLeft: -1,
            ArrowRight: 1,
            Home: -Infinity,
            End: Infinity,
          }[event.key];
          if (direction !== undefined) {
            event.preventDefault();
            move(direction, true);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
