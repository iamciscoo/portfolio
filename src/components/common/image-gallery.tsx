"use client";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
export function ImageGallery({
  src,
  alt,
  width = 1440,
  height = 1000,
  eager = false,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
}) {
  const t = useTranslations("common");
  return (
    <Dialog.Root>
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
            sizes="(max-width: 700px) 90vw, 80vw"
          />
          <span>
            <ZoomIn size={18} />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content gallery-dialog">
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
          <Image
            src={src}
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
