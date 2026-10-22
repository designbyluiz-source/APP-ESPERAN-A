# Mobile e PWA

Prioridade de produto: celular, com instalação como PWA. A interface continua adaptável ao desktop.

- O favicon fornecido pelo usuário é preservado em `public/favicon.png` e origina os ícones 192/512, Apple 180 e maskable 512. A versão maskable tem margem para recortes do sistema.
- Manifesto em `/manifest.webmanifest`, abertura standalone, idioma pt-BR e início na splash existente.
- Viewport respeita recortes físicos da tela sem bloquear zoom. Botão voltar tem área mínima de toque 44 × 44.
- Fotos originais mantidas como fonte; versões WebP usadas no app preservam suas proporções e reduzem as três fotos principais para aproximadamente 480 KB.
- Service worker registrado apenas em produção. Ao abrir uma página sem rede, mostra tela própria com tentativa de reconexão. Não oferece navegação completa offline e não armazena formulários, dados de membros ou respostas RSC.
- Atualizações aguardam o fechamento das instâncias antigas; não recarregam formulários abertos.

## Instalação

Publicar com HTTPS. No Android, usar a opção de instalar app no navegador; no Safari do iPhone, Compartilhar → Adicionar à Tela de Início. O navegador decide a disponibilidade da instalação. A prévia de desenvolvimento não registra service worker para evitar cache interferindo nas alterações.

## Validação em 22/10/2026

TypeScript e build de produção passaram. Testes de contrato: `node --test tests/pwa.test.mjs`. Login conferido a 320 × 568 sem rolagem nem transbordamento horizontal. Favicon e manifesto presentes no HTML. Teste real de produção na porta 3002: servidor desligado após registro; recarregar `/entrar` apresentou a tela offline e o botão de tentar novamente. Instalação física em Android/iPhone ainda precisa ser conferida após publicação HTTPS.

O Next.js 16.4 instalado emite aviso de vulnerabilidade conhecida durante o build; atualização de segurança segue pendente.
