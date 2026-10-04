import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ItemCarrinho {
  id: number;
  titulo: string;
  autor: string;
  preco: number;
  quantidade: number;
  imagem: string;
}

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  formaPagamentoSelecionada: string = 'pix';

  itens: ItemCarrinho[] = [
    {
      id: 1,
      titulo: 'Dom Casmurro',
      autor: 'Machado de Assis',
      preco: 39.90,
      quantidade: 1,
      imagem: 'https://via.placeholder.com/90x130?text=Dom+Casmurro'
    },
    {
      id: 2,
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      preco: 34.90,
      quantidade: 1,
      imagem: 'https://via.placeholder.com/90x130?text=Pequeno+Principe'
    }
  ];

  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade++;
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade--;
    }
  }

  removerItem(id: number): void {
    this.itens = this.itens.filter(item => item.id !== id);
  }

  get valorTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  finalizarCompra(): void {
    if (this.itens.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    alert(`Pedido realizado com sucesso! Forma de pagamento: ${this.formaPagamentoSelecionada.toUpperCase()}`);
  }
}