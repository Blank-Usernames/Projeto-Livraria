import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CatalogoLivrosComponent } from './pages/catalogo-livros/catalogo-livros.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { CadastroLivrosComponent } from './pages/cadastro-livros/cadastro-livros.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { AjudaFeedbackComponent } from './pages/ajuda-feedback/ajuda-feedback.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';



export const routes: Routes = [
    { path: '', component: HomeComponent, title:"Home"},
    { path: 'catalogo', component: CatalogoLivrosComponent, title:"Catálogo de Livros"},
    { path: 'cadastro-usuario', component: CadastroUsuarioComponent, title:"Cadastro de Usuário"},
    { path: 'cadastro-livros', component: CadastroLivrosComponent, title:"Cadastro de Livros"},
    { path: 'carrinho', component: CarrinhoComponent, title:"Carrinho"},
    { path: 'ajuda-feedback', component: AjudaFeedbackComponent, title:"Ajuda e Feedback"},
    { path: 'perfil-usuario', component: PerfilUsuarioComponent, title:"Perfil de Usuário"}
];
