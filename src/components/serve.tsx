"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LoadingPhoto } from "./loading-photo";
import { Divider, RoundIcon, Sheet } from "./ui";

export const serveAsset = (name: string, extension = "svg") =>
  `/figma/serve/${name}.${extension}`;
type Ministry = "music" | "welcome" | "children";
type Tab = "Equipe" | "Agenda" | "Avisos";
const ministries = {
  music: {
    title: "Musica",
    description: "Louvor e adoraçao",
    photo: "music",
    alt: "Equipe de música conduzindo o louvor",
  },
  welcome: {
    title: "Acolhimento",
    description: "Recepção e organização do café",
    photo: "welcome",
    alt: "Pessoas se acolhendo na comunidade",
  },
  children: {
    title: "Infantil",
    description: "Louvor e adoraçao",
    photo: "children",
    alt: "Atividade com crianças no ministério infantil",
  },
};

function MinistryCard({
  ministry,
  own = false,
  onOpen,
}: {
  ministry: Ministry;
  own?: boolean;
  onOpen: () => void;
}) {
  const item = ministries[ministry];
  return (
    <button
      className={`hero ministry-card ministry-${ministry} ${own ? "my-ministry" : ""}`}
      onClick={onOpen}
      aria-label={
        own
          ? "Musica: equipe, agenda e avisos"
          : `${item.title}: equipe e vagas`
      }
    >
      <LoadingPhoto
        optimized
        sizes="(min-width: 900px) 548px, (min-width: 600px) 760px, 100vw"
        className="hero-photo"
        src={serveAsset(item.photo, "png")}
        alt={item.alt}
      />
      <div className="ministry-gradient" />
      <div className="ministry-copy">
        <div className="ministry-title">
          <h3>{item.title}</h3>
          {!own && <span className="ministry-vacancy">1 VAGA</span>}
        </div>
        <p>{item.description}</p>
      </div>
      <span className="ministry-action">
        <span>{own ? "Equipe, agenda e avisos" : "Equipe e vagas."}</span>
        <RoundIcon
          className={own ? "burgundy" : "green"}
          src={serveAsset("arrow")}
        />
      </span>
    </button>
  );
}

export function Serve() {
  const [selected, setSelected] = useState<Ministry | null>(null);
  const [tab, setTab] = useState<Tab>("Equipe");
  const [interested, setInterested] = useState(false);
  function open(ministry: Ministry) {
    setTab("Equipe");
    setInterested(false);
    setSelected(ministry);
  }
  return (
    <>
      <div className="serve-body" data-node-id="133:489">
        <div className="serve-intro">
          <h1>Servir</h1>
          <p>Coloque seus dons a serviço de algo maior.</p>
        </div>
        <Divider src={serveAsset("divider")} />
        <section className="serve-section my-ministries">
          <h2>Meus Ministérios</h2>
          <MinistryCard ministry="music" own onOpen={() => open("music")} />
        </section>
        <Divider src={serveAsset("divider")} />
        <section className="serve-section other-ministries">
          <h2>Outros ministérios</h2>
          <MinistryCard ministry="welcome" onOpen={() => open("welcome")} />
          <MinistryCard ministry="children" onOpen={() => open("children")} />
          <MinistryCard ministry="children" onOpen={() => open("children")} />
        </section>
      </div>
      {selected &&
        createPortal(
          <Sheet
            title={ministries[selected].title}
            onClose={() => setSelected(null)}
          >
            <div className="panel-content">
              <p>{ministries[selected].description}</p>
              {selected === "music" ? (
                <>
                  <div
                    className="ministry-tabs"
                    role="tablist"
                    aria-label="Ministério de música"
                  >
                    {(["Equipe", "Agenda", "Avisos"] as Tab[]).map((name) => (
                      <button
                        key={name}
                        role="tab"
                        id={`ministry-tab-${name}`}
                        aria-selected={tab === name}
                        aria-controls="ministry-tab-panel"
                        tabIndex={tab === name ? 0 : -1}
                        onClick={() => setTab(name)}
                        onKeyDown={(event) => {
                          const names: Tab[] = ["Equipe", "Agenda", "Avisos"];
                          const index = names.indexOf(tab);
                          const next =
                            event.key === "ArrowRight"
                              ? names[(index + 1) % 3]
                              : event.key === "ArrowLeft"
                                ? names[(index + 2) % 3]
                                : event.key === "Home"
                                  ? names[0]
                                  : event.key === "End"
                                    ? names[2]
                                    : null;
                          if (next) {
                            event.preventDefault();
                            setTab(next);
                            document
                              .getElementById(`ministry-tab-${next}`)
                              ?.focus();
                          }
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div
                    role="tabpanel"
                    id="ministry-tab-panel"
                    aria-labelledby={`ministry-tab-${tab}`}
                    tabIndex={0}
                    className="panel-content"
                  >
                    {tab === "Equipe" ? (
                      <>
                        <h3>Nossa equipe</h3>
                        <p>
                          Os integrantes serão apresentados aqui quando os dados
                          do ministério estiverem disponíveis.
                        </p>
                      </>
                    ) : tab === "Agenda" ? (
                      <>
                        <h3>Agenda do ministério</h3>
                        <p>As escalas e os ensaios aparecerão aqui.</p>
                        <Link href="/programacao" className="primary-action">
                          Ver programação da igreja →
                        </Link>
                      </>
                    ) : (
                      <>
                        <h3>Avisos</h3>
                        <p>Nenhum aviso disponível nesta demonstração.</p>
                      </>
                    )}
                  </div>
                </>
              ) : interested ? (
                <div className="confirmation">
                  <h3>Interesse registrado na demonstração</h3>
                  <p>Nenhuma inscrição foi enviada ou salva.</p>
                  <button
                    className="primary-action"
                    onClick={() => setSelected(null)}
                  >
                    Concluir
                  </button>
                </div>
              ) : (
                <>
                  <span className="ministry-vacancy">1 VAGA</span>
                  <p>Conheça essa oportunidade de servir com a comunidade.</p>
                  <button
                    className="primary-action"
                    onClick={() => setInterested(true)}
                  >
                    Quero participar
                  </button>
                </>
              )}
              <small>
                Conteúdo de demonstração. Equipes, escalas e vagas ainda não
                estão conectadas a dados reais.
              </small>
            </div>
          </Sheet>,
          document.body,
        )}
    </>
  );
}
