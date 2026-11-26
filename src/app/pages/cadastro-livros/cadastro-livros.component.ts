import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-livros',
  imports: [FormsModule],
  templateUrl: './cadastro-livros.component.html',
  styleUrl: './cadastro-livros.component.css'
})
export class CadastroLivrosComponent implements OnInit {
  livro: Livro = {} as Livro;
  private service = inject(LivroService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  livroId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.livroId) {
      this.service.buscarPorId(this.livroId).subscribe({
        next: (livro) => this.livro = livro,
        error: () => this.mostrarPopup('Livro não encontrado.', 'erro')
      });
    } else {

    }
  }

  cadastrarLivro() {
    if (this.livroId) {
      this.service.editar(this.livro).subscribe({
        next: (livro) => {
          this.mostrarPopup(`Os dados de ${livro.tituloLivro} foram atualizados com sucesso!`);
          this.livro = livro;
          this.router.navigate(['/catalogo']);
        },
        error: () => this.mostrarPopup('Erro ao alterar o livro.', 'erro')
      })
    } else {
      this.service.incluir(this.livro).subscribe({
        next: (livro) => {
          this.mostrarPopup(`Livro: ${livro.tituloLivro} Cadastrado. \nID: ${livro.id}`);
        }
      });
    }
  }

  excluirLivro(id: string) {
    if (id) {
      this.service.excluir(id).subscribe(() => {
        this.router.navigate(['/catalogo']);
      })
    }
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
}