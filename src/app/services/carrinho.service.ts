import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/Carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  constructor() { }

  listarCarrinho(): ItemCarrinho[] {
    return [
      {
        id: 1,
        codigoItem: '#00001',
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
  }
}
