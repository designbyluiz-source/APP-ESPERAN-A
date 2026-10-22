export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { version: process.env.NEXT_PUBLIC_ESPERANCA_VERSION },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store",
      },
    },
  );
}
