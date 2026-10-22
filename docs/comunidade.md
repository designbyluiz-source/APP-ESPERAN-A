# Comunidade

Referência: Figma St9lkLjGegvXFvdzPqNjq0, frame 127:186.
Rota: `/comunidade`, acessível pela segunda opção da navegação da área de membro.

Reutiliza header, avatar, notificações, navegação, divisores, botões circulares, skeleton de imagem e painel com foco controlado do app. Não reproduz moldura de telefone nem status bar, conforme decisões anteriores do projeto.

Assets oficiais locais em `public/figma/community/`. As cinco fotos passam pela otimização responsiva do Next Image; originais permanecem preservados. SVGs conservam dimensões intrínsecas do Figma.

Interações: explorar grupos abre o painel existente; pedidos de oração têm formulário somente demonstrativo, sem envio ou persistência; atividades, eventos e detalhes de líderes levam à programação. Os nomes e textos foram mantidos como estão no frame, incluindo textos provisórios.

Validação: TypeScript sem erros. Navegação Início ↔ Comunidade, painel de grupos, conclusão e fechamento do pedido demonstrativo, painel de líder e esteira horizontal conferidos no navegador. Larguras 320, 440 e 1280 sem transbordamento da página. Em 440 px, fotos dos cards medem 182 × 166, hero 376 × 190, líderes 284 × 288; SVGs em suas dimensões originais. Todas as imagens locais carregaram com sucesso.

A compilação gerou e prerenderizou `/comunidade`, mas o processo terminou com SecurityFatalError devido ao aviso já existente de vulnerabilidade do Next.js 16.4. A tela também foi conferida com `next start` na porta temporária 3002, sem elementos de desenvolvimento.

Alterações deixadas locais, sem stage, commit ou push.
