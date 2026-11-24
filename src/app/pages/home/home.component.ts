import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }
  isLogado: boolean = false;
  modoAdmin: boolean = false;

  private service = inject(LivroService);

  livros: Livro[] = [];
  livrosDestaque: Livro[] = [];
  livrosLancamento: Livro[] = [];
  bestSelling: Livro[] = [];
  livrosAutor: Livro[] = [];

  autorSelecionado: string = '';

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.separarPorAutor();
        this.livrosAleatorios(this.livrosDestaque);
        this.livrosAleatorios(this.livrosLancamento);
        this.livrosAleatorios(this.bestSelling);
      },
    });
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  separarPorAutor() {
    const livroAleatorio = this.livros[Math.floor(Math.random() * this.livros.length)];

    this.autorSelecionado = livroAleatorio.autorLivro;

    this.livrosAutor = this.livros.filter(
      livro => livro.autorLivro === this.autorSelecionado
    );
  }

  livrosAleatorios(sequenciaLivro: Livro[]) {
    sequenciaLivro.length = 0;

    const quantidade = Math.min(6, this.livros.length);
    const indicesSelecionados = new Set<number>();

    while (indicesSelecionados.size < quantidade) {
      const indiceAleatorio = Math.floor(
        Math.random() * this.livros.length
      );

      if (indicesSelecionados.has(indiceAleatorio)) {
        continue;
      }

      indicesSelecionados.add(indiceAleatorio);
      sequenciaLivro.push(this.livros[indiceAleatorio]);
    }
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