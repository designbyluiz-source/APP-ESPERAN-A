"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortal } from "react-dom";
import { LoadingPhoto } from "./loading-photo";
import { Divider, RoundIcon, Sheet } from "./ui";

export const studyAsset = (name: string, extension = "svg") =>
  `/figma/study/${name}.${extension}`;
type StudyPanel = "class" | "others" | "members" | "materials" | null;
const panelTitles = {
  class: "Minha turma",
  others: "Outras Turmas",
  members: "Novos Membros",
  materials: "Materiais de Estudo",
};

export function Study() {
  const [panel, setPanel] = useState<StudyPanel>(null);
  const [interested, setInterested] = useState(false);
  function open(next: StudyPanel) {
    setInterested(false);
    setPanel(next);
  }
  return (
    <>
      <div className="study-body" data-node-id="136:724">
        <div className="study-intro">
          <h1>Estudo Bíblico</h1>
          <p>Aprofunde sua fé e cresça no conhecimento da Palavra.</p>
        </div>
        <Divider src={studyAsset("divider")} />
        <section className="study-section">
          <h2>Meus estudos</h2>
          <button
            className="hero study-class-card"
            onClick={() => open("class")}
            aria-label="Acessar minha turma"
          >
            <LoadingPhoto
              optimized
              sizes="(min-width: 900px) 548px, (min-width: 600px) 760px, 100vw"
              className="hero-photo"
              src={studyAsset("class", "png")}
              alt="Pessoas estudando a Bíblia juntas"
            />
            <div className="study-gradient" />
            <div className="study-class-copy">
              <h3>Minha turma</h3>
              <p>Confira os detalhes na sua turma.</p>
            </div>
            <span className="study-class-action">
              <span>Acessar minha turma</span>
              <img src={studyAsset("class-action")} alt="" />
            </span>
          </button>
        </section>
        <Divider src={studyAsset("divider")} />
        <div className="study-access">
          <div className="feature-grid">
            <button
              className="feature-card study-others"
              onClick={() => open("others")}
              aria-label="Confira Outras Turmas"
            >
              <div className="feature-copy">
                <span>Confira</span>
                <h2>
                  Outras
                  <br />
                  Turmas
                </h2>
              </div>
              <RoundIcon src={studyAsset("arrow")} />
              <img className="study-vitral" src={studyAsset("vitral")} alt="" />
            </button>
            <button
              className="feature-card worship-card study-members"
              onClick={() => open("members")}
              aria-label="Classe de Novos Membros"
            >
              <img
                className="book-decoration"
                src={studyAsset("book")}
                alt=""
              />
              <div className="feature-copy">
                <span>Classe de</span>
                <h2>
                  Novos
                  <br />
                  Membros
                </h2>
              </div>
              <RoundIcon src={studyAsset("arrow")} />
            </button>
          </div>
          <button className="study-materials" onClick={() => open("materials")}>
            <img
              className="study-materials-icon"
              src={studyAsset("materials")}
              alt=""
            />
            <span>Materiais de Estudo</span>
            <img src={studyAsset("chevron")} alt="" />
          </button>
        </div>
      </div>
      {panel &&
        createPortal(
          <Sheet
            key={panel}
            title={panelTitles[panel]}
            onClose={() => setPanel(null)}
          >
            <div className="panel-content">
              {panel === "class" ? (
                <>
                  <h3>Confira os detalhes na sua turma.</h3>
                  <p>
                    Os dados da turma, os próximos encontros e os avisos
                    aparecerão aqui quando estiverem disponíveis.
                  </p>
                  <button
                    className="primary-action"
                    onClick={() => open("materials")}
                  >
                    Ver materiais de estudo →
                  </button>
                </>
              ) : panel === "others" ? (
                <>
                  <p>
                    Conheça outras oportunidades para estudar a Palavra com a
                    comunidade.
                  </p>
                  <p>
                    As turmas e os horários ainda não estão disponíveis nesta
                    demonstração.
                  </p>
                  <Link className="primary-action" href="/programacao">
                    Ver programação da igreja →
                  </Link>
                </>
              ) : panel === "members" ? (
                interested ? (
                  <div className="confirmation">
                    <h3>Interesse registrado na demonstração</h3>
                    <p>Nenhuma inscrição foi enviada ou salva.</p>
                    <button
                      className="primary-action"
                      onClick={() => setPanel(null)}
                    >
                      Concluir
                    </button>
                  </div>
                ) : (
                  <>
                    <p>Conheça a classe de Novos Membros.</p>
                    <p>
                      As informações de encontros e inscrições serão
                      apresentadas aqui.
                    </p>
                    <button
                      className="primary-action"
                      onClick={() => setInterested(true)}
                    >
                      Quero saber mais
                    </button>
                  </>
                )
              ) : (
                <>
                  <p>Os materiais das turmas serão disponibilizados aqui.</p>
                  <Link className="choice-card" href="/culto">
                    <strong>Leituras e liturgia do culto</strong>
                    <span>Acompanhar nosso culto →</span>
                  </Link>
                </>
              )}
              <small>
                Conteúdo de demonstração. Turmas e materiais ainda não estão
                conectados a dados reais.
              </small>
            </div>
          </Sheet>,
          document.body,
        )}
    </>
  );
}
