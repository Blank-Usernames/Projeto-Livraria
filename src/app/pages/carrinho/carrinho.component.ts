import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ItemCarrinho {
  id: number;
  codigoItem: string;
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
  cupomDesconto: string = '';
  cepFrete: string = '';
  
  itens: ItemCarrinho[] = [
    {
      id: 1,
      codigoItem: '01',
      titulo: 'A Maldição da Residência Hill',
      autor: 'Shirley Jackson',
      preco: 44.90,
      quantidade: 1,
      imagem: 'Imagens_Livros/livro4.png'
    },
    {
      id: 2,
      codigoItem: '02',
      titulo: 'Panico o legado do grito',
      autor: 'Padraic Maroney',
      preco: 66.56,
      quantidade: 1,
      imagem: 'Imagens_Livros/livro2.png'
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

  removerTodos(): void {
    this.itens = [];
  }

  get valorSubTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  get valorTotal(): number {
    return this.valorSubTotal;
  }
}