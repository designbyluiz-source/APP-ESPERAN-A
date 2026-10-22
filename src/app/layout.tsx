import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/unbounded";
import "@fontsource/kanit/300.css";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/kanit/600.css";
import "@fontsource/libre-baskerville/400-italic.css";
import "./globals.css";
import { Pwa } from "@/components/pwa";
import { AppFrame } from "@/components/app-frame";

export const metadata: Metadata = {
  applicationName: "Esperança",
  appleWebApp: { capable: true, title: "Esperança", statusBarStyle: "default" },
  icons: {
    icon: [{ url: "/favicon.png?v=7273fc1e", type: "image/png" }],
    apple: "/icons/apple-touch-icon.png?v=7273fc1e",
  },
  title: "Esperança · Igreja Presbiteriana",
  description:
    "Um lugar para pertencer. Comunidade, culto, programação e Esperança Kids.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#eeeeee",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppFrame>{children}</AppFrame>
        <Pwa />
      </body>
    </html>
  );
}
