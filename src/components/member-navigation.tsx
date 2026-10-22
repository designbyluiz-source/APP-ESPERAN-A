"use client";

import Link from "next/link";

const items = [
  { id: "home", href: "/membro", label: "Início" },
  { id: "community", href: "/comunidade", label: "Comunidade" },
  { id: "service", href: "/servir", label: "Serviço comunitário" },
  { id: "study", href: "/estudo", label: "Estudo Bíblico" },
] as const;
type Tab = (typeof items)[number]["id"];

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
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          aria-label={item.label}
          aria-current={active === item.id ? "page" : undefined}
          className={active === item.id ? "active" : undefined}
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
