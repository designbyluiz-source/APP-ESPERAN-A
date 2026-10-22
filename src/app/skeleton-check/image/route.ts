export async function GET() {
 await new Promise(resolve=>setTimeout(resolve,6000));
 return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="180"><rect width="240" height="180" fill="#116549"/></svg>',{headers:{"Content-Type":"image/svg+xml","Cache-Control":"no-store"}});
}
