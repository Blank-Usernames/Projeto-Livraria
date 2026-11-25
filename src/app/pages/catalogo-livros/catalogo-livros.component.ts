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
  constructor(private router: Router) { }
  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);
  private route = inject(ActivatedRoute);

  isLogado: boolean = false;
  modoAdmin: boolean = false;
  idUsuario: string | null = localStorage.getItem('userId');
  termoTitulo: string = '';
  termoAutor: string = '';
  generoSelecionado: string = 'Todos';
  precoSelecionado: string = 'Todos';
  termoGeral: string = '';
  paginaAtual: number = 1;
  paginaTerror: number = 1;
  paginaSuspense: number = 1;
  paginaRomance: number = 1;
  paginaFantasia: number = 1;
  paginaFiccao: number = 1;
  livrosPorPagina: number = 5;

  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosFiltrados: Livro[] = [];
  livrosTerror: Livro[] = [];
  livrosSuspense: Livro[] = [];
  livrosRomance: Livro[] = [];
  livrosFantasia: Livro[] = [];
  livrosFiccao: Livro[] = [];

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.livrosFiltrados = livros;
        this.separarPorGenero();
        this.filtrarLivros();
      },
    });

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      },
    });

    this.route.queryParamMap.subscribe(params => {
      this.termoGeral = params.get('busca') || '';
      this.filtrarLivros();
    });

    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  separarPorGenero() {
    this.livrosTerror = this.livros.filter(livro => livro.genero === 'Terror');
    this.livrosSuspense = this.livros.filter(livro => livro.genero === 'Suspense');
    this.livrosFantasia = this.livros.filter(livro => livro.genero === 'Fantasia');
    this.livrosRomance = this.livros.filter(livro => livro.genero === 'Romance');
    this.livrosFiccao = this.livros.filter(livro => livro.genero === 'Ficção');

    this.paginaTerror = 1;
    this.paginaSuspense = 1;
    this.paginaFantasia = 1;
    this.paginaRomance = 1;
    this.paginaFiccao = 1;

    this.atualizarTerror();
    this.atualizarSuspense();
    this.atualizarRomance();
    this.atualizarFiccao();
    this.atualizarFantasia();
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

  filtrarLivros(): void {
    this.livrosFiltrados = this.livros.filter(livro =>
      livro.tituloLivro.toLowerCase().includes(this.termoTitulo.toLowerCase()) &&
      livro.autorLivro.toLowerCase().includes(this.termoAutor.toLowerCase()) &&

      (this.generoSelecionado === 'Todos' ||
        livro.genero === this.generoSelecionado) &&

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
        this.termoGeral === '' ||
        livro.tituloLivro.toLowerCase().includes(this.termoGeral.toLowerCase()) ||
        livro.autorLivro.toLowerCase().includes(this.termoGeral.toLowerCase())
      )
    );
    this.paginaAtual = 1;
    this.atualizarPaginas();
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
      alert('Não foi possível identificar o usuário ou o livro.');
      return;
    }

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        const livroJaAdicionado = itens.some(item =>
          item.idUsuario === idUsuario &&
          item.codigoItem === codigoItem
        );

        if (livroJaAdicionado) {
          alert('Este livro já está no seu carrinho!');
          return;
        }

        const itemCarrinho: ItemCarrinho = {
          idUsuario: idUsuario,
          codigoItem: codigoItem,
          titulo: livro.tituloLivro,
          autor: livro.autorLivro,
          preco: Number(String(livro.precoLivro).replace(',', '.')),
          quantidade: 1,
          imagem: livro.imagemLivro
        };

        this.carrinhoService.incluir(itemCarrinho).subscribe({
          next: () => {
            alert(`Livro: ${livro.tituloLivro} adicionado ao carrinho!`);
          },
          error: () => {
            alert('Erro ao adicionar livro ao carrinho.');
          }
        });
      },
      error: () => {
        alert('Erro ao consultar o carrinho.');
      }
    });
  }

  // PAGINAÇÃO
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

  get livrosTerrorPaginados(): Livro[] {
    const inicio = (this.paginaTerror - 1) * this.livrosPorPagina;

    return this.livrosTerror.slice(inicio, inicio + this.livrosPorPagina);
  }

  get livrosSuspensePaginados(): Livro[] {
    const inicio = (this.paginaSuspense - 1) * this.livrosPorPagina;

    return this.livrosSuspense.slice(inicio, inicio + this.livrosPorPagina);
  }

  get livrosRomancePaginados(): Livro[] {
    const inicio = (this.paginaRomance - 1) * this.livrosPorPagina;

    return this.livrosRomance.slice(inicio, inicio + this.livrosPorPagina);
  }

  get livrosFiccaoPaginados(): Livro[] {
    const inicio = (this.paginaFiccao - 1) * this.livrosPorPagina;

    return this.livrosFiccao.slice(inicio, inicio + this.livrosPorPagina);
  }

  get livrosFantasiaPaginados(): Livro[] {
    const inicio = (this.paginaFantasia - 1) * this.livrosPorPagina;

    return this.livrosFantasia.slice(inicio, inicio + this.livrosPorPagina);
  }

  paginas: number[] = [];
  paginasTerror: number[] = [];
  paginasSuspense: number[] = [];
  paginasRomance: number[] = [];
  paginasFiccao: number[] = [];
  paginasFantasia: number[] = [];

  atualizarPaginas(): void {
    this.paginas = [];

    for (let i = 1; i <= this.totalPaginas; i++) {
      this.paginas.push(i);
    }
  }

  atualizarTerror(): void {
    this.paginasTerror = [];

    const total = Math.ceil(this.livrosTerror.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasTerror.push(i);
    }
  }

  atualizarSuspense(): void {
    this.paginasSuspense = [];

    const total = Math.ceil(this.livrosSuspense.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasSuspense.push(i);
    }
  }

  atualizarRomance(): void {
    this.paginasRomance = [];

    const total = Math.ceil(this.livrosRomance.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasRomance.push(i);
    }
  }

  atualizarFiccao(): void {
    this.paginasFiccao = [];

    const total = Math.ceil(this.livrosFiccao.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasFiccao.push(i);
    }
  }

  atualizarFantasia(): void {
    this.paginasFantasia = [];

    const total = Math.ceil(this.livrosFantasia.length / this.livrosPorPagina);

    for (let i = 1; i <= total; i++) {
      this.paginasFantasia.push(i);
    }
  }

  mudarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

}
