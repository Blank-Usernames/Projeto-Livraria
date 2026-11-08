import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-catalogo-livros',
  imports: [],
  templateUrl: './catalogo-livros.component.html',
  styleUrl: './catalogo-livros.component.css'
})
export class CatalogoLivrosComponent implements OnInit {
  private service = inject(LivroService);

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
