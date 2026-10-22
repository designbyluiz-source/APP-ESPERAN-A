"use client";

import { useState } from "react";
import { assets } from "@/lib/figma-assets";
import { scripture, lyrics } from "@/lib/content";
import { Divider, PageHeader } from "./ui";

export function Worship() {
  const [tab, setTab] = useState<"liturgy" | "praise">("liturgy");
  const [slide, setSlide] = useState(1);
  const a = assets[tab];
  return (
    <main
      className="section-screen"
      data-node-id={tab === "liturgy" ? "106:683" : "106:733"}
    >
      <PageHeader title="Nosso Culto" backAsset={a.imgChevronLeft} />
      <div className="section-scroll worship-content">
        <p className="worship-date">Domingo: 18/10/26</p>
        <div className="worship-slides">
          <section
            className={`hero worship-hero ${slide === 2 ? "second-slide" : ""}`}
            aria-label={`Slide ${slide}`}
          >
            <img
              className="hero-photo"
              src={a.imgCartaoHero}
              alt="Comunidade reunida em um culto da Igreja Esperança"
            />
            <div className="worship-gradient" />
            <div className="worship-hero-copy">
              <p>
                SERIE: <strong>ANDANDO COM DEUS</strong> EP-<strong>2</strong>
              </p>
              <h2>
                {slide === 1 ? (
                  <>
                    A esperança<em>que nos reúne.</em>
                  </>
                ) : (
                  <>
                    João 4:1–42<em>Água viva.</em>
                  </>
                )}
              </h2>
            </div>
          </section>
          <div className="slide-controls">
            <button
              className="calendar-arrow"
              aria-label="Slide anterior"
              disabled={slide === 1}
              onClick={() => setSlide(1)}
            >
              <img src={a.imgChevronLeft1} alt="" />
            </button>
            <h2 aria-live="polite">Slide {slide}</h2>
            <button
              className="calendar-arrow"
              aria-label="Próximo slide"
              disabled={slide === 2}
              onClick={() => setSlide(2)}
            >
              <img className="is-reversed" src={a.imgChevronLeft2} alt="" />
            </button>
          </div>
        </div>
        <Divider src={a.imgLine31} />
        <div className="worship-details">
          <div
            className="worship-tabs"
            role="tablist"
            aria-label="Conteúdo do culto"
          >
            <button
              role="tab"
              id="liturgy-tab"
              aria-controls="liturgy-panel"
              aria-selected={tab === "liturgy"}
              className={tab === "liturgy" ? "active" : ""}
              onClick={() => setTab("liturgy")}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  setTab("praise");
                  document.getElementById("praise-tab")?.focus();
                }
              }}
            >
              Liturgia
            </button>
            <button
              role="tab"
              id="praise-tab"
              aria-controls="praise-panel"
              aria-selected={tab === "praise"}
              className={tab === "praise" ? "active" : ""}
              onClick={() => setTab("praise")}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  setTab("liturgy");
                  document.getElementById("liturgy-tab")?.focus();
                }
              }}
            >
              Louvor
            </button>
          </div>
          {tab === "liturgy" ? (
            <section
              role="tabpanel"
              id="liturgy-panel"
              aria-labelledby="liturgy-tab"
              className="scripture"
            >
              <h3>João 4:1-42 (NAA)</h3>
              <div>
                {scripture.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <p className="pastor-credit">Pastor Hector</p>
            </section>
          ) : (
            <section
              role="tabpanel"
              id="praise-panel"
              aria-labelledby="praise-tab"
              className="praise-panel"
            >
              <div className="song-heading">
                <span className="song-arrow" aria-hidden="true">
                  <img src={assets.praise.imgIcon1} alt="" />
                </span>
                <div>
                  <p>Musica 1</p>
                  <h3>Só tu és Santo</h3>
                  <p>Compositores</p>
                </div>
                <span className="song-arrow next" aria-hidden="true">
                  <img src={assets.praise.imgIcon2} alt="" />
                </span>
              </div>
              <div className="lyrics">
                {lyrics.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
