import { Router } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';

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
  idUsuario: string | null = localStorage.getItem('userId');

  private livroService = inject(LivroService);
  private carrinhoService = inject(CarrinhoService);

  livros: Livro[] = [];
  itens: ItemCarrinho[] = [];
  livrosDestaque: Livro[] = [];
  livrosLancamento: Livro[] = [];
  bestSelling: Livro[] = [];
  livrosAutor: Livro[] = [];

  autorSelecionado: string = '';

  ngOnInit(): void {
    this.livroService.listar().subscribe({
      next: (livros) => {
        this.livros = livros;
        this.separarPorAutor();
        this.livrosAleatorios(this.livrosDestaque);
        this.livrosAleatorios(this.livrosLancamento);
        this.livrosAleatorios(this.bestSelling);
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