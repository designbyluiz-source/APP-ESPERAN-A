"use client";
import { useState } from "react";
import Link from "next/link";
import { LoadingPhoto } from "@/components/loading-photo";
export default function SkeletonCheck() {
 const [started,setStarted]=useState(false);
 return <main style={{padding:24,overflow:"auto"}}><h1>Conferência de carregamento</h1><button onClick={()=>setStarted(true)}>Iniciar conferência</button><Link href="/skeleton-check/slow" prefetch={false}>Conferir tela lenta</Link>{started && <div style={{display:"flex",gap:24,flexWrap:"wrap",marginTop:24}}>{["fast","slow"].map(kind=><section data-testid={kind} key={kind}><h2>{kind === "fast" ? "Foto rápida" : "Foto lenta"}</h2><div className="hero" style={{width:240,height:180}}><LoadingPhoto className="hero-photo" src={kind === "fast" ? "/figma/community-original.jpeg" : "/skeleton-check/image"} alt={kind === "fast" ? "Foto carregada rapidamente" : "Foto com atraso controlado"}/></div></section>)}</div>}</main>
}
