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
  livrosPorPagina: number = 15;

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
          preco: Number(String(livro.precoLivro).replace(',', '.')),
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

}
