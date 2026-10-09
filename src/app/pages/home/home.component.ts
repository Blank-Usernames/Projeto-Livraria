import { Component } from '@angular/core';
import { Router } from '@angular/router';


interface Livro {
  titulo: string;
  autor: string;
  preco: string;
  imagem: string;
  descricao: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }
  isLogado: boolean = false;

  livroDestaques: Livro[] = [
    {
      titulo: 'Pânico',
      autor: 'Padraic Maroney',
      preco: 'R$ 49,90',
      imagem: 'Imagens_Livros/livro2.png',
      descricao: 'Após anos de silêncio, Ghostface está de volta a Woodsboro, mas desta vez seus crimes parecem estar ligados a um segredo do passado que ninguém deveria descobrir. Enquanto um novo grupo de jovens tenta sobreviver aos ataques, eles percebem que o assassino conhece cada passo deles — e que, para escapar, precisarão descobrir quem está por trás da máscara antes do último grito.'
    },
    {
      titulo: 'O Exorcista',
      autor: 'William Peter Blatty',
      preco: 'R$ 60,00',
      imagem: 'Imagens_Livros/livro7.png',
      descricao: 'Quando uma jovem começa a apresentar comportamentos inexplicáveis e cada vez mais assustadores, sua família busca respostas onde a ciência não consegue chegar. Diante de uma força sobrenatural que parece dominar seu corpo e sua mente, um padre é chamado para enfrentar uma presença demoníaca determinada a não partir sem deixar sua marca..'
    },

    {
      titulo: 'Nosferatu - Saga DarkSide',
      autor: 'Bram Stoke',
      preco: 'R$ 50,00',
      imagem: 'Imagens_Livros/livro5.png',
      descricao: 'Uma antiga presença retorna das sombras trazendo consigo uma maldição que atravessa gerações. Em uma cidade mergulhada em medo e mistério, uma série de acontecimentos inexplicáveis leva os moradores a descobrir que o verdadeiro perigo pode estar mais próximo do que imaginam..'
    },
    {
      titulo: 'Histórias de Terror',
      autor: 'Usborne',
      preco: 'R$ 35,00',
      imagem: 'Imagens_Livros/livro3.png',
      descricao: 'Prepare-se para mergulhar em um mundo repleto de mistérios, criaturas assustadoras e acontecimentos sobrenaturais. Entre casas mal-assombradas, fantasmas misteriosos e encontros arrepiantes, cada história revela um novo pesadelo capaz de despertar a imaginação e desafiar até os leitores mais corajosos.'
    },
    {
      titulo: 'A Maldição da Residência Hill',
      autor: 'Shirley Jackson',
      preco: 'R$ 60,00',
      imagem: 'Imagens_Livros/livro4.png',
      descricao: 'Entre o passado e o presente, uma família abalada confronta memórias assustadoras de seu antigo lar e dos eventos aterrorizantes que os expulsaram de lá..'
    },
    {
      titulo: 'Terras de Sonhos e Acasos',
      autor: 'Filipe de Campos Ribeiro',
      preco: 'R$ 30,00',
      imagem: 'Imagens_Livros/livro6.png',
      descricao: 'Após a morte dos pais, Ismael volta ao interior de São Paulo para reaver sua herança. Inundada por uma tempestade e isolada do mundo a pequena cidade de Rio das Almas está sob intervenção militar. Seus habitantes, acuados por estranhos crimes, professam uma inquietante religiosidade baseada num livro de autor desconhecido. Terra de sonhos e acaso narra a jornada de Ismael por esse território primitivo, que atrai seus personagens para um vórtice impiedoso. A obra é um mergulho na genealogia do interior do país, que se serve de seus terrores e mitos sertanejos para apresentar uma história verdadeiramente brasileira..'
    }
  ];
  maisVendidos: Livro[] = [

    {
      titulo: '1984',
      autor: 'George Orwell',
      preco: 'R$ 34,90',
      imagem: 'Imagens_Livros/livro9.jpg',
      descricao: '"O passado fora anulado, o ato da anulação fora esquecido, a mentira se tornara verdade". Em um futuro próximo, um único soberano governa o estado totalitário da Oceania: o Grande Irmão. Embora nunca tenha sido visto, ninguém escapa à vigilância asfixiante do olho que tudo vê, ao poder da Polícia do Pensamento ou às imposições do Ministério da Verdade. Nada, entretanto, é aparentemente proibido, pois vigora uma única regra: rejeitar as provas materiais que seus olhos e ouvidos oferecem... '
    },

    {
      titulo: 'Diário de Um Banana',
      autor: 'Jeff Kinney',
      preco: 'R$ 48,79',
      imagem: 'Imagens_Livros/livro10.jpg',
      descricao: 'Greg Heffley é um garoto magricela, mas ambicioso, com uma imaginação ativa ele quer ser rico e famoso, mas antes disso precisa sobreviver ao ensino fundamental. Ao detalhar tudo em seu diário, Greg aprende a valorizar suas amizades e aventuras e a satisfação de defender o correto.'
    },

    {
      titulo: 'Coraline',
      autor: 'Neil Gaiman',
      preco: 'R$ 80,00',
      imagem: 'Imagens_Livros/livro20.png',
      descricao: 'Certas portas não devem ser abertas. E Coraline descobre isso pouco tempo depois de chegar com os pais à sua nova casa, um apartamento em um casarão antigo ocupado por vizinhos excêntricos e envolto por uma névoa insistente, um mundo de estranhezas e magia, o tipo de universo que apenas Neil Gaiman pode criar...'
    },

    {
      titulo: 'O Silencio Dos Inocentes',
      autor: 'Thomas Harris',
      preco: 'R$ 46,00',
      imagem: 'Imagens_Livros/livro16.png',
      descricao: 'Cinco mulheres são brutalmente assassinadas em diferentes localidades dos Estados Unidos. Para chegar até o sanguinário assassino, a jovem agente do FBI, Clarice Starling, entrevista o ardiloso psiquiatra Hannibal Lecter, cuja mente psicopata está perigosamente voltada para o crime. Ao seguir as pistas apontadas pelo dr. Lecter, Clarice envolve-se em uma teia mortífera surpreendente. O texto de Thomas Harris é arrepiante.'
    },

    {
      titulo: 'Dracula',
      autor: 'Dracula',
      preco: 'R$ 69,00',
      imagem: 'Imagens_Livros/livro17.png',
      descricao: 'A viagem de Jonathan Harker: O jovem advogado inglês Jonathan Harker viaja até a Transilvânia (Romênia) para ajudar o misterioso Conde Drácula a fechar a compra de propriedades em Londres. Ao chegar ao castelo, Jonathan percebe que é um prisioneiro de uma criatura imortal e sobrenatural, conseguindo escapar com vida de volta à Inglaterra..'
    },

    {
      titulo: 'A Incendiaria',
      autor: 'Stephen King',
      preco: 'R$ 45,00',
      imagem: 'Imagens_Livros/livro15.png',
      descricao: 'Andy e Vicky eram apenas universitários precisando de renda extra quando se voluntariaram para um experimento científico de uma organização governamental clandestina conhecida como “a Oficina”. Jamais poderiam imaginar que esse dinheiro viria acompanhado de estranhos poderes psíquicos, que assumiriam efeitos ainda mais perigosos quando os dois se apaixonassem e tivessem uma filha, Charlie. Desde pequena, Charlie demonstra ter herdado forças incontroláveis que a definem como pirocinética, ou seja, capaz de criar fogo só com a mente. Agora, o governo está à caça da garotinha, tentando capturá-la para utilizar seu poder como arma militar. Acompanhada do pai, Charlie percorre o país em uma fuga desesperada, e percebe que talvez seu poder seja sua única chance de escapar..'
    }
  ];

  livroRecentes: Livro[] = [
    {
      titulo: 'O Livro Maldito',
      autor: 'David Herick e Van R. Souza',
      preco: 'R$ 35,90',
      imagem: 'Imagens_Livros/livro8.png',
      descricao: 'É uma coletânea com mais de 70 histórias curtas que misturam o sobrenatural e horrores reais cometidos por seres humanos. A proposta é trazer uma atmosfera de creepypastas clássicas de internet, indo de assombrações e entidades invisíveis até relatos sombrios sobre psicopatas e perturbações mentais....'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 60,00',
      imagem: 'Imagens_Livros/livro25.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 70,00',
      imagem: 'Imagens_Livros/livro26.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 65,00',
      imagem: 'Imagens_Livros/livro30.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 55,00',
      imagem: 'Imagens_Livros/livro28.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 37,00',
      imagem: 'Imagens_Livros/livro29.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    }
  ]

  stephen:Livro[]= [
    {
      titulo:'IT A COISA',
      autor:'Stephen King',
      preco:'56,90',
      imagem:'Imagens_Livros/livro11.png',
      descricao:'Um grupo de crianças se une para investigar o misterioso desaparecimento de vários jovens em sua cidade. Eles descobrem que o culpado é Pennywise, um palhaço cruel que se alimenta de seus medos e cuja violência teve origem há vários século'
    },
    {
      titulo:'The Mist',
      autor:'Stephen King',
      preco:'54,90',
      imagem:'Imagens_Livros/livro13.png',
      descricao:'Um homem cambaleou para dentro do mercado... Algo na névoa!, gritou ele Após uma tempestade de verão atípica, David Drayton, seu filho Billy e o vizinho Brent Norton se juntam a dezenas de outras pessoas e vão ao mercado local para reabastecer os suprimentos. Lá, ficam presos por uma estranha névoa que envolveu a cidade. Forças violentas, ocultas na névoa, começam a emergir. E há outra ameaça chocante vinda de dentro: um grupo de sobreviventes, liderado por um fanático religioso, exige um sacrifício. Agora, David e seu filho precisam tentar escapar. Mas o que está lá fora pode ser ainda mais perigoso. Esta emocionante novela explora o horror tanto do inimigo que você conhece quanto daquele que você só pode imaginar '
    },
    {
      titulo:'O CEMITÉRIO',
      autor:'Stephen King',
      preco:'70,90',
      imagem:'Imagens_Livros/livro19.png',
      descricao:'O livro que inspirou o filme O cemitério maldito. Louis Creed, um jovem médico de Chicago, acredita que encontrou seu lugar em uma pequena cidade do Maine. A boa casa, o trabalho na universidade e a felicidade da esposa e dos filhos lhe trazem a certeza de que fez a melhor escolha. Num dos primeiros passeios pela região, conhecem um cemitério no bosque próximo à sua casa. Ali, gerações de crianças enterraram seus animais de estimação. Mas, para além dos pequenos túmulos, há um outro cemitério. Uma terra maligna que atrai pessoas com promessas sedutoras. Um universo dominado por forças estranhas capazes de tornar real o que sempre pareceu impossível. A princípio, Louis Creed se diverte com as histórias fantasmagóricas do vizinho Crandall'
    },
    {
      titulo:'MISERY',
      autor:'Stephen King',
      preco:'60,90',
      imagem:'Imagens_Livros/livro14.png',
      descricao:'Paul Sheldon é um escritor famoso, reconhecido por uma série de best-sellers protagonizados pela mesma personagem: Misery Chastain. Annie Wilkes é uma enfermeira aposentada, leitora voraz e obcecada pela história de Misery. Quando Paul sofre um acidente de carro em uma nevasca, ele é resgatado justamente por Annie, e esse encontro entre fã e autor é o ponto de partida de uma das tramas mais aterrorizantes de Stephen King. Insatisfeita com o final do último livro da série, a fã isola o autor debilitado em um quarto em sua casa. Com torturas, ameaças e uma vigilância persistente, ela faz de tudo para obrigá-lo a reescrever a narrativa com o final que ela considera apropriado. Considerada uma das vilãs mais assustadoras e complexas do universo King e interpretada por Kathy Bates no filme que se tornou um clássico, Annie Wilkes é a figura que faz de Misery um livro essencial.'
    },
    {
      titulo:'MR mercedes',
      autor:'Stephen King',
      preco:'66,50',
      imagem:'Imagens_Livros/livro23.png',
      descricao:'Ainda é madrugada e, em uma falida cidade do Meio-Oeste dos Estados Unidos, centenas de pessoas fazem fila em uma feira de empregos, desesperadas para conseguir trabalho. De repente, um único carro surge, avançando para a multidão. O motorista do Mercedes acelera, recua, acelera novamente e não descansa até atropelar o máximo de pessoas que consegue, deixando oito mortos e vários feridos. Ele escapa impune. Meses depois, ao receber uma carta de alguém que se autodenomina o Assassino do Mercedes, o ex-detetive Bill Hodges desperta de sua aposentadoria deprimida e resolve encontrar o culpado por conta própria. E assim segue a narrativa policial brilhante de Mr. Mercedes , em que Stephen King pega na mão do leitor e o conduz tanto pelo psicológico angustiado do detetive quanto pela mente obsessiva e traumatizada do assassino.'
    },
    {
      titulo:'CARRIE',
      autor:'Stephen King',
      preco:'60,90',
      imagem:'Imagens_Livros/livro24.png',
      descricao:'Carrie White é uma adolescente tímida, solitária e oprimida pela mãe, cristã ferrenha que vê pecado em tudo. A rotina na escola não alivia o dia a dia em casa. Para os colegas e professores, ela é estranha, não se encaixa e, por consequência, é alvo constante de bullying. O que ninguém sabe ainda é que, por trás da aparência frágil e indefesa, Carrie esconde um enorme poder: ela consegue mover objetos com a mente. Trancar portas. Derrubar velas. Dom ou maldição, isso mudará para sempre o destino das pessoas que algum dia lhe fizeram mal.'
    }

  ]

  

  ngOnInit() {
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
  }

  goToCadastroLivros() {
    this.router.navigate(['/cadastro-livros']);
  }

  livroSelecionado: Livro | null = null;

  abrirModal(livro: Livro) {
    this.livroSelecionado = livro;
  }

  fecharModal() {
    this.livroSelecionado = null;
  }

  adicionarCarrinho(event: Event, livro: Livro) {
    event.stopPropagation();
    alert(`${livro.titulo} adicionado ao carrinho! (ainda não funcional)`);
  }
}