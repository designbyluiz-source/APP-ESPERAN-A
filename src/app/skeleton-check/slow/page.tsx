export const dynamic="force-dynamic";
export default async function SlowPage() {
 await new Promise(resolve=>setTimeout(resolve,4000));
 return <main><h1>Tela carregada</h1><a href="/inicio">Voltar ao início</a></main>;
}
