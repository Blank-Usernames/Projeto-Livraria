import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }
  isLogado: boolean = false;

  ngOnInit() {
    this.isLogado = localStorage.getItem('usuarioLogado') === 'true';
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    this.isLogado = false;
    window.location.reload();
    window.location.href = '/';
  }
}
