"use client";
import { useMediaQuery } from "./use-media-query";

export function useCompactMotion() {
  return useMediaQuery("(max-width: 700px)");
}
