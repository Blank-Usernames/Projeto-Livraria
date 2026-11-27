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

  // SERVIÇOS
  private service = inject(ClienteService);
  private router = inject(Router);

  // ESTRUTURAS DE DADOS
  cliente: Cliente = {} as Cliente;

  // VARIÁVEIS [FORMULÁRIO - CADASTRO]
  nomeUsuarioCad: string = "";
  senhaUsuarioCad: string = "";
  confirmarSenha: string = "";
  email: string = "";
  cpf: string = "";
  checkboxTermos: boolean = false;
  isDisabledCadastro: boolean = true;

  // VERIFICAÇÃO INPUTS [KEYUP - CADASTRO]
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

  // CADASTRO DE USUÁRIO
  cadastrarUsuario() {
    // OBJETO JSON [CLIENTE]
    this.cliente = {
      nomeUsuario: this.nomeUsuarioCad,
      senhaUsuario: this.senhaUsuarioCad,
      email: this.email,
      cpf: this.cpf
    } as Cliente;

    // ENVIAR JSON [CLIENTE]
    this.service.incluir(this.cliente).subscribe({
      next: (cliente) => {
        this.cliente = cliente;
        this.limparCadastro();
        this.mostrarPopup(`Usuário ${this.nomeUsuarioCad} cadastrado com sucesso!`);
      }
    });
  }

  // LIMPAR FORMULÁRIO [FORMULÁRIO - CADASTRO]
  limparCadastro() {
    this.nomeUsuarioCad = '';
    this.senhaUsuarioCad = '';
    this.confirmarSenha = '';
    this.email = '';
    this.cpf = '';
    this.checkboxTermos = false;
    this.isDisabledCadastro = true;
  }

  // VARIÁVEIS [FORMULÁRIO - LOGIN]
  nomeUsuarioLog: string = "";
  senhaUsuarioLog: string = "";
  isDisabledLogin: boolean = true;

  // VERIFICAÇÃO INPUTS [KEYUP - LOGIN]
  validarFormularioLogin() {
    if (this.nomeUsuarioLog.trim() !== '' && this.senhaUsuarioLog.trim() !== '') {
      this.isDisabledLogin = false;
    } else {
      this.isDisabledLogin = true;
    }
  }

  // LOGIN DE USUÁRIO
  login() {
    // LOGIN MODO ADMINISTRADOR
    if (this.nomeUsuarioLog === 'admin' && this.senhaUsuarioLog === '1234') {
      localStorage.setItem('usuarioLogado', 'true'); /* PARA ACESSAR AS ROTAS */
      localStorage.setItem('adminLogado', 'true'); /* PARA TER FUNCIONALIDADES DE ADMIN */
      sessionStorage.setItem('avisoAdmin', 'true'); /* gracinha que eu coloquei para avisar quando você entrar no modo adm */
      window.location.href = '/';
    } else {
      // LOGIN MODO USUÁRIO COMUM
      this.service.listar().subscribe({
        next: (clientes) => {
          // VERIFICAR INPUTS [FORMULÁRIO - LOGIN]
          const usuarioEncontrado = clientes.find(cliente =>
            cliente.nomeUsuario === this.nomeUsuarioLog &&
            cliente.senhaUsuario === this.senhaUsuarioLog
          );
          if (usuarioEncontrado) {
            // ANTI-UNDEFINED
            if (!usuarioEncontrado.id) {
              return;
            }
            localStorage.setItem('usuarioLogado', 'true'); /* PARA ACESSAR AS ROTAS */
            localStorage.setItem('adminLogado', 'false'); /* REMOVER O MODO ADMINISTRADOR */
            localStorage.setItem('userId', usuarioEncontrado.id); /* REGISTRAR SESSÃO */
            sessionStorage.setItem('avisoUsuario', 'true'); /* gracinha que coloquei para avisar que o login foi efetuado, adicionado no final do projeto */
            window.location.href = '/catalogo';
          } else {
            this.mostrarPopup('Usuário ou senha incorretos!', 'erro');
          }
        }
      });
    }
  }

  // VARIÁVEIS [POP-UP]
  mensagemPopup = '';
  tipoPopup = '';

  // POP-UP
  mostrarPopup(mensagem: string, tipo: string = 'sucesso') {
    this.mensagemPopup = mensagem;
    this.tipoPopup = tipo;

    setTimeout(() => {
      this.mensagemPopup = '';
    }, 3000);
  }
}
