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
  private service = inject(ClienteService);

  listaClientes: Cliente[] = [];

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (clientes) => {
        this.listaClientes = clientes;
      }
    });
  }

  excluirUsuario(id: string) {
    this.service.excluir(id).subscribe({
      next: () => {
        this.listaClientes = this.listaClientes.filter(cliente => cliente.id !== id);
      }
    });
  }
}
