import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-catalogo-livros',
  imports: [RouterLink],
  templateUrl: './catalogo-livros.component.html',
  styleUrl: './catalogo-livros.component.css'
})
export class CatalogoLivrosComponent implements OnInit {
  constructor(private router: Router) { }
  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  idUsuario: string | null = localStorage.getItem('userId');

  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosTerror: Livro[] = [];
  livrosSuspense: Livro[] = [];
  livrosRomance: Livro[] = [];

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.separarPorGenero();
      },
    });

    this.carrinhoService.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
        this.separarPorGenero();
      },
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

  adicionarCarrinho(livro: Livro) {
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
