"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { assets } from "@/lib/figma-assets";
import { PageHeader, Sheet } from "./ui";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [panel, setPanel] = useState<
    "help" | "terms" | "privacy" | "passkey" | null
  >(null);
  const [recovery, setRecovery] = useState(false);
  const router = useRouter();
  function enter() {
    sessionStorage.setItem("esperanca-demo", "member");
    router.push("/membro");
  }
  return (
    <>
      <main
        className="login-screen"
        data-sheet-background
        data-node-id="106:400"
      >
        <img
          className="login-watermark"
          src={assets.login.imgLogo1Vetorizado1}
          alt=""
        />
        <PageHeader backAsset={assets.login.imgChevronLeft} />
        <div className="login-scroll">
          <div className="login-content">
            <h1>Entrar</h1>
            <img
              className="login-wordmark"
              src={assets.login.imgAsset11300X1}
              alt="Esperança Igreja Presbiteriana"
            />
            <form
              className="login-form"
              id="login-form"
              onSubmit={(event) => {
                event.preventDefault();
                enter();
              }}
            >
              <label>
                Seu e-mail
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Digite seu email"
                  autoComplete="email"
                />
              </label>
              <label>
                Digite sua senha
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    minLength={6}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    aria-pressed={showPassword}
                    onClick={() => setShowPassword((current) => !current)}
                  >
                    <img src={assets.login.imgEye} alt="" />
                    {showPassword && <span className="eye-slash" />}
                  </button>
                </div>
              </label>
            </form>
            <div className="login-actions">
              <div>
                <button
                  type="submit"
                  form="login-form"
                  className="login-submit"
                >
                  Entrar
                </button>
                <button
                  className="passkey-button"
                  onClick={() => setPanel("passkey")}
                >
                  Passkey
                  <img src={assets.login.imgVector} alt="" />
                </button>
              </div>
              <button
                className="help-link"
                onClick={() => {
                  setRecovery(false);
                  setPanel("help");
                }}
              >
                Problemas ao acessar sua conta?
              </button>
            </div>
            <p className="legal-copy">
              Consulte os{" "}
              <button onClick={() => setPanel("terms")}>Termos de uso</button> e
              a{" "}
              <button onClick={() => setPanel("privacy")}>
                Politica de Privacidade
              </button>{" "}
              do App Esperança
            </p>
          </div>
        </div>
      </main>
      {panel && (
        <Sheet
          title={
            {
              help: "Vamos ajudar você",
              terms: "Termos de uso",
              privacy: "Política de Privacidade",
              passkey: "Acesso com Passkey",
            }[panel]
          }
          onClose={() => setPanel(null)}
        >
          <div className="panel-content">
            {panel === "passkey" && (
              <>
                <p>
                  O acesso por Passkey será conectado na etapa de autenticação.
                  Por enquanto, você pode explorar o perfil de demonstração.
                </p>
                <button className="primary-action" onClick={enter}>
                  Entrar na demonstração →
                </button>
              </>
            )}
            {panel === "help" &&
              (recovery ? (
                <>
                  <h3>Simulação concluída</h3>
                  <p>
                    A recuperação por e-mail será conectada ao backend na
                    próxima etapa. Nenhum e-mail foi enviado.
                  </p>
                  <button
                    className="primary-action"
                    onClick={() => setPanel(null)}
                  >
                    Voltar ao acesso
                  </button>
                </>
              ) : (
                <form
                  className="panel-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setRecovery(true);
                  }}
                >
                  <p>
                    Informe o e-mail da sua conta para simular a recuperação de
                    acesso.
                  </p>
                  <label>
                    Seu e-mail
                    <input
                      required
                      type="email"
                      name="recoveryEmail"
                      autoComplete="email"
                      placeholder="voce@email.com"
                    />
                  </label>
                  <button className="primary-action">
                    Simular recuperação →
                  </button>
                </form>
              ))}
            {panel === "terms" && (
              <>
                <p>
                  Este front-end é um protótipo navegável do App Esperança.
                  Login, inscrições e check-in são simulações e não criam
                  registros reais.
                </p>
                <p>
                  O texto definitivo dos termos será incluído antes da ativação
                  dos serviços.
                </p>
              </>
            )}
            {panel === "privacy" && (
              <>
                <p>
                  Os formulários deste protótipo funcionam apenas na interface.
                  Os dados digitados não são enviados a nenhum servidor.
                </p>
                <p>
                  A navegação de demonstração usa um marcador temporário na
                  sessão do navegador. Senhas e dados das crianças não são
                  armazenados.
                </p>
              </>
            )}
          </div>
        </Sheet>
      )}
    </>
  );
}
