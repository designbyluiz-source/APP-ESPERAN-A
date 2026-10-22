"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MemberNavigation, memberTabs } from "./member-navigation";
import { Sheet } from "./ui";

/** The member tab bar stays mounted while Next replaces only the page content. */
export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const active = memberTabs.find((item) => item.href === pathname);
  const isMemberTab = Boolean(active);
  const [more, setMore] = useState(false);
  useEffect(() => setMore(false), [pathname]);

  useEffect(() => {
    if (isMemberTab) memberTabs.forEach((item) => router.prefetch(item.href));
  }, [isMemberTab, router]);

  return (
    <div className="app-frame">
      {children}
      {active && (
        <MemberNavigation active={active.id} onMore={() => setMore(true)} />
      )}
      {more && active && (
        <Sheet title="Como podemos ajudar?" onClose={() => setMore(false)}>
          <div className="panel-content">
            {[
              ["/programacao", "Nossa programação"],
              ["/kids", "Esperança Kids"],
              ["/ofertas", "Dízimos e ofertas"],
              ["/abertura", "Ver abertura do app"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="choice-card"
                onClick={() => setMore(false)}
              >
                <strong>{label}</strong>
              </Link>
            ))}
          </div>
        </Sheet>
      )}
    </div>
  );
}
