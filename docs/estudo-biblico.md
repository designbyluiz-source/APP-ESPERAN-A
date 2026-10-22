# Estudo Bíblico · Figma 136:698

Rota `/estudo`, ligada à quarta opção da navegação. Referência: https://www.figma.com/design/St9lkLjGegvXFvdzPqNjq0/Untitled?node-id=136-698

Reutiliza shell de membro, cabeçalho, navegação, skeleton de imagem e painéis existentes. Assets oficiais preservados em `public/figma/study/`; foto otimizada pelo Next Image sem alterar proporção. Mantém Minha turma, Outras Turmas, Novos Membros e Materiais de Estudo. Não reproduz moldura de telefone ou barra de bateria.

O frame destaca a terceira opção (Servir) por engano para esta tela. A implementação destaca a quarta opção (Estudo), mantendo o ícone de serviço inativo na variante existente e aplicando a cor branca ao ícone ativo de estudo para contraste.

Painéis demonstrativos para os quatro acessos. Minha turma liga ao painel de materiais; materiais oferecem acesso às leituras/liturgia já existentes; outras turmas ligam à programação; Novos Membros tem confirmação de interesse somente em memória. Não há inscrições enviadas, dados persistidos ou turmas inventadas.

Conferência em 320, 440 e 1280 px sem transbordamento lateral. Em 440 px: foto do card 376 × 190, cards menores 182 × 182, ação da turma 44 × 44, setas 22 × 22, vitral 77 × 110, livro 141 × 140, ícone de materiais 72 × 72. Todos os assets visíveis carregaram. Acesso pela navegação inferior, painéis, confirmação e fechamento conferidos no navegador.

TypeScript e verificação de diferenças passaram. A compilação gerou e prerenderizou `/estudo`, mas o comando terminou com o SecurityFatalError preexistente da versão instalada do Next.js. Tela conferida também em produção na porta temporária 3002.

Sem stage, commit ou push executados pelo agente.
