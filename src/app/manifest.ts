import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Esperança · Igreja Presbiteriana",
    short_name: "Esperança",
    description: "Um lugar para pertencer.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#eeeeee",
    theme_color: "#eeeeee",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
