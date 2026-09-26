import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroLivrosComponent } from './pages/cadastro-livros/cadastro-livros.component';
import { CatalogoLivrosComponent } from './pages/catalogo-livros/catalogo-livros.component';
import { AjudaFeedbackComponent } from './pages/ajuda-feedback/ajuda-feedback.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadastroUsuarioComponent,
    CadastroLivrosComponent,
    CatalogoLivrosComponent,
    CarrinhoComponent,
    AjudaFeedbackComponent, 
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Projeto-Livraria';
}
