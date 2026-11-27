import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  user: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  userId: string | null = this.route.snapshot.paramMap.get('id');
  modoAdmin: boolean = false;

  ngOnInit(): void {
    if (this.userId) {
      this.service.buscarPorId(this.userId).subscribe({
        next: (user) => this.user = user,
        error: () => this.mostrarPopup('Usuário não encontrado.', 'erro')
      });
    } else {

    }
    this.modoAdmin = localStorage.getItem('adminLogado') === 'true';
  }

  confirmarSenha: string = "";
  isDisabled: boolean = true;

  validarFormularioPerfil() {
    if (this.user.nomeUsuario?.trim() !== '' &&
      this.user.senhaUsuario?.trim() !== '' &&
      this.user.email?.trim() !== '' &&
      this.confirmarSenha.trim() !== '' &&
      this.user.senhaUsuario === this.confirmarSenha
    ) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }


  atualizarPerfil() {
    if (!this.user.id) {
      this.mostrarPopup('ID do usuário não encontrado.', 'erro');
      return;
    }

    this.service.editar(this.user).subscribe({
      next: (userAtualizado) => {
        this.user = userAtualizado;
        this.mostrarPopup('Perfil atualizado com sucesso!');
      },
      error: () => this.mostrarPopup('Erro ao alterar o usuário.', 'erro')
    });
  }

  idUsuarioExclusao: string = '';
  mostrarModalExclusao: boolean = false;

  excluirUsuario() {
    if (!this.user.id) {
      this.mostrarPopup('ID do usuário não encontrado.', 'erro');
      return;
    }

    this.idUsuarioExclusao = this.user.id;
    this.mostrarModalExclusao = true;
  }

  confirmarExclusao() {
    this.service.excluir(this.idUsuarioExclusao).subscribe({
      next: () => {
        this.mostrarModalExclusao = false;

        if (this.modoAdmin) {
          window.location.href = '/admin-usuario';
        } else {
          localStorage.removeItem('usuarioLogado');
          localStorage.removeItem('adminLogado');
          localStorage.removeItem('userId');
          window.location.href = '/';
        }
      },
      error: () => this.mostrarPopup('Erro ao excluir usuário.', 'erro')
    });
  }

  mensagemPopup = '';
  tipoPopup = '';

  mostrarPopup(mensagem: string, tipo: string = 'sucesso') {
    this.mensagemPopup = mensagem;
    this.tipoPopup = tipo;

    setTimeout(() => {
      this.mensagemPopup = '';
    }, 3000);
  }
}