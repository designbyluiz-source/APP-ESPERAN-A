import type { NextConfig } from "next";
import { appVersion } from "./scripts/app-version.mjs";

const config: NextConfig = {
  devIndicators: false,
  env: { NEXT_PUBLIC_ESPERANCA_VERSION: appVersion() },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
    ];
  },
};
export default config;
