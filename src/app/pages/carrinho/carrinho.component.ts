import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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
  private service = inject(CarrinhoService);

  itens: ItemCarrinho[] = [];

  ngOnInit(): void {
    this.itens = this.service.listarCarrinho();
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