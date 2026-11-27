import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CarrinhoService } from '../../services/carrinho.service';
import { ItemCarrinho } from '../../models/Carrinho';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CurrencyPipe],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  itens: ItemCarrinho[] = [];
  private service = inject(CarrinhoService);
  private router = inject(Router);

  criterioOrdenacao: string = 'nome';
  ordemCrescente: boolean = true;

  cupomDesconto: string = '';
  cupomAplicado: boolean = false;
  percentualDesconto: number = 0;

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      }
    });
    console.table(this.itens);
  }

  get itensOrdenados(): ItemCarrinho[] {
    let lista = this.itens.slice();

    lista.sort((a, b) => {
      let comparacao = 0;

      if (this.criterioOrdenacao === 'nome') {
        comparacao = a.titulo.localeCompare(b.titulo, 'pt-BR');
      }
      else if (this.criterioOrdenacao === 'preco') {
        comparacao = a.preco - b.preco;
      }

      if (this.ordemCrescente === false) {
        comparacao = comparacao * -1;
      }

      return comparacao;
    });

    return lista;
  }

  aplicarCupom() {
    if (this.cupomDesconto.trim().toUpperCase() === 'GTAVI') {
      this.cupomAplicado = true;
      this.percentualDesconto = 10;
      this.mostrarPopup('Cupom aplicado com sucesso!');
    } else if (this.cupomDesconto.trim().toUpperCase() === 'SENAC') {
      this.cupomAplicado = true;
      this.percentualDesconto = 25;
      this.mostrarPopup('Cupom aplicado com sucesso!');
    } else if (this.cupomDesconto.trim().toUpperCase() === 'FERNANDOTIMOTEO') {
      this.cupomAplicado = true;
      this.percentualDesconto = 100;
      this.mostrarPopup('Cupom aplicado com sucesso!');
    } else {
      this.cupomAplicado = false;
      this.percentualDesconto = 0;
      this.mostrarPopup('Cupom inválido!', 'erro');
    }
  }

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
        this.mostrarPopup('Produto removido do carrinho!');
      },
      error: () => {
        this.mostrarPopup('Erro ao remover produto do carrinho.', 'erro');
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
            this.mostrarPopup(`Erro ao remover ${item.titulo} do carrinho.`, 'erro');
          }
        });
      }
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

  get valorDesconto(): number {
    return this.valorSubTotal * (this.percentualDesconto / 100);
  }

  get valorSubTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  get valorTotal(): number {
    return this.valorSubTotal - this.valorDesconto;
  }
}