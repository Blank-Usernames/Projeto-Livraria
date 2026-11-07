import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-cadastro-livros',
  imports: [],
  templateUrl: './cadastro-livros.component.html',
  styleUrl: './cadastro-livros.component.css'
})
export class CadastroLivrosComponent {
  livro: Livro = {} as Livro;
  private service = inject(LivroService);
  private router = inject(Router);

  cadastrarLivro() {
    this.service.incluir(this.livro).subscribe({
      next: (livro) => {
        this.livro = livro;
        alert(`Livro ${this.livro.tituloLivro} cadastrado com sucesso!`);
        this.router.navigate(['/catalogo']);
      }
    });
  }
}