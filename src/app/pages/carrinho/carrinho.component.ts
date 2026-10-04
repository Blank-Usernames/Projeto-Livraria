import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
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

  // Cálculo automático da soma dos valores dos livros 
  get valorTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }
}