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
  constructor(private router: Router) { }
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  idUsuario: string | null = localStorage.getItem('userId');

  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);

  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosDestaque: Livro[] = [];
  livrosLancamento: Livro[] = [];
  bestSelling: Livro[] = [];
  livrosAutor: Livro[] = [];

  paginaAtual: number = 1;
  paginaDestaque: number = 1;
  paginaLancamento: number = 1;
  paginaSelling: number = 1;
  paginaAutor: number = 1;
  livrosPorPagina: number = 5;

  autorSelecionado: string = '';

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.separarPorAutor();
        this.livrosAleatorios(this.livrosDestaque);
        this.livrosAleatorios(this.livrosLancamento);
        this.livrosAleatorios(this.bestSelling);

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

  separarPorAutor() {
    if (this.livros.length === 0) {
      return;
    }

    const livroAleatorio = this.livros[Math.floor(Math.random() * this.livros.length)];

    this.autorSelecionado = livroAleatorio.autorLivro;

    this.livrosAutor = this.livros.filter(
      livro => livro.autorLivro === this.autorSelecionado
    );

    this.paginaAutor = 1;

    this.atualizarAutor();
  }

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

  livroSelecionado: Livro | null = null;

  abrirModal(livro: Livro) {
    this.livroSelecionado = livro;
  }

  fecharModal() {
    this.livroSelecionado = null;
  }

  adicionarCarrinho(livro: Livro) {
    const isLogado = localStorage.getItem('usuarioLogado') === 'true';

    if (!isLogado) {
      this.router.navigate(['/cadastro-usuario']);
      return;
    }

    const idUsuario = this.idUsuario;
    const codigoItem = livro.id;

    if (!idUsuario || !codigoItem) {
      this.mostrarPopup('Não foi possível identificar o usuário ou o livro.', 'erro');
      return;
    }

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        const livroJaAdicionado = itens.some(item =>
          item.idUsuario === idUsuario &&
          item.codigoItem === codigoItem
        );

        if (livroJaAdicionado) {
          this.mostrarPopup('Este livro já está no seu carrinho!', 'aviso');
          return;
        }

        const itemCarrinho: ItemCarrinho = {
          idUsuario: idUsuario,
          codigoItem: codigoItem,
          titulo: livro.tituloLivro,
          autor: livro.autorLivro,
          preco: livro.precoLivro,
          quantidade: 1,
          imagem: livro.imagemLivro
        };

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

  mensagemPopup = '';
  tipoPopup = '';

  mostrarPopup(mensagem: string, tipo: string = 'sucesso') {
    this.mensagemPopup = mensagem;
    this.tipoPopup = tipo;

    setTimeout(() => {
      this.mensagemPopup = '';
    }, 3000);
  }

  // PAGINAÇÃO
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

  paginasDestaque: number[] = [];
  paginasLancamento: number[] = [];
  paginasSelling: number[] = [];
  paginasAutor: number[] = [];

  atualizarDestaque(): void {
    this.paginasDestaque = [];

    const total = Math.ceil(this.livrosDestaque.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasDestaque.push(i);
    }
  }

  atualizarLancamento(): void {
    this.paginasLancamento = [];

    const total = Math.ceil(this.livrosLancamento.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasLancamento.push(i);
    }
  }

  atualizarSelling(): void {
    this.paginasSelling = [];

    const total = Math.ceil(this.bestSelling.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasSelling.push(i);
    }
  }

  atualizarAutor(): void {
    this.paginasAutor = [];

    const total = Math.ceil(this.livrosAutor.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasAutor.push(i);
    }
  }


}