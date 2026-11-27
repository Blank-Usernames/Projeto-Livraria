import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/Cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-usuario',
  imports: [RouterLink],
  templateUrl: './admin-usuario.component.html',
  styleUrl: './admin-usuario.component.css'
})
export class AdminUsuarioComponent implements OnInit {

  // SERVIÇOS
  private service = inject(ClienteService);

  // ESTRUTURAS DE DADOS
  listaClientes: Cliente[] = [];

  // CARREGAMENTOS
  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      }
    });
  }

  // VARIÁVEIS [EXCLUSÃO DE USUÁRIO]
  idUsuarioExclusao: string = '';
  mostrarModalExclusao: boolean = false;

  // ABRIR MODAL
  excluirUsuario(id: string) {
    this.idUsuarioExclusao = id;
    this.mostrarModalExclusao = true;
  }

  // EXCLUSÃO DE USUÁRIO
  confirmarExclusao() {
    this.service.excluir(this.idUsuarioExclusao).subscribe({
      next: () => {
        this.listaClientes = this.listaClientes.filter(
          cliente => cliente.id !== this.idUsuarioExclusao
        );

        this.mostrarPopup('Usuário excluído com sucesso.');
        this.mostrarModalExclusao = false;
      }
    });
  }

  // POP-UP [VARIÁVEIS]
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
