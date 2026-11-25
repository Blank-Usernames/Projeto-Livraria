import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [ RouterLink, FormsModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  clienteId: string | null = '';
  termoBusca: string = '';

  ngOnInit() {
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
    this.clienteId = localStorage.getItem('userId');
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('adminLogado');
    this.isLogado = false;
    window.location.reload();
    window.location.href = '/';
  }

  pesquisar(): void {
  const termo = this.termoBusca.trim();

  this.router.navigate(['/catalogo'], {
    queryParams: { busca: termo }
  });
}
}
