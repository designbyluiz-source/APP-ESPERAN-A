"use client";

import { useState } from "react";
import { assets } from "@/lib/figma-assets";
import { RoundIcon, Sheet } from "./ui";

export function KidsCheckIn({ onClose }: { onClose: () => void }) {
  const [children, setChildren] = useState([
    { id: 1, name: "Helena Oliveira" },
    { id: 2, name: "Lucas Oliveira" },
  ]);
  const [complete, setComplete] = useState(false);
  const ordinals = ["primeira", "segunda", "terceira", "quarta", "quinta"];
  return (
    <Sheet title="Esperança Kids" onClose={onClose} className="kids-sheet">
      {complete ? (
        <div className="confirmation kids-confirmation">
          <RoundIcon src={assets.kids.imgCheck} />
          <h3>Check-in demonstrado!</h3>
          <p>
            {children.length}{" "}
            {children.length === 1
              ? "criança está pronta"
              : "crianças estão prontas"}{" "}
            para participar.
          </p>
          <ul>
            {children.map((child) => (
              <li key={child.id}>{child.name}</li>
            ))}
          </ul>
          <p>
            Esta é uma simulação. Nenhum cadastro ou check-in real foi
            realizado.
          </p>
          <button className="primary-action" onClick={onClose}>
            Voltar ao início →
          </button>
        </div>
      ) : (
        <form
          className="kids-form"
          onSubmit={(event) => {
            event.preventDefault();
            setComplete(true);
          }}
        >
          <label>
            Nome do responsável
            <input
              required
              defaultValue="Mariana Oliveira"
              name="guardian"
              autoComplete="name"
            />
          </label>
          <label>
            Documento
            <input
              required
              defaultValue="123.456.789-00"
              name="document"
              inputMode="numeric"
            />
          </label>
          <label>
            Telefone
            <input
              required
              defaultValue="(11) 99999-0000"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
          </label>
          <div className="children-fields">
            <div className="children-heading">
              <h3>Quem vem com você?</h3>
              <span>
                {children.length}{" "}
                {children.length === 1 ? "criança" : "crianças"}
              </span>
            </div>
            {children.map((child, index) => (
              <label key={child.id}>
                {index < 5
                  ? `Nome da ${ordinals[index]} criança`
                  : `Nome da criança ${index + 1}`}
                <div className="child-input">
                  <input
                    required
                    name={`child-${child.id}`}
                    value={child.name}
                    onChange={(event) =>
                      setChildren((current) =>
                        current.map((item) =>
                          item.id === child.id
                            ? { ...item, name: event.target.value }
                            : item,
                        ),
                      )
                    }
                  />
                  {index > 1 && (
                    <button
                      type="button"
                      className="remove-child"
                      aria-label={`Remover criança ${index + 1}`}
                      onClick={() =>
                        setChildren((current) =>
                          current.filter((item) => item.id !== child.id),
                        )
                      }
                    >
                      <img src={assets.kids.imgX} alt="" />
                    </button>
                  )}
                </div>
              </label>
            ))}
            <button
              className="add-child"
              type="button"
              onClick={() =>
                setChildren((current) => [
                  ...current,
                  { id: Date.now(), name: "" },
                ])
              }
            >
              <span>
                <img src={assets.kids.imgPlus} alt="" />
              </span>
              Adicionar outra criança
            </button>
          </div>
          <button className="check-in-button" type="submit">
            Fazer check-in
            <RoundIcon src={assets.kids.imgCheck} />
          </button>
        </form>
      )}
    </Sheet>
  );
}
