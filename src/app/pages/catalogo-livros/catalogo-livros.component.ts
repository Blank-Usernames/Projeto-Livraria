import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';
import { Livro } from '../../models/Livro';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-catalogo-livros',
  imports: [RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './catalogo-livros.component.html',
  styleUrl: './catalogo-livros.component.css'
})
export class CatalogoLivrosComponent implements OnInit {

  // SERVIÇOS
  constructor(private router: Router) { }
  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);
  private route = inject(ActivatedRoute);

  // ESTRUTURAS DE DADOS
  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosFiltrados: Livro[] = [];
  livrosTerror: Livro[] = [];
  livrosSuspense: Livro[] = [];
  livrosRomance: Livro[] = [];
  livrosFantasia: Livro[] = [];
  livrosFiccao: Livro[] = [];

  // CARREGAMENTOS
  ngOnInit(): void {
    // MENSAGEM DE BOAS VINDAS
    if (sessionStorage.getItem('avisoUsuario') === 'true') {
      this.mostrarPopup("Bem-vindo!", 'sucesso');
      sessionStorage.removeItem('avisoUsuario');
    }

    // CARREGAR DADOS [LIVRO]
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.livrosFiltrados = livros;
        this.filtrarLivros();
      },
    });

    // CARREGAR DADOS [CARRINHO]
    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      },
    });

    // PARÂMETRO DA BARRA DE PESQUISA
    this.route.queryParamMap.subscribe(params => {
      this.termoGeral = params.get('busca') || '';
      this.filtrarLivros();
    });

    // CONTROLE DE LOGIN
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  // VARIÁVEIS [CONTROLE DE SESSÃO]
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  idUsuario: string | null = localStorage.getItem('userId');

  // VARIÁVEIS [MODAL - LIVROS]
  livroSelecionado: Livro | null = null;

  // CONTROLE [MODAL - LIVROS]
  abrirModal(livro: Livro) {
    this.livroSelecionado = livro;
  }

  // CONTROLE [MODAL - LIVROS]
  fecharModal() {
    this.livroSelecionado = null;
  }

  // VARIÁVEIS [FILTRO]
  termoTitulo: string = '';
  termoAutor: string = '';
  generoSelecionado: string = 'Todos';
  precoSelecionado: string = 'Todos';
  termoGeral: string = '';

  // FILTRO DE LIVROS
  filtrarLivros(): void {
    // CÓPIA DA LISTA
    this.livrosFiltrados = this.livros.filter(livro =>

      // FILTRO [INPUT - TÍTULO]
      livro.tituloLivro.toLowerCase().includes(this.termoTitulo.toLowerCase()) &&

      // FILTRO [INPUT - AUTOR]
      livro.autorLivro.toLowerCase().includes(this.termoAutor.toLowerCase()) &&

      // FILTRO [OPTION - GÊNERO]
      (this.generoSelecionado === 'Todos' ||
        livro.genero === this.generoSelecionado) &&

      // FILTRO [OPTION - PREÇO] 
      (
        this.precoSelecionado === 'Todos' ||
        (this.precoSelecionado === 'Até R$30,00' &&
          livro.precoLivro <= 30) ||
        (this.precoSelecionado === 'R$30,00 - R$120,00' &&
          livro.precoLivro > 30 &&
          livro.precoLivro <= 120) ||
        (this.precoSelecionado === 'Acima de R$120,00' &&
          livro.precoLivro > 120)
      ) &&
      (
        // SEM FILTRO
        this.termoGeral === '' ||
        livro.tituloLivro.toLowerCase().includes(this.termoGeral.toLowerCase()) ||
        livro.autorLivro.toLowerCase().includes(this.termoGeral.toLowerCase())
      )
    );

    // ATUALIZAR PÁGINA COM LISTA FILTRADA
    this.paginaAtual = 1;
    this.atualizarPaginas();
  }

  // ADICIONAR LIVRO AO CARRINHO
  adicionarCarrinho(livro: Livro) {
    // VERIFICAÇÃO LOGIN
    const isLogado = localStorage.getItem('usuarioLogado') === 'true';

    // REDIRECIONAR PARA LOGIN/CADASTRO
    if (!isLogado) {
      this.router.navigate(['/cadastro-usuario']);
      return;
    }

    // VARIÁVEIS [ANTI-UNDEFINED]
    const idUsuario = this.idUsuario;
    const codigoItem = livro.id;

    // ANTI-UNDEFINED
    if (!idUsuario || !codigoItem) {
      this.mostrarPopup('Não foi possível identificar o usuário ou o livro.', 'erro');
      return;
    }

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        // VERIFICAÇÃO DE LIVRO JÁ EXISTENTE [BOOLEANO]
        const livroJaAdicionado = itens.some(item =>
          item.idUsuario === idUsuario &&
          item.codigoItem === codigoItem
        );

        // IMPEDIR ENVIO DO JSON
        if (livroJaAdicionado) {
          this.mostrarPopup('Este livro já está no seu carrinho!', 'aviso');
          return;
        }

        // OBJETO JSON [CARRINHO]
        const itemCarrinho: ItemCarrinho = {
          idUsuario: idUsuario,
          codigoItem: codigoItem,
          titulo: livro.tituloLivro,
          autor: livro.autorLivro,
          preco: Number(String(livro.precoLivro).replace(',', '.')),
          quantidade: 1,
          imagem: livro.imagemLivro
        };

        // ENVIO JSON [CARRINHO]
        this.carrinhoService.incluir(itemCarrinho).subscribe({
          next: () => {
            this.mostrarPopup(`Livro: ${livro.tituloLivro} adicionado ao carrinho!`);
          },
          error: () => {
            this.mostrarPopup('Erro ao adicionar livro ao carrinho.', 'erro');
          }
        });
      },
      error: () => {
        this.mostrarPopup('Erro ao adicionar livro.', 'erro');
      }
    });
  }

  // VARIÁVEIS [PAGINAÇÃO]
  livrosPorPagina: number = 15;
  paginaAtual: number = 1;

  // SISTEMA DE PAGINAÇÃO
  get livrosPaginados(): Livro[] {
    const inicio = (this.paginaAtual - 1) * this.livrosPorPagina;

    return this.livrosFiltrados.slice(
      inicio,
      inicio + this.livrosPorPagina
    );
  }

  get totalPaginas(): number {
    return Math.ceil(this.livrosFiltrados.length / this.livrosPorPagina);
  }

  paginas: number[] = [];

  atualizarPaginas(): void {
    this.paginas = [];

    for (let i = 1; i <= this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  // VARIÁVEIS [POP-UP]
  mensagemPopup = '';
  tipoPopup = '';

  // POP-UP
  mostrarPopup(mensagem: string, tipo: string = 'sucesso') {
    this.mensagemPopup = mensagem;
    this.tipoPopup = tipo;

    setTimeout(() => {
      this.mensagemPopup = '';
    }, 3000);
  }
}
