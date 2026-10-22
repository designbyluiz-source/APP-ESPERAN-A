"use client";

import { assets } from "@/lib/figma-assets";
import { Divider, PageHeader, useToast } from "./ui";

export function Giving() {
  const { notify, toast } = useToast();
  const unavailable = () =>
    notify(
      "Dados ilustrativos. A chave Pix e os dados bancários ainda serão confirmados.",
    );
  return (
    <main className="section-screen" data-node-id="106:788">
      <PageHeader
        title="Dízimos e ofertas"
        backAsset={assets.giving.imgChevronLeft}
      />
      <div className="section-scroll giving-content">
        <section className="giving-intro">
          <h2>
            <span>Igreja Presbiteriana</span>Esperança
          </h2>
          <div className="qr-code">
            <img
              src={assets.giving.imgQrCodeIlustrativoNaoOperacional}
              alt="QR Code ilustrativo, sem dados de pagamento"
            />
          </div>
        </section>
        <section className="pix">
          <h3>COPIAR CHAVE PIX:</h3>
          <button
            className="pix-copy"
            onClick={unavailable}
            aria-label="Chave Pix ilustrativa, dados pendentes"
          >
            <span>CNPJ: 123.123.123.00001-46</span>
            <span className="round-icon green">
              <img src={assets.giving.imgCopy} alt="" />
            </span>
          </button>
        </section>
        <Divider src={assets.giving.imgLine32} />
        <section className="bank-details" aria-label="Dados bancários">
          {[
            "BANCO",
            "AGÊNCIA",
            "CONTA",
            "TIPO DE CONTA",
            "TITULAR · RAZÃO SOCIAL",
            "CNPJ",
          ].map((field) => (
            <div className="bank-row" key={field}>
              <h3>{field}</h3>
              <p>A confirmar</p>
              <button
                onClick={unavailable}
                aria-label={`${field}, dados a confirmar`}
              >
                <img src={assets.giving.imgCopiarBanco} alt="" />
              </button>
            </div>
          ))}
        </section>
      </div>
      {toast}
    </main>
  );
}
