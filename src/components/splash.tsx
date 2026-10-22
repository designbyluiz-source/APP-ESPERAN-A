"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { assets } from "@/lib/figma-assets";
import { Home } from "./home";

export function Splash({ autoContinue = true }: { autoContinue?: boolean }) {
  const router = useRouter();
  const [scale, setScale] = useState(24);
  useEffect(() => {
    if (!autoContinue) return;
    function measure() {
      setScale(
        Math.max(window.innerWidth / 152, window.innerHeight / 216.301) * 3,
      );
    }
    measure();
    window.addEventListener("resize", measure);
    router.prefetch("/inicio");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const timer = setTimeout(
      () => router.replace("/inicio"),
      reducedMotion ? 500 : 3350,
    );
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, [autoContinue, router]);
  return (
    <div
      className={`splash-transition ${autoContinue ? "is-playing" : ""}`}
      style={{ "--splash-scale": scale } as CSSProperties}
    >
      <div className="splash-home" inert aria-hidden="true">
        <Home />
      </div>
      <main
        className="splash"
        data-node-id="106:18"
        aria-label="Abertura da Igreja Esperança"
      >
        <button
          className="splash-skip"
          aria-label="Pular abertura e ir para o início"
          onClick={() => router.replace("/inicio")}
        >
          <span className="splash-expansion">
            <span className="splash-floating">
              <img
                className="splash-logo"
                src={assets.splash.imgLogo1Vetorizado1}
                alt="Vitral da Igreja Esperança"
              />
            </span>
          </span>
        </button>
      </main>
    </div>
  );
}
