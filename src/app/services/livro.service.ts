import { Injectable } from '@angular/core';
import { Livro } from '../models/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor() { }

  livroDestaques(): Livro[] {
    return [
      {
        idLivro: 1,
        tituloLivro: 'Pânico',
        autorLivro: 'Padraic Maroney',
        genero: 'Terror',
        descricao: 'Após anos de silêncio, Ghostface está de volta a Woodsboro, mas desta vez seus crimes parecem estar ligados a um segredo do passado que ninguém deveria descobrir. Enquanto um novo grupo de jovens tenta sobreviver aos ataques, eles percebem que o assassino conhece cada passo deles — e que, para escapar, precisarão descobrir quem está por trás da máscara antes do último grito.',
        dataLancamento: '26/06/2025',
        qtdPagina: 304,
        precoLivro: 49.90,
        imagemLivro: 'Imagens_Livros/livro2.png'
      },
      {
        idLivro: 2,
        tituloLivro: 'O Exorcista',
        autorLivro: 'William Peter Blatty',
        genero: 'Terror',
        descricao: 'Quando uma jovem começa a apresentar comportamentos inexplicáveis e cada vez mais assustadores, sua família busca respostas onde a ciência não consegue chegar. Diante de uma força sobrenatural que parece dominar seu corpo e sua mente, um padre é chamado para enfrentar uma presença demoníaca determinada a não partir sem deixar sua marca..',
        dataLancamento: '12/08/2019',
        qtdPagina: 336,
        precoLivro: 60.00,
        imagemLivro: 'Imagens_Livros/livro7.png'
      },
      {
        idLivro: 3,
        tituloLivro: 'Nosferatu - Saga DarkSide',
        autorLivro: 'Bram Stoke',
        genero: 'Terror',
        descricao: 'Uma antiga presença retorna das sombras trazendo consigo uma maldição que atravessa gerações. Em uma cidade mergulhada em medo e mistério, uma série de acontecimentos inexplicáveis leva os moradores a descobrir que o verdadeiro perigo pode estar mais próximo do que imaginam..',
        dataLancamento: '16/12/2024',
        qtdPagina: 240,
        precoLivro: 109.90,
        imagemLivro: 'Imagens_Livros/livro5.png'
      },
      {
        idLivro: 4,
        tituloLivro: 'Histórias de Terror',
        autorLivro: 'Usborne',
        genero: 'Terror',
        descricao: 'Prepare-se para mergulhar em um mundo repleto de mistérios, criaturas assustadoras e acontecimentos sobrenaturais. Entre casas mal-assombradas, fantasmas misteriosos e encontros arrepiantes, cada história revela um novo pesadelo capaz de despertar a imaginação e desafiar até os leitores mais corajosos.',
        dataLancamento: '23/11/2024',
        qtdPagina: 24,
        precoLivro: 78.99,
        imagemLivro: 'Imagens_Livros/livro3.png'
      },
      {
        idLivro: 5,
        tituloLivro: 'A Maldição da Residência Hill',
        autorLivro: 'Shirley Jackson',
        genero: 'Terror',
        descricao: 'Entre o passado e o presente, uma família abalada confronta memórias assustadoras de seu antigo lar e dos eventos aterrorizantes que os expulsaram de lá..',
        dataLancamento: '26/07/2021',
        qtdPagina: 200,
        precoLivro: 61.15,
        imagemLivro: 'Imagens_Livros/livro4.png'
      },
      {
        idLivro: 6,
        tituloLivro: 'Terras de Sonhos e Acasos',
        autorLivro: 'Filipe de Campos Ribeiro',
        genero: 'Suspense',
        descricao: 'Após a morte dos pais, Ismael volta ao interior de São Paulo para reaver sua herança. Inundada por uma tempestade e isolada do mundo a pequena cidade de Rio das Almas está sob intervenção militar. Seus habitantes, acuados por estranhos crimes, professam uma inquietante religiosidade baseada num livro de autor desconhecido. Terra de sonhos e acaso narra a jornada de Ismael por esse território primitivo, que atrai seus personagens para um vórtice impiedoso. A obra é um mergulho na genealogia do interior do país, que se serve de seus terrores e mitos sertanejos para apresentar uma história verdadeiramente brasileira..',
        dataLancamento: '11/02/2019',
        qtdPagina: 305,
        precoLivro: 18.00,
        imagemLivro: 'Imagens_Livros/livro6.png'
      }
    ];
  }

  livrosMaisVendidos(): Livro[] {
    return [
      {
        idLivro: 7,
        tituloLivro: '1984',
        autorLivro: 'George Orwell',
        genero: 'Ficção',
        descricao: '"O passado fora anulado, o ato da anulação fora esquecido, a mentira se tornara verdade". Em um futuro próximo, um único soberano governa o estado totalitário da Oceania: o Grande Irmão. Embora nunca tenha sido visto, ninguém escapa à vigilância asfixiante do olho que tudo vê, ao poder da Polícia do Pensamento ou às imposições do Ministério da Verdade. Nada, entretanto, é aparentemente proibido, pois vigora uma única regra: rejeitar as provas materiais que seus olhos e ouvidos oferecem... ',
        dataLancamento: '08/06/1949',
        qtdPagina: 336,
        precoLivro: 19.00,
        imagemLivro: 'Imagens_Livros/livro9.jpg'
      },
      {
        idLivro: 8,
        tituloLivro: 'Diário de Um Banana',
        autorLivro: 'Jeff Kinney',
        genero: 'Comédia',
        descricao: 'Greg Heffley é um garoto magricela, mas ambicioso, com uma imaginação ativa ele quer ser rico e famoso, mas antes disso precisa sobreviver ao ensino fundamental. Ao detalhar tudo em seu diário, Greg aprende a valorizar suas amizades e aventuras e a satisfação de defender o correto.',
        dataLancamento: '19/05/2008',
        qtdPagina: 224,
        precoLivro: 48.79,
        imagemLivro: 'Imagens_Livros/livro10.jpg'
      },
      {
        idLivro: 9,
        tituloLivro: 'Coraline',
        autorLivro: 'Neil Gaiman',
        genero: 'Terror',
        descricao: 'Certas portas não devem ser abertas. E Coraline descobre isso pouco tempo depois de chegar com os pais à sua nova casa, um apartamento em um casarão antigo ocupado por vizinhos excêntricos e envolto por uma névoa insistente, um mundo de estranhezas e magia, o tipo de universo que apenas Neil Gaiman pode criar...',
        dataLancamento: '01/01/2003',
        qtdPagina: 160,
        precoLivro: 50.10,
        imagemLivro: 'Imagens_Livros/livro20.png'
      },
      {
        idLivro: 10,
        tituloLivro: 'O Silencio Dos Inocentes',
        autorLivro: 'Thomas Harris',
        genero: 'Terror',
        descricao: 'Cinco mulheres são brutalmente assassinadas em diferentes localidades dos Estados Unidos. Para chegar até o sanguinário assassino, a jovem agente do FBI, Clarice Starling, entrevista o ardiloso psiquiatra Hannibal Lecter, cuja mente psicopata está perigosamente voltada para o crime. Ao seguir as pistas apontadas pelo dr. Lecter, Clarice envolve-se em uma teia mortífera surpreendente. O texto de Thomas Harris é arrepiante.',
        dataLancamento: '09/09/2019',
        qtdPagina: 360,
        precoLivro: 56.90,
        imagemLivro: 'Imagens_Livros/livro16.png'
      },
      {
        idLivro: 11,
        tituloLivro: 'Dracula',
        autorLivro: 'Bram Stoker',
        genero: 'Terror',
        descricao: 'A viagem de Jonathan Harker: O jovem advogado inglês Jonathan Harker viaja até a Transilvânia (Romênia) para ajudar o misterioso Conde Drácula a fechar a compra de propriedades em Londres. Ao chegar ao castelo, Jonathan percebe que é um prisioneiro de uma criatura imortal e sobrenatural, conseguindo escapar com vida de volta à Inglaterra..',
        dataLancamento: '06/11/2025',
        qtdPagina: 448,
        precoLivro: 33.90,
        imagemLivro: 'Imagens_Livros/livro17.png'
      },
      {
        idLivro: 12,
        tituloLivro: 'A Incendiaria',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'Andy e Vicky eram apenas universitários precisando de renda extra quando se voluntariaram para um experimento científico de uma organização governamental clandestina conhecida como “a Oficina”. Jamais poderiam imaginar que esse dinheiro viria acompanhado de estranhos poderes psíquicos, que assumiriam efeitos ainda mais perigosos quando os dois se apaixonassem e tivessem uma filha, Charlie. Desde pequena, Charlie demonstra ter herdado forças incontroláveis que a definem como pirocinética, ou seja, capaz de criar fogo só com a mente. Agora, o governo está à caça da garotinha, tentando capturá-la para utilizar seu poder como arma militar. Acompanhada do pai, Charlie percorre o país em uma fuga desesperada, e percebe que talvez seu poder seja sua única chance de escapar..',
        dataLancamento: '06/04/2018',
        qtdPagina: 450,
        precoLivro: 89.73,
        imagemLivro: 'Imagens_Livros/livro15.png'
      }
    ];
  }

  livroRecentes(): Livro[] {
    return [
      {
        idLivro: 13,
        tituloLivro: 'O Livro Maldito',
        autorLivro: 'David Herick e Van R. Souza',
        genero: 'Terror',
        descricao: 'É uma coletânea com mais de 70 histórias curtas que misturam o sobrenatural e horrores reais cometidos por seres humanos. A proposta é trazer uma atmosfera de creepypastas clássicas de internet, indo de assombrações e entidades invisíveis até relatos sombrios sobre psicopatas e perturbações mentais....',
        dataLancamento: '30/06/2019',
        qtdPagina: 208,
        precoLivro: 28.92,
        imagemLivro: 'Imagens_Livros/livro8.png'
      },
      {
        idLivro: 14,
        tituloLivro: 'Template',
        autorLivro: 'John Doe',
        genero: 'Template',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.',
        dataLancamento: '05/05/2005',
        qtdPagina: 555,
        precoLivro: 55.55,
        imagemLivro: 'Imagens_Livros/livro25.png'
      },
      {
        idLivro: 15,
        tituloLivro: 'Template',
        autorLivro: 'John Doe',
        genero: 'Template',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.',
        dataLancamento: '05/05/2005',
        qtdPagina: 555,
        precoLivro: 55.55,
        imagemLivro: 'Imagens_Livros/livro26.png'
      },
      {
        idLivro: 16,
        tituloLivro: 'Template',
        autorLivro: 'John Doe',
        genero: 'Template',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.',
        dataLancamento: '05/05/2005',
        qtdPagina: 555,
        precoLivro: 55.55,
        imagemLivro: 'Imagens_Livros/livro30.png'
      },
      {
        idLivro: 17,
        tituloLivro: 'Template',
        autorLivro: 'John Doe',
        genero: 'Template',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.',
        dataLancamento: '05/05/2005',
        qtdPagina: 555,
        precoLivro: 55.55,
        imagemLivro: 'Imagens_Livros/livro28.png'
      },
      {
        idLivro: 18,
        tituloLivro: 'Template',
        autorLivro: 'John Doe',
        genero: 'Template',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.',
        dataLancamento: '05/05/2005',
        qtdPagina: 555,
        precoLivro: 55.55,
        imagemLivro: 'Imagens_Livros/livro29.png'
      }
    ];
  }

  livroStephen(): Livro[] {
    return [
      {
        idLivro: 19,
        tituloLivro: 'It: A Coisa',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'Um grupo de crianças se une para investigar o misterioso desaparecimento de vários jovens em sua cidade. Eles descobrem que o culpado é Pennywise, um palhaço cruel que se alimenta de seus medos e cuja violência teve origem há vários século',
        dataLancamento: '24/07/2014',
        qtdPagina: 1104,
        precoLivro: 97.35,
        imagemLivro: 'Imagens_Livros/livro11.png'
      },
      {
        idLivro: 20,
        tituloLivro: 'The Mist',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'Um homem cambaleou para dentro do mercado... Algo na névoa!, gritou ele Após uma tempestade de verão atípica, David Drayton, seu filho Billy e o vizinho Brent Norton se juntam a dezenas de outras pessoas e vão ao mercado local para reabastecer os suprimentos. Lá, ficam presos por uma estranha névoa que envolveu a cidade. Forças violentas, ocultas na névoa, começam a emergir. E há outra ameaça chocante vinda de dentro: um grupo de sobreviventes, liderado por um fanático religioso, exige um sacrifício. Agora, David e seu filho precisam tentar escapar. Mas o que está lá fora pode ser ainda mais perigoso. Esta emocionante novela explora o horror tanto do inimigo que você conhece quanto daquele que você só pode imaginar ',
        dataLancamento: '05/07/2018',
        qtdPagina: 176,
        precoLivro: 69.15,
        imagemLivro: 'Imagens_Livros/livro13.png'
      },
      {
        idLivro: 21,
        tituloLivro: 'O Cemitério',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'O livro que inspirou o filme O cemitério maldito. Louis Creed, um jovem médico de Chicago, acredita que encontrou seu lugar em uma pequena cidade do Maine. A boa casa, o trabalho na universidade e a felicidade da esposa e dos filhos lhe trazem a certeza de que fez a melhor escolha. Num dos primeiros passeios pela região, conhecem um cemitério no bosque próximo à sua casa. Ali, gerações de crianças enterraram seus animais de estimação. Mas, para além dos pequenos túmulos, há um outro cemitério. Uma terra maligna que atrai pessoas com promessas sedutoras. Um universo dominado por forças estranhas capazes de tornar real o que sempre pareceu impossível. A princípio, Louis Creed se diverte com as histórias fantasmagóricas do vizinho Crandall',
        dataLancamento: '24/04/2013',
        qtdPagina: 176,
        precoLivro: 78.38,
        imagemLivro: 'Imagens_Livros/livro19.png'
      },
      {
        idLivro: 22,
        tituloLivro: 'Misery',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'O livro que inspirou o filme O cemitério maldito. Louis Creed, um jovem médico de Chicago, acredita que encontrou seu lugar em uma pequena cidade do Maine. A boa casa, o trabalho na universidade e a felicidade da esposa e dos filhos lhe trazem a certeza de que fez a melhor escolha. Num dos primeiros passeios pela região, conhecem um cemitério no bosque próximo à sua casa. Ali, gerações de crianças enterraram seus animais de estimação. Mas, para além dos pequenos túmulos, há um outro cemitério. Uma terra maligna que atrai pessoas com promessas sedutoras. Um universo dominado por forças estranhas capazes de tornar real o que sempre pareceu impossível. A princípio, Louis Creed se diverte com as histórias fantasmagóricas do vizinho Crandall',
        dataLancamento: '22/04/2014',
        qtdPagina: 328,
        precoLivro: 65.07,
        imagemLivro: 'Imagens_Livros/livro14.png'
      },
      {
        idLivro: 23,
        tituloLivro: 'Mr. Mercedes',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'Ainda é madrugada e, em uma falida cidade do Meio-Oeste dos Estados Unidos, centenas de pessoas fazem fila em uma feira de empregos, desesperadas para conseguir trabalho. De repente, um único carro surge, avançando para a multidão. O motorista do Mercedes acelera, recua, acelera novamente e não descansa até atropelar o máximo de pessoas que consegue, deixando oito mortos e vários feridos. Ele escapa impune. Meses depois, ao receber uma carta de alguém que se autodenomina o Assassino do Mercedes, o ex-detetive Bill Hodges desperta de sua aposentadoria deprimida e resolve encontrar o culpado por conta própria. E assim segue a narrativa policial brilhante de Mr. Mercedes , em que Stephen King pega na mão do leitor e o conduz tanto pelo psicológico angustiado do detetive quanto pela mente obsessiva e traumatizada do assassino.',
        dataLancamento: '03/03/2016',
        qtdPagina: 328,
        precoLivro: 73.00,
        imagemLivro: 'Imagens_Livros/livro23.png'
      },
      {
        idLivro: 24,
        tituloLivro: 'Carrie',
        autorLivro: 'Stephen King',
        genero: 'Terror',
        descricao: 'Carrie White é uma adolescente tímida, solitária e oprimida pela mãe, cristã ferrenha que vê pecado em tudo. A rotina na escola não alivia o dia a dia em casa. Para os colegas e professores, ela é estranha, não se encaixa e, por consequência, é alvo constante de bullying. O que ninguém sabe ainda é que, por trás da aparência frágil e indefesa, Carrie esconde um enorme poder: ela consegue mover objetos com a mente. Trancar portas. Derrubar velas. Dom ou maldição, isso mudará para sempre o destino das pessoas que algum dia lhe fizeram mal.',
        dataLancamento: '23/02/2022',
        qtdPagina: 208,
        precoLivro: 74.07,
        imagemLivro: 'Imagens_Livros/livro23.png'
      }
    ];
  }
}
