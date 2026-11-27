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

  // SERVIÇOS
  private service = inject(ClienteService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

   // ESTRUTURAS DE DADOS
  user: Cliente = {} as Cliente;
  
  // PARÂMETRO DA ROTA
  userId: string | null = this.route.snapshot.paramMap.get('id');

  // CARREGAMENTOS
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

  // VARIÁVEIS [CONTROLE DE SESSÃO]
  modoAdmin: boolean = false;

  // VARIÁVEIS [FORMULÁRIO]
  confirmarSenha: string = "";

  // VARIÁVEIS [KEYUP]
  isDisabled: boolean = true;

  // VERIFICAÇÃO INPUTS [KEYUP]
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

  // ATUALIZAR DADOS DO USUÁRIO
  atualizarPerfil() {
    // ANTI-UNDEFINED
    if (!this.user.id) {
      this.mostrarPopup('ID do usuário não encontrado.', 'erro');
      return;
    }

    // UPDATE JSON [CLIENTE]
    this.service.editar(this.user).subscribe({
      next: (userAtualizado) => {
        this.user = userAtualizado;
        this.mostrarPopup('Perfil atualizado com sucesso!');
      },
      error: () => this.mostrarPopup('Erro ao alterar o usuário.', 'erro')
    });
  }

  // VARIÁVEIS [MODAL - EXCLUIR]
  idUsuarioExclusao: string = '';
  mostrarModalExclusao: boolean = false;

  // ABRIR MODAL
  excluirUsuario() {
    // ANTI-UNDEFINED
    if (!this.user.id) {
      this.mostrarPopup('ID do usuário não encontrado.', 'erro');
      return;
    }

    this.idUsuarioExclusao = this.user.id;
    this.mostrarModalExclusao = true;
  }

  // EXCLUSÃO DE USUÁRIO
  confirmarExclusao() {
    // DELETAR JSON [CLIENTE]
    this.service.excluir(this.idUsuarioExclusao).subscribe({
      next: () => {
        this.mostrarModalExclusao = false;

        // IF !modoAdmin EXCLUIR E LOGOUT ELSE REDIRECIONAR
        if (this.modoAdmin) {
          this.router.navigate(['/admin-usuario']).then(() => window.location.reload());
        } else {
          localStorage.removeItem('usuarioLogado');
          localStorage.removeItem('adminLogado');
          localStorage.removeItem('userId');
          this.router.navigate(['/']).then(() => window.location.reload());
        }
      },
      error: () => this.mostrarPopup('Erro ao excluir usuário.', 'erro')
    });
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
