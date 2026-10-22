"use client";

import { LoadingPhoto } from "./loading-photo";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { assets } from "@/lib/figma-assets";
import { Divider, RoundIcon, Sheet, useToast } from "./ui";
import { KidsCheckIn } from "./kids-check-in";

type Panel =
  | "about"
  | "join"
  | "groups"
  | "notifications"
  | "profile"
  | "serve"
  | "shortcuts"
  | null;

export function Home({
  member = false,
  kids = false,
}: {
  member?: boolean;
  kids?: boolean;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [sent, setSent] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const { notify, toast } = useToast();
  const a = member ? assets.member : assets.guest;
  function show(next: Panel) {
    setSent(false);
    setSelectedGroup("");
    setPanel(next);
  }
  return (
    <>
      <main
        className={`home-screen ${member ? "member-screen" : ""}`}
        data-sheet-background
        data-node-id={member ? "106:152" : "106:61"}
      >
        <div className="home-scroll">
          <header className="home-header">
            <Link
              href={member ? "/membro" : "/inicio"}
              aria-label="Esperança, início"
            >
              <img
                className="wordmark"
                src={a.imgAsset11300X1}
                alt="Esperança Igreja Presbiteriana"
              />
            </Link>
            {member ? (
              <div className="member-actions">
                <button
                  aria-label="Notificações"
                  className="icon-button"
                  onClick={() => show("notifications")}
                >
                  <img src={assets.member.imgNotification} alt="" />
                </button>
                <button
                  className="avatar"
                  aria-label="Meu perfil"
                  onClick={() => show("profile")}
                >
                  L
                </button>
              </div>
            ) : (
              <Link href="/entrar" className="enter-chip">
                Entrar →
              </Link>
            )}
          </header>
          <div className="home-body">
            <section className="hero home-hero">
              <LoadingPhoto
                className="hero-photo"
                src={a.imgUmLugarParaPertencer}
                alt={
                  member
                    ? "Pequeno grupo reunido na comunidade"
                    : "Pessoas da comunidade Esperança conversando"
                }
              />
              <div className="hero-gradient" />
              <h1>
                {member ? "Pequenos" : "Um lugar para"}
                <em>{member ? "Grupos." : "pertencer."}</em>
              </h1>
              {member ? (
                <button
                  className="pill light group-cta"
                  onClick={() => show("groups")}
                >
                  Ver pequenos grupos disponiveis
                </button>
              ) : (
                <div className="hero-actions">
                  <button className="pill green" onClick={() => show("join")}>
                    Quero fazer parte
                  </button>
                  <button className="pill light" onClick={() => show("about")}>
                    Mais sobre nós
                  </button>
                </div>
              )}
            </section>
            <Divider src={a.imgLine32} />
            <div className="quick-access">
              <div className="feature-grid">
                <Link
                  href="/kids"
                  className="feature-card kids-card"
                  aria-label="Check-in Esperança Kids"
                >
                  <LoadingPhoto
                    className="feature-photo"
                    src={a.imgEsperancaKids}
                    alt="Crianças no Esperança Kids"
                  />
                  <div className="kids-gradient" />
                  <div className="feature-copy">
                    <span>Check-in</span>
                    <h2>
                      Esperança
                      <br />
                      Kids
                    </h2>
                  </div>
                  <RoundIcon src={a.imgArrowUpRight} />
                </Link>
                <Link
                  href="/culto"
                  className="feature-card worship-card"
                  aria-label="Acompanhe Nosso Culto"
                >
                  <img className="book-decoration" src={a.imgBookOpen} alt="" />
                  <div className="feature-copy">
                    <span>Acompanhe</span>
                    <h2>
                      Nosso
                      <br />
                      Culto
                    </h2>
                  </div>
                  <RoundIcon src={a.imgArrowUpRight} />
                </Link>
              </div>
              <div className="feature-grid">
                <Link href="/programacao" className="small-card schedule-card">
                  <img
                    className="small-decoration"
                    src={a.imgBookOpen1}
                    alt=""
                  />
                  <span>
                    Nossa
                    <br />
                    Programação
                  </span>
                  <img src={a.imgChevronRight} alt="" />
                </Link>
                <Link href="/ofertas" className="small-card giving-card">
                  <img
                    className="small-decoration"
                    src={a.imgHeartHandshake}
                    alt=""
                  />
                  <span>
                    Dizimos
                    <br />e Ofertas
                  </span>
                  <img src={a.imgChevronRight1} alt="" />
                </Link>
              </div>
            </div>
            <Divider src={a.imgLine32} />
            <section className="happenings">
              <h2>Acontece por aqui</h2>
              <div
                className="news-carousel"
                role="region"
                aria-label="Acontece por aqui"
                tabIndex={0}
              >
                <button
                  className="news-card welcome-card"
                  onClick={() => show("about")}
                >
                  <LoadingPhoto
                    className="news-photo"
                    src={a.imgBoasVindasAEsperanca}
                    alt="Encontro da Igreja Esperança"
                  />
                  <div className="news-gradient" />
                  <span className="category">NOSSA IGREJA</span>
                  <div className="news-bottom">
                    <h3>
                      Boas-vindas
                      <br />à Esperança
                    </h3>
                    <div>
                      <span>Um pouco de quem somos</span>
                      <RoundIcon src={a.imgPlay} />
                    </div>
                  </div>
                </button>
                <Link href="/programacao" className="news-card next-meeting">
                  <span className="news-label">CULTO DOMINICAL</span>
                  <h3>Nosso próximo encontro</h3>
                  <span className="meeting-time">Domingo · 9h</span>
                  <RoundIcon src={a.imgArrowUpRight1} />
                </Link>
              </div>
            </section>
          </div>
        </div>
        {member && (
          <nav className="bottom-nav" aria-label="Navegação principal">
            <Link
              className="active"
              href="/membro"
              aria-label="Início"
              aria-current="page"
            >
              <img src={assets.member.imgIconeInicio} alt="" />
            </Link>
            <button aria-label="Comunidade" onClick={() => show("groups")}>
              <img src={assets.member.imgIconeComunidade} alt="" />
            </button>
            <button
              aria-label="Serviço comunitário"
              onClick={() => show("serve")}
            >
              <img src={assets.member.imgIconeServicoComunitario} alt="" />
            </button>
            <Link href="/culto" aria-label="Estudo e culto">
              <img src={assets.member.imgIconeEstudo} alt="" />
            </Link>
            <button aria-label="Mais opções" onClick={() => show("shortcuts")}>
              <img src={assets.member.imgIcon1} alt="" />
            </button>
          </nav>
        )}
      </main>
      {kids && (
        <KidsCheckIn
          onClose={() =>
            router.push(
              sessionStorage.getItem("esperanca-demo") === "member"
                ? "/membro"
                : "/inicio",
            )
          }
        />
      )}
      {panel && (
        <Sheet
          title={
            {
              about: "Um lugar para pertencer",
              join: "Você é bem-vindo!",
              groups: "Pequenos Grupos",
              notifications: "Notificações",
              profile: "Meu perfil",
              serve: "Servir com amor",
              shortcuts: "Como podemos ajudar?",
            }[panel]
          }
          onClose={() => setPanel(null)}
        >
          {panel === "about" && (
            <div className="panel-content">
              <img
                className="about-photo"
                src={a.imgBoasVindasAEsperanca}
                alt="Nossa comunidade reunida"
              />
              <p>
                Somos a Igreja Presbiteriana Esperança. Uma comunidade para
                caminhar junto, compartilhar a fé e acolher cada pessoa.
              </p>
              <p>
                Conheça nossos encontros e venha fazer parte dessa história.
              </p>
              <Link className="primary-action" href="/programacao">
                Conhecer nossa programação →
              </Link>
            </div>
          )}
          {panel === "join" && (
            <div className="panel-content">
              {sent ? (
                <div className="confirmation">
                  <RoundIcon src={assets.kids.imgCheck} />
                  <h3>Que bom ter você por aqui!</h3>
                  <p>
                    Seu interesse foi registrado nesta demonstração. Conheça
                    também nossa programação.
                  </p>
                  <Link className="primary-action" href="/programacao">
                    Ver próximos encontros →
                  </Link>
                </div>
              ) : (
                <form
                  className="panel-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <p>Vamos nos conhecer? Conte como podemos chamar você.</p>
                  <label>
                    Seu nome
                    <input
                      required
                      name="name"
                      placeholder="Como você se chama?"
                      autoComplete="given-name"
                    />
                  </label>
                  <label>
                    Seu e-mail
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="voce@email.com"
                      autoComplete="email"
                    />
                  </label>
                  <button className="primary-action">
                    Quero conhecer a Esperança →
                  </button>
                  <small>
                    Formulário de demonstração. Nenhum dado será enviado.
                  </small>
                </form>
              )}
            </div>
          )}
          {panel === "groups" && (
            <div className="panel-content">
              <p>Um espaço para compartilhar a vida e crescer na fé.</p>
              <small>Grupos ilustrativos para explorar o protótipo.</small>
              {["Famílias", "Jovens", "Estudo e oração"].map((name, index) => (
                <button
                  key={name}
                  className={`choice-card ${selectedGroup === name ? "selected" : ""}`}
                  onClick={() => setSelectedGroup(name)}
                >
                  <strong>{name}</strong>
                  <span>
                    {
                      [
                        "Caminhar e aprender juntos",
                        "Amizade, fé e comunidade",
                        "Tempo de comunhão e leitura",
                      ][index]
                    }
                  </span>
                </button>
              ))}
              {selectedGroup && (
                <div className="inline-notice">
                  Você selecionou {selectedGroup}. Os detalhes e inscrições
                  estarão disponíveis na próxima etapa do projeto.
                </div>
              )}
            </div>
          )}
          {panel === "notifications" && (
            <div className="panel-content">
              <p className="empty-title">Tudo em dia por aqui.</p>
              <p>
                Confira a programação e acompanhe nossos próximos encontros.
              </p>
              <Link className="primary-action" href="/programacao">
                Ver programação →
              </Link>
            </div>
          )}
          {panel === "profile" && (
            <div className="panel-content">
              <div className="profile-summary">
                <span className="avatar">L</span>
                <div>
                  <h3>Luiz</h3>
                  <p>Perfil de demonstração</p>
                </div>
              </div>
              <Link className="choice-card" href="/kids">
                <strong>Minha família</strong>
                <span>Acessar Esperança Kids →</span>
              </Link>
              <button
                className="primary-action burgundy"
                onClick={() => {
                  sessionStorage.removeItem("esperanca-demo");
                  router.push("/inicio");
                }}
              >
                Sair da demonstração
              </button>
            </div>
          )}
          {panel === "serve" && (
            <div className="panel-content">
              <p>Há muitas formas de cuidar da nossa comunidade.</p>
              {["Acolhimento", "Esperança Kids", "Louvor"].map((name) => (
                <button
                  key={name}
                  className="choice-card"
                  onClick={() => {
                    notify(
                      `Interesse em ${name} selecionado nesta demonstração.`,
                    );
                    setPanel(null);
                  }}
                >
                  <strong>{name}</strong>
                  <span>Quero saber como participar →</span>
                </button>
              ))}
            </div>
          )}
          {panel === "shortcuts" && (
            <div className="panel-content">
              <Link className="choice-card" href="/programacao">
                <strong>Nossa programação</strong>
              </Link>
              <Link className="choice-card" href="/kids">
                <strong>Esperança Kids</strong>
              </Link>
              <Link className="choice-card" href="/ofertas">
                <strong>Dízimos e ofertas</strong>
              </Link>
              <Link className="choice-card" href="/abertura">
                <strong>Ver abertura do app</strong>
              </Link>
            </div>
          )}
        </Sheet>
      )}
      {toast}
    </>
  );
}
