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

  // SERVIÇOS
  constructor(private router: Router) { }
  
  // CARREGAMENTOS
  ngOnInit() {
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
    this.clienteId = localStorage.getItem('userId');
  }

  // VARIÁVEIS [CONTROLE DE SESSÃO]
  isLogado: boolean = false;
  modoAdmin: boolean = false;
  clienteId: string | null = '';


  // LOGOUT
  sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('adminLogado');
    localStorage.removeItem('userId');
    this.isLogado = false;
    window.location.reload();
    this.router.navigate(['/']).then(() => window.location.reload());
  }

  // VARIÁVEIS [PESQUISA]
  termoBusca: string = '';

  // BARRA DE PESQUISA  
  pesquisar(): void {
  const termo = this.termoBusca.trim();

  // PARÂMETRO PARA ROTA
  this.router.navigate(['/catalogo'], {
    queryParams: { busca: termo }
  });
}
}
