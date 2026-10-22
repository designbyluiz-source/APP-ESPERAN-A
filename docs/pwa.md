# Mobile, cache e atualizações

Prioridade: celular e instalação como PWA, com layout também adaptável ao desktop. Publicar com HTTPS; service worker e aviso de atualização funcionam em produção. O modo de desenvolvimento não registra service worker para não prender alterações em cache.

## Cache

`/sw.js` agora é um Route Handler, com a mesma versão compilada no cliente e em `/api/version`. O código do worker está em `src/lib/pwa-worker.mjs`.

- Cache first para JS/CSS/fontes em `/_next/static/`, fotos e SVGs de `/figma/`, ícones, favicon e imagens otimizadas do Next provenientes de `/figma/`.
- Navegação por documento usa a rede primeiro; se estiver indisponível, recupera a página já visitada no cache da versão atual. Rotas permitidas: início, splash, home logada, Comunidade, Servir, Estudo, programação, culto e ofertas.
- Login, check-in, APIs, POST, Authorization, respostas privadas/no-store e documentos com query não são armazenados. Campos de formulários e estados dos painéis não entram no cache.
- Respostas RSC e prefetch do App Router ficam fora do service worker, evitando misturar estados de navegação. A recuperação offline de páginas vale para abrir/recarregar documentos; não promete navegação completa offline entre todas as rotas do App Router.
- Páginas não visitadas e áreas excluídas recebem a tela de conexão existente quando abertas sem rede.
- Limites: 160 arquivos e 24 documentos por versão; tela offline e seu ícone ficam preservados. Falhas de gravação não interrompem respostas da rede.
- Ao ativar uma versão, páginas antigas são removidas. Um cache anterior de arquivos permanece para servir chunks com hash a outra aba ainda aberta; imagens sem hash não são reaproveitadas entre versões.

## Nova versão disponível

Fluxo inspirado no HoloCount: consulta `/api/version` ao abrir, a cada 60 segundos com a aba visível, ao retornar à aba e ao recuperar conexão. Também observa um service worker instalado e aguardando ativação.

O aviso “Nova versão disponível → Atualizar” usa o visual do Esperança. Somente o clique ativa o worker aguardando e recarrega a aba uma vez; não há atualização automática que interrompa formulários. Sem conexão ou diante de falha, o aviso permite tentar novamente. Outras abas não são recarregadas à força.

A versão usa `VERCEL_DEPLOYMENT_ID` quando disponível; fora da Vercel, um hash estável do código, assets e configuração muda automaticamente quando esses arquivos mudam, inclusive antes de commit. `ESPERANCA_VERSION` permite definir uma versão explícita no build em CI/testes. Não mudar essa variável entre build e start. O endpoint e o script do worker são enviados com no-store.

## Instalação e ícones

No Android, usar a opção de instalação do navegador. No Safari do iPhone, Compartilhar → Adicionar à Tela de Início. O favicon do navegador conserva sua arte; os ícones de instalação são quadrados e opacos, deixando o sistema aplicar o recorte.

## Verificação

`npm run test:pwa`: testes de cache offline, cache first, exclusão de dados privados, limites, separação por versão, preservação de chunks antigos, ativação somente após aceite, instalação em andamento, falha de atualização e geração estável de versão.

Teste real de produção na porta temporária 3002:

1. Versão A aberta e worker ativado; com servidor desligado, a home recarregou inteira com imagens.
2. Versão B publicada na mesma porta; a aba A mostrou o aviso sem recarregar automaticamente.
3. Tentativa de atualizar com servidor desligado mostrou erro recuperável.
4. Após reconectar, Atualizar ativou o worker B, recarregou a aba e removeu o aviso; a outra aba não recarregou à força.
5. Endpoint e worker conferidos com cabeçalhos no-store; script servido passou na verificação de sintaxe.

Instalação em aparelho físico ainda depende de conferência após publicação HTTPS. A versão instalada do Next.js continua emitindo seu aviso preexistente de segurança durante build.
