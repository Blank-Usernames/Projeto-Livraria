import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  private service = inject(CarrinhoService);
  private router = inject(Router);


  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      }
    });
    console.table(this.itens);
  }

  cupomDesconto: string = '';
  cepFrete: string = '';

  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade++;
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade--;
    }
  }

  removerItem(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.service.excluir(id).subscribe({
      next: () => {
        this.itens = this.itens.filter(item => item.id !== id);
        alert('Produto removido do carrinho!');
      },
      error: () => {
        alert('Erro ao remover produto do carrinho.');
      }
    });
  }

  removerTodos(): void {
    this.itens.forEach(item => {
    if (item.id) {
      this.service.excluir(item.id).subscribe({
        next: () => {
          this.itens = this.itens.filter(
            i => i.id !== item.id
          );
        },
        error: () => {
          alert(`Erro ao remover ${item.titulo} do carrinho.`);
        }
      });
    }
  });
  }

  get valorSubTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  get valorTotal(): number {
    return this.valorSubTotal;
  }
}