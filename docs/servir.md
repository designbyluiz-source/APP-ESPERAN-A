# Servir · Figma 133:463

Rota `/servir`, ligada à terceira opção da navegação da área de membro. Referência: https://www.figma.com/design/St9lkLjGegvXFvdzPqNjq0/Untitled?node-id=133-463

Reutiliza o shell, cabeçalho, avatar, notificações, navegação, divisores, botões circulares, skeleton de imagem e painéis existentes. Assets oficiais preservados em `public/figma/serve/`, com fotos otimizadas pelo Next Image e object-fit cover. Mantém os textos do frame, inclusive os dois cards Infantil repetidos. Não reproduz moldura de celular ou barra de bateria.

Música abre painel demonstrativo com abas Equipe, Agenda e Avisos; navegação de abas também funciona por setas, Home e End. Agenda liga à programação existente. Outros ministérios abrem detalhes da vaga e confirmação de interesse somente em memória, sem envio ou persistência. Não há equipes ou escalas reais inventadas.

Conferência em 320, 440 e 1280 px sem transbordamento lateral. Em 440 px: card de Música 376 × 190; demais cards 376 × 182; SVGs mantêm dimensões intrínsecas. Todos os assets visíveis carregaram. Acesso pela navegação inferior, seleção da aba Servir, abas do ministério, confirmação e fechamento dos painéis testados no navegador.

TypeScript e diff check passaram. A compilação gerou e prerenderizou `/servir`, mas o comando terminou com o SecurityFatalError já existente da versão instalada do Next.js. A tela foi conferida também no servidor de produção temporário na porta 3002.

Sem stage, commit ou push executados pelo agente.
