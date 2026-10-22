"use client";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
export function ImageGallery({
  src,
  alt,
  width = 1440,
  height = 1000,
  eager = false,
  originalSrc,
  sizes = "(max-width: 700px) 90vw, 80vw",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  originalSrc?: string;
  sizes?: string;
}) {
  const t = useTranslations("common");
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <Dialog.Root onOpenChange={() => setShowOriginal(false)}>
      <Dialog.Trigger asChild>
        <button
          className="gallery-trigger"
          aria-label={`${t("gallery")}: ${alt}`}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            sizes={sizes}
          />
          <span>
            <ZoomIn size={18} />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className={`dialog-content gallery-dialog${originalSrc ? " comparison-dialog" : ""}`}
        >
          <Dialog.Title className="sr-only">{alt}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {t("gallery")}
          </Dialog.Description>
          <Dialog.Close
            className="icon-button dialog-close"
            aria-label={t("close")}
          >
            <X />
          </Dialog.Close>
          {originalSrc && (
            <>
              <div
                className="photo-version"
                role="group"
                aria-label={t("photoVersion")}
              >
                <button
                  type="button"
                  aria-pressed={!showOriginal}
                  onClick={() => setShowOriginal(false)}
                >
                  {t("enhanced")}
                </button>
                <button
                  type="button"
                  aria-pressed={showOriginal}
                  onClick={() => setShowOriginal(true)}
                >
                  {t("original")}
                </button>
              </div>
              <p className="photo-version-note" role="status">
                {t(showOriginal ? "originalPhoto" : "enhancementNote")}
              </p>
            </>
          )}
          <Image
            src={showOriginal && originalSrc ? originalSrc : src}
            alt={alt}
            width={width}
            height={height}
            sizes="90vw"
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
