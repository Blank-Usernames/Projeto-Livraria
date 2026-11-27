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

  // SERVIÇOS
  private service = inject(CarrinhoService);
  private router = inject(Router);

  // ESTRUTURAS DE DADOS
  itens: ItemCarrinho[] = [];

  // CARREGAMENTOS
  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (itens) => {
        this.itens = itens;
      }
    });
  }

  // VARIÁVEIS [ORDENAÇÃO]
  criterioOrdenacao: string = 'nome';
  ordemCrescente: boolean = true;

  // ORDERNAR [CARRINHO]
  get itensOrdenados(): ItemCarrinho[] {
    let lista = this.itens.slice(); /* CÓPIA DA LISTA */

    // ORDENAÇÃO POR SORT [IF POSITIVO > | IF NEGATIVO <]
    lista.sort((a, b) => {
      // VARIÁVEIS [RESULTADO DA COMPARAÇÃO]
      let comparacao = 0;

      // ORDERNAR POR STRING ALFABÉTICA
      if (this.criterioOrdenacao === 'nome') {
        comparacao = a.titulo.localeCompare(b.titulo, 'pt-BR');
      }

      // ORDERNAR POR NUMBER PREÇO
      else if (this.criterioOrdenacao === 'preco') {
        comparacao = a.preco - b.preco;
      }

      // INVERTER LISTA [!ordemCrescente]
      if (this.ordemCrescente === false) {
        comparacao = comparacao * -1;
      }

      return comparacao;
    });

    return lista;
  }

  // VARIÁVEIS [CUPOM]
  cupomDesconto: string = '';
  cupomAplicado: boolean = false;
  percentualDesconto: number = 0;

  // CUPOM
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

  // CONTROLE QUANTIDADE [CARRINHO]
  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade++;
  }

  // CONTROLE QUANTIDADE [CARRINHO]
  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade--;
    }
  }

  // CÁLCULO DESCONTO
  get valorDesconto(): number {
    return this.valorSubTotal * (this.percentualDesconto / 100);
  }

  // CÁLCULO SOMA
  get valorSubTotal(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  // CÁLCULO TOTAL
  get valorTotal(): number {
    return this.valorSubTotal - this.valorDesconto;
  }

  removerItem(id: string | undefined): void {
    // ANTI-UNDEFINED
    if (!id) {
      return;
    }

    // DELETAR JSON [CARRINHO]
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

  // DELETAR JSON [CARRINHO]
  removerTodos(): void {
    // DELETAR A LISTA
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

  // FINALIZAR COMPRA
  finalizarCompra(): void {
    this.mostrarPopup('Compra finalizada!');
    removerTodos();
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
