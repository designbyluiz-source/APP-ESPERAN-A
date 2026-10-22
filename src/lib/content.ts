export const scripture = [
  "¹ Quando Jesus soube que os fariseus tinham ouvido dizer que ele fazia e batizava mais discípulos do que João",
  "² — se bem que Jesus mesmo não batizava, e sim os seus discípulos —,",
  "³ deixou a Judeia, retirando-se outra vez para a Galileia.",
  "⁴ E era-lhe necessário passar pela região da Samaria.",
  "⁵ Assim, Jesus chegou a uma cidade samaritana, chamada Sicar, perto das terras que Jacó tinha dado a seu filho José.",
  "⁶ Ali ficava o poço de Jacó. Cansado da viagem, Jesus sentou-se junto ao poço. Era por volta do meio-dia.",
  "⁷ Nisso veio uma mulher samaritana tirar água. Jesus lhe disse: — Dê-me um pouco de água.",
  "⁸ Pois os seus discípulos tinham ido à cidade comprar alimentos.",
  "⁹ Então a mulher samaritana perguntou a Jesus: — Como, sendo o senhor um judeu, pede água a mim, que sou mulher samaritana? Ela disse isso porque os judeus não se dão com os samaritanos.",
  "¹⁰ Jesus respondeu: — Se você conhecesse o dom de Deus e quem é que está lhe pedindo água para beber, você pediria, e ele lhe daria água viva.",
];

export const lyrics = [
  "Tudo está preparado aqui\nA casa e o meu coração também\nTu és o único motivo que me fez chegar",
  "Os filhos já estão chegando aqui\nAgora somos dois ou três, ou mais\nEncontre meu coração disposto a queimar por Ti",
  "Todos os versos e canções que eu conseguir cantar\nTodas as vezes quebrantado, só quero te falar",
  "Que Teu é o reino e a glória pra sempre\nTeu é o domínio e o poder, amém, amém\nTeu é o reino e a glória pra sempre\nTeu é o domínio e o poder, amém, amém",
  ...Array.from(
    { length: 3 },
    () =>
      "Só Tu és santo, só Tu és santo\nNão há outro como Tu, não há outro como Tu\nNão há outro como Tu, não há outro como Jesus\nSó Tu és santo, só Tu és santo\nNão há outro como Tu, não há outro como Tu\nNão há outro como Tu, não há outro como Jesus",
  ),
];

export const events = [
  {
    day: 11,
    weekday: "Dom",
    title: "Culto Dominical",
    time: "9:00 – 10:30",
    pastor: "Pastor Hector",
    kind: "past",
  },
  {
    day: 18,
    weekday: "Dom",
    title: "Culto Dominical",
    time: "9:00 – 10:30",
    pastor: "Pastor Hector",
    kind: "worship",
  },
  {
    day: 21,
    weekday: "Qua",
    title: "Escola Bíblica",
    time: "11:00 – 12:00",
    pastor: "Pastor Hector",
    kind: "study",
  },
  {
    day: 23,
    weekday: "Sex",
    title: "Escola Novos Membros",
    time: "11:00 – 12:00",
    pastor: "Pastor Hector",
    kind: "study",
  },
  {
    day: 25,
    weekday: "Dom",
    title: "Culto Dominical",
    time: "9:00 – 10:30",
    pastor: "Pastor Hector",
    kind: "worship",
  },
  {
    day: 28,
    weekday: "Qua",
    title: "Escola Bíblica",
    time: "11:00 – 12:00",
    pastor: "Pastor Hector",
    kind: "study",
  },
] as const;
