"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { Maximize2, X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import "./gallery-viewer.css";

export function GalleryViewer({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const t = useTranslations("common");
  const [zoomed, setZoomed] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    node.scrollTo({
      left: zoomed ? (node.scrollWidth - node.clientWidth) / 2 : 0,
      top: zoomed ? (node.scrollHeight - node.clientHeight) / 2 : 0,
      behavior: "instant",
    });
  }, [zoomed]);
  return (
    <div
      className="gallery-viewer"
      onKeyDown={(event) => {
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (["+", "=", "-", "0"].includes(event.key)) {
          event.preventDefault();
          setZoomed(event.key === "+" || event.key === "=");
        }
      }}
    >
      <div className="gallery-toolbar">
        <output aria-live="polite" aria-label={t("imageZoom")}>
          {zoomed ? "200%" : t("fitImage")}
        </output>
        <div>
          <button
            className="gallery-zoom-button"
            type="button"
            aria-pressed={zoomed}
            onClick={() => setZoomed(!zoomed)}
          >
            {zoomed ? (
              <Maximize2 size={18} aria-hidden="true" />
            ) : (
              <ZoomIn size={18} aria-hidden="true" />
            )}
            {t(zoomed ? "fitImage" : "zoomIn")}
          </button>
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label={t("close")}
          >
            <X />
          </Dialog.Close>
        </div>
      </div>
      <div
        className="gallery-viewport"
        ref={viewport}
        tabIndex={0}
        role="region"
        aria-label={`${t("gallery")}: ${alt}`}
        data-zoomed={zoomed}
      >
        <div
          className="gallery-zoom-stage"
          style={{
            width: zoomed ? "200%" : "100%",
            height: zoomed ? "200%" : "100%",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={zoomed ? "188vw" : "94vw"}
            draggable={false}
          />
        </div>
      </div>
      <p className="gallery-zoom-help">
        {t(zoomed ? "zoomHelp" : "zoomIntro")}
      </p>
    </div>
  );
}
