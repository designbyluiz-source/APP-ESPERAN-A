"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LoadingPhoto } from "./loading-photo";
import { Divider, RoundIcon, Sheet } from "./ui";

export const communityAsset = (name: string, extension = "svg") =>
  `/figma/community/${name}.${extension}`;
type Detail = "prayer" | "activities" | "pastor" | "leader" | null;

export function Community({ onGroups }: { onGroups: () => void }) {
  const [detail, setDetail] = useState<Detail>(null);
  const [sent, setSent] = useState(false);
  function open(next: Detail) {
    setSent(false);
    setDetail(next);
  }
  return (
    <>
      <div className="community-body" data-node-id="127:212">
        <h1>Comunidade</h1>
        <section className="hero community-groups" aria-label="Pequenos Grupos">
          <LoadingPhoto
            optimized
            sizes="(min-width: 900px) 560px, (min-width: 600px) 760px, 100vw"
            className="hero-photo"
            src={communityAsset("groups", "png")}
            alt="Pequeno grupo reunido na comunidade"
          />
          <div className="hero-gradient" />
          <div>
            <h2>
              Pequenos <em>Grupos.</em>
            </h2>
            <p>Encontre seu pequeno grupo.</p>
          </div>
          <button className="pill light" onClick={onGroups}>
            Explorar grupos
          </button>
        </section>
        <Divider src={communityAsset("divider")} />
        <div className="community-access">
          <div className="feature-grid">
            <button
              className="feature-card community-feature prayer-card"
              onClick={() => open("prayer")}
            >
              <LoadingPhoto
                optimized
                sizes="(min-width: 900px) 280px, 50vw"
                className="feature-photo"
                src={communityAsset("prayer", "png")}
                alt="Pessoas da comunidade em oração"
              />
              <div className="community-feature-gradient" />
              <div className="feature-copy">
                <span>Check-in</span>
                <h2>
                  Pedidos
                  <br />
                  de oração
                </h2>
              </div>
              <RoundIcon src={communityAsset("arrow")} />
            </button>
            <button
              className="feature-card community-feature activities-card"
              onClick={() => open("activities")}
            >
              <LoadingPhoto
                optimized
                sizes="(min-width: 900px) 280px, 50vw"
                className="feature-photo"
                src={communityAsset("activities", "png")}
                alt="Atividades e aulas na comunidade"
              />
              <div className="community-feature-gradient" />
              <div className="feature-copy">
                <span>Venha aprender!</span>
                <h2>
                  Atividades
                  <br />e Aulas
                </h2>
              </div>
              <RoundIcon src={communityAsset("arrow")} />
            </button>
          </div>
          <Link href="/programacao" className="community-events">
            <img
              className="community-calendar"
              src={communityAsset("calendar")}
              alt=""
            />
            <span>Eventos</span>
            <img src={communityAsset("chevron")} alt="" />
          </Link>
        </div>
        <Divider src={communityAsset("divider")} />
        <section className="community-leaders">
          <h2>Pastores e lideres</h2>
          <div
            className="news-carousel"
            role="region"
            aria-label="Pastores e líderes"
            tabIndex={0}
          >
            <button
              className="news-card community-leader"
              onClick={() => open("pastor")}
            >
              <LoadingPhoto
                optimized
                sizes="(min-width: 900px) 560px, 284px"
                className="news-photo"
                src={communityAsset("pastor", "png")}
                alt="Pastor da comunidade"
              />
              <div className="news-gradient" />
              <div className="leader-copy">
                <h3>Pastor</h3>
                <div>
                  <span>Hector Dalagnojadnvj</span>
                  <RoundIcon src={communityAsset("leader-arrow")} />
                </div>
              </div>
            </button>
            <button
              className="news-card community-leader"
              onClick={() => open("leader")}
            >
              <LoadingPhoto
                optimized
                sizes="(min-width: 900px) 560px, 284px"
                className="news-photo"
                src={communityAsset("leader", "png")}
                alt="Líder do Ministério Musical"
              />
              <div className="news-gradient" />
              <div className="leader-copy">
                <h3>Lider</h3>
                <strong>Ministério Musical</strong>
                <div>
                  <span>Joao Maria José</span>
                  <RoundIcon src={communityAsset("leader-arrow")} />
                </div>
              </div>
            </button>
          </div>
        </section>
      </div>
      {detail &&
        createPortal(
          <Sheet
            title={
              {
                prayer: "Pedidos de oração",
                activities: "Atividades e Aulas",
                pastor: "Pastor",
                leader: "Ministério Musical",
              }[detail]
            }
            onClose={() => setDetail(null)}
          >
            <div className="panel-content">
              {detail === "prayer" ? (
                sent ? (
                  <div className="confirmation">
                    <h3>Pedido registrado na demonstração</h3>
                    <p>Este protótipo não envia nem armazena seu pedido.</p>
                    <button
                      className="primary-action"
                      onClick={() => setDetail(null)}
                    >
                      Concluir
                    </button>
                  </div>
                ) : (
                  <form
                    className="panel-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSent(true);
                    }}
                  >
                    <p>Compartilhe um pedido de oração.</p>
                    <label>
                      Seu pedido
                      <textarea
                        required
                        maxLength={2000}
                        rows={4}
                        placeholder="Escreva seu pedido"
                      />
                    </label>
                    <small>
                      Demonstração: o texto não será enviado nem salvo.
                    </small>
                    <button className="primary-action">Concluir pedido</button>
                  </form>
                )
              ) : detail === "activities" ? (
                <>
                  <p>Conheça os próximos encontros da comunidade.</p>
                  <Link href="/programacao" className="primary-action">
                    Ver programação →
                  </Link>
                </>
              ) : (
                <>
                  <h3>
                    {detail === "pastor"
                      ? "Hector Dalagnojadnvj"
                      : "Joao Maria José"}
                  </h3>
                  {detail === "leader" && <p>Lider · Ministério Musical</p>}
                  <p>Conheça a comunidade nos nossos próximos encontros.</p>
                  <Link href="/programacao" className="primary-action">
                    Ver próximos encontros →
                  </Link>
                </>
              )}
            </div>
          </Sheet>,
          document.body,
        )}
    </>
  );
}
