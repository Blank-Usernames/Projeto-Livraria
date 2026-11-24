import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [ RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }
  isLogado: boolean = false;
  modoAdmin: boolean = false;

  ngOnInit() {
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('adminLogado');
    this.isLogado = false;
    window.location.reload();
    window.location.href = '/';
  }
}
