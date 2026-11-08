import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-catalogo-livros',
  imports: [RouterLink],
  templateUrl: './catalogo-livros.component.html',
  styleUrl: './catalogo-livros.component.css'
})
export class CatalogoLivrosComponent implements OnInit {
  constructor(private router: Router) { }
  private service = inject(LivroService);
  isLogado: boolean = false;

  livros: Livro[] = [];
  livrosTerror: Livro[] = [];
  livrosSuspense: Livro[] = [];
  livrosRomance: Livro[] = [];

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.separarPorGenero();
      },
    });
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
  }

  separarPorGenero() {
    this.livrosTerror = this.livros.filter(livro => livro.genero === 'Terror');
    this.livrosSuspense = this.livros.filter(livro => livro.genero === 'Suspense');
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
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
    alert(`${livro.tituloLivro} adicionado ao carrinho! (ainda não funcional)`);
  }
}
