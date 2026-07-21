"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = {
  id: string | number;
  src: string;
  alt: string;
  title: string;
  category?: string;
};

type LightboxDialogProps = {
  images: LightboxImage[];
  selectedIndex: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export default function LightboxDialog({
  images,
  selectedIndex,
  onIndexChange,
  onClose,
}: LightboxDialogProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : undefined;

  const close = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  }, [onClose]);

  useEffect(() => {
    if (selectedIndex === null) return;

    if (!previousFocusRef.current) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
    }
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      } else if (event.key === "ArrowLeft") {
        onIndexChange(
          (selectedIndex - 1 + images.length) % images.length
        );
      } else if (event.key === "ArrowRight") {
        onIndexChange((selectedIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close, images.length, onIndexChange, selectedIndex]);

  if (!selectedImage || selectedIndex === null) return null;

  const previous = () =>
    onIndexChange((selectedIndex - 1 + images.length) % images.length);
  const next = () => onIndexChange((selectedIndex + 1) % images.length);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${selectedImage.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-3 sm:p-6 animate-fade-in"
      onClick={close}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={close}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <figure
        className="relative w-full max-w-6xl h-[82vh] bg-slate-900 rounded-xl overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          sizes="100vw"
          className="object-contain"
          priority
        />
        <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-950/95 to-transparent">
          {selectedImage.category && (
            <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider">
              {selectedImage.category}
            </p>
          )}
          <p className="text-white font-medium text-lg">
            {selectedImage.title}
          </p>
          <p className="text-slate-300 text-sm mt-1">
            {selectedIndex + 1} of {images.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
