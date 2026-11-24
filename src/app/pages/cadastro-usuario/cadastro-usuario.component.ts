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
  cliente: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);

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
      this.senhaUsuarioCad === this.confirmarSenha &&
      this.checkboxTermos) {
      this.isDisabledCadastro = false;
    } else {
      this.isDisabledCadastro = true;
    }
  }

  cadastrarUsuario() {
    this.cliente = {
      nomeUsuario: this.nomeUsuarioCad,
      senhaUsuario: this.senhaUsuarioCad,
      email: this.email,
      cpf: this.cpf
    } as Cliente;

    this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        alert(`Usuário ${this.cliente.nomeUsuario} cadastrado com sucesso!`);
      }
    });
  }

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

  limparCadastro() {
    this.nomeUsuarioCad = '';
    this.senhaUsuarioCad = '';
    this.confirmarSenha = '';
    this.email = '';
    this.cpf = '';
    this.checkboxTermos = false;
    this.isDisabledCadastro = true;
  }

  /* VALIDAR USUÁRIO */
  login() {
    /* LOGIN FIXO DO ADMIN */
    if (this.nomeUsuarioLog === 'admin' && this.senhaUsuarioLog === '1234') {
      localStorage.setItem('usuarioLogado', 'true');
      localStorage.setItem('adminLogado', 'true');
      window.location.reload();
      window.location.href = '/';
    } else {
      /* LOGIN DE USUÁRIO COMUM */


      this.service.listar().subscribe({
        next: (clientes) => {
          const usuarioEncontrado = clientes.find(cliente =>
            cliente.nomeUsuario === this.nomeUsuarioLog &&
            cliente.senhaUsuario === this.senhaUsuarioLog
          );
          if (usuarioEncontrado) {
            alert(`Usuário ${usuarioEncontrado.nomeUsuario} logado com sucesso!`);
            localStorage.setItem('usuarioLogado', 'true');
            localStorage.setItem('adminLogado', 'false');
            this.router.navigate(['/catalogo']).then(() => {
              window.location.reload();
            });
          } else {
            alert('Usuário ou senha incorretos!');
          }
        }
      });
    }
  }
  /* VALIDAR USUÁRIO */
}
