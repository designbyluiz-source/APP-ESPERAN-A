# Navegação entre abas

A barra inferior usa um único componente persistente no AppFrame para Início, Comunidade, Servir e Estudo. Ela não é mais desmontada junto com as páginas. Os cinco ícones compartilham os mesmos assets e uma área visual fixa de 35 × 35 px.

O destaque circular é um único pseudo-elemento que desliza por transform em 340 ms. A seleção visual responde ao toque antes da conclusão da navegação; aria-current acompanha a rota efetivamente aberta. Estados pendentes são limpos ao concluir a rota, ao voltar e após timeout em caso de falha.

As rotas de membro são antecipadas pelo prefetch do Next ao entrar na área logada. O conteúdo entra com opacidade e deslocamento de 6 px durante 220 ms; cabeçalho e barra não recebem essa animação. A preferência de reduzir movimento desativa as animações e transições.

O menu Mais foi movido com a barra para o AppFrame, mantendo seus acessos. Os painéis bloqueiam tanto o conteúdo como a navegação persistente, preservando o foco e o estado inert anterior.

Verificação: TypeScript e diff check sem erros; navegação de produção pelas quatro abas, abertura/fechamento de Mais e indicador em movimento conferidos no navegador. Apenas uma barra permanece no DOM, com duração computada de 0.34s e transform variando entre as posições durante as trocas. Compilação gera as rotas, mas continua sujeita ao aviso de segurança preexistente do Next.js 16.4.

Sem stage, commit ou push pelo agente.
