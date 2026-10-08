import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
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

  validarFormularioCadastro() {
    if (this.nomeUsuarioCad.trim() !== '' && this.senhaUsuarioCad.trim() !== '' && this.cpf.trim() !== '' && this.email.trim() !== '' && this.confirmarSenha.trim() !== '') {
      this.isDisabledCadastro = false;
    } else {
      this.isDisabledCadastro = true;
    }
  }
}
