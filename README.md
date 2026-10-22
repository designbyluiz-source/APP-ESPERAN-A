# Esperança

Front-end navegável do App Esperança, implementado a partir dos oito links do Figma. Repositório oficial: https://github.com/designbyluiz-source/APP-ESPERAN-A.

Pasta de trabalho: `/Users/luizeduardodossantoseugenio/Documents/GitHub/APP-ESPERAN-A`. Todos os próximos ajustes deste app devem ser feitos aqui.

## Stack

A mesma base do Holocount: **Next.js 16.4, React 19.3, TypeScript 6 e Tailwind CSS 4.3**, com App Router. Fontes locais: Kanit, Libre Baskerville, Inter, Plus Jakarta Sans e Unbounded. Os assets do Figma estão em `public/figma`; a aplicação não depende de URLs temporárias do Figma.

## Executar

Requer Node.js 22 ou superior.

```sh
npm ci
npm run dev
```

Abra [http://localhost:3001](http://localhost:3001). A abertura animada apresenta o vitral flutuando, amplia o logo e revela a home em aproximadamente 3,3 segundos. Clique no logo para pular. Preferências do sistema para reduzir movimentos são respeitadas.

```sh
npm run typecheck
npm run build
npm start
```

## Telas

| Endereço       | Tela                                   |
| -------------- | -------------------------------------- |
| `/`            | Splash animado e transição para a home |
| `/abertura`    | Repetir o splash                       |
| `/inicio`      | Home de visitante                      |
| `/entrar`      | Login de demonstração                  |
| `/membro`      | Home de membro, com navegação inferior |
| `/kids`        | Drawer Esperança Kids sobre a home     |
| `/programacao` | Calendário e agenda de outubro de 2026 |
| `/culto`       | Liturgia e Louvor                      |
| `/ofertas`     | Dízimos e ofertas                      |

## Comportamentos

- Layout ocupa a janela inteira, sem moldura de celular ou barra de horário/bateria. A home usa uma coluna em telas menores e duas colunas a partir de 900 px.
- Cards Esperança Kids e Nosso Culto são links em toda a sua área.
- Drawers escurecem a janela inteira com uma camada reta. Apenas o drawer tem cantos superiores arredondados. Escape e clique fora fecham o painel; o foco fica dentro dele enquanto está aberto.
- Login aceita qualquer e-mail válido e senha com ao menos seis caracteres e abre o perfil de demonstração. Passkey apresenta uma explicação e permite acessar a demonstração.
- Esperança Kids permite editar os campos, adicionar/remover crianças e concluir um check-in simulado. Nenhum cadastro real é criado.
- O calendário permite mudar de mês, selecionar uma data, recolher seções e abrir os detalhes dos encontros. Os eventos ilustrativos reproduzem outubro de 2026 do Figma.
- O culto permite trocar entre Liturgia e Louvor. O segundo slide demonstra a navegação usando o mesmo tema visual.
- Os dados de Pix são ilustrativos, como no Figma. Os botões informam que a chave e os dados bancários estão pendentes; não iniciam pagamentos nem copiam a chave fictícia.
- Ações secundárias abrem painéis de demonstração para apresentação da igreja, interesse em participar, grupos, serviço, notificações e perfil.

## Limites desta etapa

Somente front-end. Não há backend, Supabase, autenticação real, envio de e-mails, inscrições, pagamentos ou persistência de dados pessoais. Apenas um marcador de navegação de demonstração é guardado em `sessionStorage`; sair da demonstração remove esse marcador.

## Organização

- `src/app`: rotas, layout e estilos responsivos.
- `src/components`: telas e componentes compartilhados.
- `src/lib/content.ts`: textos e agenda de demonstração.
- `src/lib/figma-assets.ts`: referências aos arquivos locais do Figma.
- `docs/designs.md`: relação entre telas e nós do Figma.
- `docs/validation.md`: conferências realizadas.
