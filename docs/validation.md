# Validação

Conferência realizada em 22/10/2026 no navegador local, usando os contextos detalhados e screenshots do Figma como referência visual.

## Compilação

- `npm run typecheck`: passou.
- `npm run build`: passou. Todas as rotas foram geradas como páginas estáticas pelo Next.js.
- Assets locais: 106 arquivos exportados do Figma, todos com conteúdo. Nenhuma URL temporária do Figma é usada no código da aplicação.

## Layout e assets

- Verificadas as sete rotas de conteúdo em 320 px e 768 px; conferidas também as telas em 440 px e a home em 1280 px.
- Corrigida uma sobra horizontal de 6 px no carrossel em 320 px. O início foi conferido novamente nessa largura, sem rolagem horizontal.
- Todas as rotas foram conferidas novamente em 440 × 956: nenhuma imagem quebrada e nenhum contêiner com rolagem horizontal.
- Dimensões dos assets visíveis foram registradas em `screenshots/asset-audit.json`.
- A moldura com radius de celular e a barra de sistema foram removidas. O contêiner principal ocupa a largura da janela.
- A home usa duas colunas em desktop e uma em celular/tablet.
- O backdrop dos drawers cobre a janela com preto a 40%, sem arredondamento. O drawer mantém radius de 32 px apenas no topo.

## Fluxos conferidos

- Entrada no login, alternância de visibilidade da senha e acesso ao perfil de demonstração.
- Clique no canto do card Esperança Kids, fora do ícone, abrindo o drawer.
- Adição de uma terceira criança, edição do nome e confirmação de check-in simulado.
- Troca entre outubro e novembro, seleção de uma data no calendário e expansão de encontro.
- Navegação da agenda para o culto.
- Troca entre Liturgia e Louvor, com textos e assets locais carregados.
- Clique na região superior do card Nosso Culto, fora do ícone, abrindo a tela correspondente.
- Botão da chave Pix apresenta a mensagem de dados ilustrativos pendentes.
- Menu de atalhos do membro abre a reprodução do splash.
- Splash: flutuação do vitral, animação de expansão configurada e transição automática concluída em `/inicio`.

## Correção das fotografias

As imagens retornadas inicialmente pelo contexto de design continham deformações já incorporadas no arquivo. Alterar apenas `object-fit` preservava essas deformações. As fotos dos cards principais e do Esperança Kids foram substituídas pelos arquivos originais incorporados ao Figma, obtidos em `rawImages` pelo conector. O navegador aplica escala uniforme com `cover`; no Kids, o ponto de recorte fica em 30% da altura para manter os rostos abaixo do título.

Arquivos usados: `community-original.jpeg` (1024 × 1024), `kids-original.png` (2711 × 4094) e `groups-original.jpeg` (4096 × 2736).

## Limites da conferência

A conferência foi feita no navegador Chromium do ambiente local. Não foi realizada uma matriz de testes em Safari/Firefox ou em aparelhos físicos. Não há backend nesta etapa.

## Migração e últimos ajustes

Em 22/10/2026 o projeto foi importado para `Documents/GitHub/APP-ESPERAN-A`, conectado ao repositório `designbyluiz-source/APP-ESPERAN-A`. A prévia local na porta 3001 foi reiniciada a partir dessa pasta.

O login foi validado sem rolagem ou elementos fora da tela em 320×568, 390×740, 568×320, 844×390 e 1280×900. Logo, espaçamentos e controles se adaptam à altura; telas baixas em paisagem usam duas colunas.

A esteira Acontece por aqui foi conferida em celular: o contêiner vai de x=0 à borda direita da janela, sem sobra horizontal na página. Um gesto horizontal deslocou o primeiro card até x=-177 e exibiu o segundo por completo, comprovando que a margem do conteúdo não corta a esteira.

## Skeletons condicionais

Adicionados fallbacks de navegação específicos para as telas e placeholders de fotografias com visibilidade atrasada em 350 ms. O atraso não impede a exibição imediata de conteúdo que já chegou.

Conferência com atrasos locais controlados, removida após o teste: imagem rápida terminou antes do limiar e seu placeholder não apareceu; imagem lenta ficou inicialmente com placeholder invisível, mostrou-o após o limiar e o removeu ao concluir. A navegação lenta mostrou o skeleton de página com atraso CSS de 0,35 s; o fallback foi removido ao chegar a página. A preferência de movimento reduzido mantém o atraso e desativa apenas a animação de brilho.

Validação final: TypeScript, formatação e compilação de produção passaram. O Next.js 16.4 emitiu um aviso de vulnerabilidade conhecida e recomendou atualização; a compilação terminou com sucesso após repetir o comando, conforme solicitado pelo próprio diagnóstico. As dependências não foram alteradas neste ajuste de skeletons.
