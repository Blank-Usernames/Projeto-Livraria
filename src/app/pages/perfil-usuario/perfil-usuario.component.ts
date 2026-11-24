import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil-usuario',
  imports: [FormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent implements OnInit {
  user: Cliente = {} as Cliente;
  private service = inject(ClienteService);
  private router = inject(Router);

  private route = inject(ActivatedRoute);
  userId: string | null = this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    if (this.userId) {
      this.service.buscarPorId(this.userId).subscribe({
        next: (user) => this.user = user,
        error: () => alert('Usuário não encontrado.')
      });
    } else {

    }
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
      alert('ID do usuário não encontrado.');
      return;
    }

    this.service.editar(this.user).subscribe({
      next: (userAtualizado) => {
        this.user = userAtualizado;
        alert('Perfil atualizado com sucesso!');
      },
      error: () => alert('Erro ao alterar o usuário.')
    });
  }
}