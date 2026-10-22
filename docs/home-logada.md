# Home logada · atualização do frame 106:152

Referência: https://www.figma.com/design/St9lkLjGegvXFvdzPqNjq0/Untitled?node-id=106-152

Rota `/membro`. Título Home, destaque Picnic Esperança com foto oficial, botão Reservar meu lugar e ação circular bordô. Ícones e imagens da home vêm dos assets atuais do frame, armazenados em `public/figma/member-home/`. Fotos com object-fit cover para manter proporções e otimização responsiva do Next Image. A home de visitante e a aba Comunidade conservam sua composição.

Reserva somente demonstrativa: painel com nome e quantidade de pessoas, confirmação local em memória, sem envio ou persistência. Data e local não foram inventados.

Conferência manual: 320, 440 e 1280 px sem transbordamento lateral; hero 376 × 227 em 440 px, fotos dos cards 182 × 182, CTA com seta 22 × 22 em círculo de 44 × 44. Todos os assets visíveis carregaram e os SVGs mantêm suas dimensões intrínsecas. Reserva abre, valida campos, confirma e fecha. Navegação para Comunidade preservada.

TypeScript e verificação de diferenças passaram. A compilação gerou/prerenderizou as rotas, mas terminou com o aviso preexistente SecurityFatalError do Next.js 16.4. Tela conferida também em produção com servidor temporário, sem ferramentas de desenvolvimento.

Sem stage, commit ou push executados pelo agente.
