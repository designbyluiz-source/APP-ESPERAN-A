import { createServiceWorker } from "@/lib/pwa-worker.mjs";

export const dynamic = "force-dynamic";
export function GET() {
  return new Response(
    createServiceWorker(
      process.env.NEXT_PUBLIC_ESPERANCA_VERSION ?? "development",
    ),
    {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
        "CDN-Cache-Control": "no-store",
        "Service-Worker-Allowed": "/",
      },
    },
  );
}
