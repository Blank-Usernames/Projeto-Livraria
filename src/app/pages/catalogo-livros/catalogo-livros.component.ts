import { Component, inject, OnInit } from '@angular/core';
import { LivroService } from '../../services/livro.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-catalogo-livros',
  imports: [],
  templateUrl: './catalogo-livros.component.html',
  styleUrl: './catalogo-livros.component.css'
})
export class CatalogoLivrosComponent  implements OnInit {

  private service = inject(LivroService);
  listaLivros: Livro[] =[];

    ngOnInit(): void {
      this.service.listar().subscribe({
        next: (livro) => {
          this.listaLivros = livro;
        }
      });
    }
}
