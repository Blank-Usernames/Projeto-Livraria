import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';

@Component({
  selector: 'app-cadastro-usuario',
  imports: [FormsModule],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.css'
})
export class CadastroUsuarioComponent {
  isDisabledLogin: boolean = true;
  isDisabledCadastro: boolean = true;

  nomeUsuarioLog: string = "";
  senhaUsuarioLog: string = "";

  validarFormularioLogin() {
    if (this.nomeUsuarioLog.trim() !== '' && this.senhaUsuarioLog.trim() !== '') {
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
    if (this.nomeUsuarioLog === 'admin' && this.senhaUsuarioLog === '1234') {
      localStorage.setItem('usuarioLogado', 'true');
      window.location.reload();   
      window.location.href = '/';
    } else {
      alert('Usuário ou senha incorretos!');
    }
  }

  cliente: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);

  cadastrarUsuario() {
    this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        alert(`Livro ${this.cliente.nomeUsuario} cadastrado com sucesso!`);
        this.router.navigate(['/catalogo']);
      }
    });
  }
}
