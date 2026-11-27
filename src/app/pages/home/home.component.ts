import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // SERVIÇOS
  constructor(private router: Router) { }
  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);

  // ESTRUTURAS DE DADOS
  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosDestaque: Livro[] = [];
  livrosLancamento: Livro[] = [];
  bestSelling: Livro[] = [];
  livrosAutor: Livro[] = [];

  autorSelecionado: string = '';

  // CARREGAMENTOS
  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;

        // CARREGAR LISTAS DE CADA SEÇÃO
        this.separarPorAutor();
        this.livrosAleatorios(this.livrosDestaque);
        this.livrosAleatorios(this.livrosLancamento);
        this.livrosAleatorios(this.bestSelling);

        // ATUALIZAR PÁGINAS
        this.atualizarDestaque();
        this.atualizarLancamento();
        this.atualizarSelling();

        if (sessionStorage.getItem('avisoAdmin') === 'true') {
          this.mostrarPopup('Você entrou no modo administrador!', 'admin');
          sessionStorage.removeItem('avisoAdmin');
        }
      },
    });

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      },
    });

    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  // VARIÁVEIS [CONTROLE DE SESSÃO]
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  idUsuario: string | null = localStorage.getItem('userId');

  separarPorAutor() {
    // ANTI-UNDEFINED
    if (this.livros.length === 0) {
      return;
    }

    // ESCOLHER LIVRO ALEATÓRIO
    const livroAleatorio = this.livros[Math.floor(Math.random() * this.livros.length)];

    // AUTOR DO LIVRO
    this.autorSelecionado = livroAleatorio.autorLivro;

    // FILTRAR POR AUTOR
    this.livrosAutor = this.livros.filter(
      livro => livro.autorLivro === this.autorSelecionado
    );

    // ATUALIZAR PÁGINAÇÃO
    this.paginaAutor = 1;
    this.atualizarAutor();
  }

  // FISHER-YATES [ESTRUTURA ORDENADA | ESTRUTURA RANDOMIZADA]
  livrosAleatorios(sequenciaLivro: Livro[]) {
    sequenciaLivro.length = 0;

    const livrosEmbaralhados = this.livros;

    for (let i = livrosEmbaralhados.length - 1; i > 0; i--) {
      const indiceAleatorio = Math.floor(Math.random() * (i + 1));

      [livrosEmbaralhados[i], livrosEmbaralhados[indiceAleatorio]] = [livrosEmbaralhados[indiceAleatorio], livrosEmbaralhados[i]];
    }

    for (let i = 0; i < livrosEmbaralhados.length; i++) {
      sequenciaLivro.push(livrosEmbaralhados[i]);
    }
  }

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
  paginaAtual: number = 1;
  paginaDestaque: number = 1;
  paginaLancamento: number = 1;
  paginaSelling: number = 1;
  paginaAutor: number = 1;
  livrosPorPagina: number = 5;

  // SISTEMAS DE PAGINAÇÃO
  get destaquesPaginados(): Livro[] {
    const inicio = (this.paginaDestaque - 1) * this.livrosPorPagina;

    return this.livrosDestaque.slice(inicio, inicio + this.livrosPorPagina);
  }

  get lancamentosPaginados(): Livro[] {
    const inicio = (this.paginaLancamento - 1) * this.livrosPorPagina;

    return this.livrosLancamento.slice(inicio, inicio + this.livrosPorPagina);
  }

  get bestSellingPaginados(): Livro[] {
    const inicio = (this.paginaSelling - 1) * this.livrosPorPagina;

    return this.bestSelling.slice(inicio, inicio + this.livrosPorPagina);
  }

  get livrosAutorPaginados(): Livro[] {
    const inicio = (this.paginaAutor - 1) * this.livrosPorPagina;

    return this.livrosAutor.slice(inicio, inicio + this.livrosPorPagina);
  }

  // ESTRUTURAS DE PAGINAÇÃO
  paginasDestaque: number[] = [];
  paginasLancamento: number[] = [];
  paginasSelling: number[] = [];
  paginasAutor: number[] = [];

  // ATUALIZAÇÃO DE PÁGINAS
  atualizarDestaque(): void {
    this.paginasDestaque = [];

    const total = Math.ceil(this.livrosDestaque.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasDestaque.push(i);
    }
  }

  // ATUALIZAÇÃO DE PÁGINAS
  atualizarLancamento(): void {
    this.paginasLancamento = [];

    const total = Math.ceil(this.livrosLancamento.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasLancamento.push(i);
    }
  }

  // ATUALIZAÇÃO DE PÁGINAS
  atualizarSelling(): void {
    this.paginasSelling = [];

    const total = Math.ceil(this.bestSelling.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasSelling.push(i);
    }
  }

  // ATUALIZAÇÃO DE PÁGINAS
  atualizarAutor(): void {
    this.paginasAutor = [];

    const total = Math.ceil(this.livrosAutor.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasAutor.push(i);
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