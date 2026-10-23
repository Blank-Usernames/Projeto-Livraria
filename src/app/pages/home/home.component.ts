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

  private service = inject(LivroService);

  livrosDestaque: Livro[] = [];
  livrosMaisVendidos: Livro[] = [];
  livroRecentes: Livro[] = [];
  livroStephen: Livro[] = [];

  ngOnInit(): void {
    this.livrosDestaque = this.service.livroDestaques();
    this.livrosMaisVendidos = this.service.livrosMaisVendidos();
    this.livroRecentes = this.service.livroRecentes();
    this.livroStephen = this.service.livroStephen();
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
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