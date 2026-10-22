"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/lib/figma-assets";

export function PageHeader({
  title,
  backAsset = assets.schedule.imgChevronLeft,
}: {
  title?: string;
  backAsset?: string;
}) {
  const router = useRouter();
  function back() {
    router.push(
      sessionStorage.getItem("esperanca-demo") === "member"
        ? "/membro"
        : "/inicio",
    );
  }
  return (
    <header className="page-header">
      <button
        className="back-button"
        aria-label="Voltar ao início"
        onClick={back}
      >
        <img src={backAsset} alt="" />
      </button>
      {title && <h1>{title}</h1>}
    </header>
  );
}

export function Divider({ src = assets.guest.imgLine32 }: { src?: string }) {
  return (
    <div className="divider" aria-hidden="true">
      <img src={src} alt="" />
    </div>
  );
}

export function RoundIcon({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span className={`round-icon ${className}`}>
      <img src={src} alt="" />
    </span>
  );
}

export function Sheet({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    const backgrounds = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sheet-background]"),
    ).map((element) => ({ element, wasInert: element.hasAttribute("inert") }));
    backgrounds.forEach(({ element }) => element.setAttribute("inert", ""));
    element?.focus({ preventScroll: true });
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") close.current();
      if (event.key !== "Tab" || !element) return;
      const focusable = Array.from(
        element.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]',
        ),
      );
      const first = focusable[0],
        last = focusable.at(-1);
      if (!first) {
        event.preventDefault();
        return;
      }
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === element)
      ) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || document.activeElement === element)
      ) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      backgrounds.forEach(({ element, wasInert }) => {
        if (!wasInert) element.removeAttribute("inert");
      });
      document.removeEventListener("keydown", keydown);
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <div className="sheet-overlay" onClick={onClose}>
      <div
        ref={dialog}
        className={`sheet ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" aria-hidden="true">
          <span />
        </div>
        <div className="sheet-scroll">
          <div className="sheet-heading">
            <h2>{title}</h2>
            <button
              type="button"
              className="icon-button"
              onClick={onClose}
              aria-label="Fechar painel"
            >
              <img src={assets.kids.imgX} alt="" />
            </button>
          </div>
          {children}
        </div>
        <div className="home-indicator" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}

export function useToast() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4200);
    return () => clearTimeout(timer);
  }, [message]);
  return {
    notify: setMessage,
    toast: message ? (
      <div className="toast" role="status">
        {message}
      </div>
    ) : null,
  };
}
