import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';
import { Livro } from '../../models/Livro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalogo-livros',
  imports: [RouterLink, FormsModule],
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

  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosFiltrados: Livro[] = [];
  livrosTerror: Livro[] = [];
  livrosSuspense: Livro[] = [];
  livrosRomance: Livro[] = [];

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
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
        Number(String(livro.precoLivro).replace(',', '.')) <= 30) ||
      (this.precoSelecionado === 'R$30,00 - R$120,00' &&
        Number(String(livro.precoLivro).replace(',', '.')) > 30 &&
        Number(String(livro.precoLivro).replace(',', '.')) <= 120) ||
      (this.precoSelecionado === 'Acima de R$120,00' &&
        Number(String(livro.precoLivro).replace(',', '.')) > 120)
    ) &&
    (
      this.termoGeral === '' ||
      livro.tituloLivro.toLowerCase().includes(this.termoGeral.toLowerCase()) ||
      livro.autorLivro.toLowerCase().includes(this.termoGeral.toLowerCase())
    )
  );
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
}
