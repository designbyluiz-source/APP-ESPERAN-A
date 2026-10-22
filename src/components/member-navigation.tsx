"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";

export const memberTabs = [
  { id: "home", href: "/membro", label: "Início" },
  { id: "community", href: "/comunidade", label: "Comunidade" },
  { id: "service", href: "/servir", label: "Serviço comunitário" },
  { id: "study", href: "/estudo", label: "Estudo Bíblico" },
] as const;
type Tab = (typeof memberTabs)[number]["id"];

function NavIcon({ name }: { name: Tab | "more" }) {
  return (
    <span
      className="member-nav-icon"
      aria-hidden="true"
      style={{
        maskImage: `url(/figma/community/${name}.svg)`,
        WebkitMaskImage: `url(/figma/community/${name}.svg)`,
      }}
    />
  );
}

/** Every tab shares the same artwork and geometry, including its active state. */
export function MemberNavigation({
  active,
  onMore,
}: {
  active: Tab;
  onMore: () => void;
}) {
  const [pending, setPending] = useState<{ from: Tab; to: Tab } | null>(null);
  const selected = pending?.from === active ? pending.to : active;
  useEffect(() => setPending(null), [active]);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setPending(null), 3000);
    return () => clearTimeout(timer);
  }, [pending]);
  return (
    <nav
      className="bottom-nav"
      aria-label="Navegação principal"
      data-sheet-background
      style={
        {
          "--active-index": memberTabs.findIndex(
            (item) => item.id === selected,
          ),
        } as CSSProperties
      }
    >
      {memberTabs.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-label={item.label}
          aria-current={active === item.id ? "page" : undefined}
          className={selected === item.id ? "active" : undefined}
          onNavigate={() => setPending({ from: active, to: item.id })}
        >
          <NavIcon name={item.id} />
        </Link>
      ))}
      <button aria-label="Mais opções" onClick={onMore}>
        <NavIcon name="more" />
      </button>
    </nav>
  );
}
