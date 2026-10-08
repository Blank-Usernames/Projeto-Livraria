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
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
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
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
    },

    {
      titulo: 'Template',
      autor: 'John Doe',
      preco: 'R$ 00,00',
      imagem: 'Imagens_Livros/template.png',
      descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus consectetur aperiam distinctio omnis error officiis voluptatem neque accusantium! Laboriosam ducimus id maxime perspiciatis suscipit earum exercitationem, iure sapiente illum. Eum?Laudantium nesciunt, ad, unde hic doloremque debitis distinctio nulla quo ab molestias facere consequatur ea dignissimos! Dolorem iste et harum expedita repudiandae repellendus laboriosam odio impedit, unde non ratione quaerat.'
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