import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/Carrinho';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly API = 'http://localhost:3000/carrinho';

  constructor(private http: HttpClient) { }

  listar(): Observable<ItemCarrinho[]> {
    return this.http.get<ItemCarrinho[]>(this.API);
  }

  incluir(itemCarrinho: ItemCarrinho): Observable<ItemCarrinho> {
    return this.http.post<ItemCarrinho>(this.API, itemCarrinho);
  }
  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

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
