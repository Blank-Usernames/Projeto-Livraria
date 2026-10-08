import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  constructor(private router: Router) { }
  isDisabledLogin: boolean = true;
  isDisabledCadastro: boolean = true;

  nomeUsuario: string = "";
  senhaUsuario: string = "";

  validarFormularioLogin() {
    if (this.nomeUsuario.trim() !== '' && this.senhaUsuario.trim() !== '') {
      this.isDisabledLogin = false;
    } else {
      this.isDisabledLogin = true;
    }
  }

  nomeUsuarioCad: string = "";
  senhaUsuarioCad: string = "";
  confirmarSenha: string = "";
  email: string = "";
  cpf: string = "";
  checkboxTermos: boolean = false;

  validarFormularioCadastro() {
    if (this.nomeUsuarioCad.trim() !== '' &&
      this.senhaUsuarioCad.trim() !== '' &&
      this.cpf.trim() !== '' &&
      this.email.trim() !== '' &&
      this.confirmarSenha.trim() !== '' &&
      this.checkboxTermos) {
      this.isDisabledCadastro = false;
    } else {
      this.isDisabledCadastro = true;
    }
  }

  login() {
    if (this.nomeUsuario === 'admin' && this.senhaUsuario === '1234') {
      localStorage.setItem('usuarioLogado', 'true');
      this.router.navigate(['/catalogo']);
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }
}
