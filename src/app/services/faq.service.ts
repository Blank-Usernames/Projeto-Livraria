import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Faq } from '../models/Faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  private readonly apiUrl = 'http://localhost:3000/faq';

  constructor(private http: HttpClient) {}

  listarPerguntas(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  buscarPerguntas(termo: string): Observable<Faq[]> {
    const termoLimpo = termo.trim().toLowerCase();

    return this.http.get<Faq[]>(this.apiUrl).pipe(
      map((perguntas) => {
        if (!termoLimpo) {
          return perguntas;
        }
        return perguntas.filter(
          (item) =>
            item.pergunta.toLowerCase().includes(termoLimpo) ||
            item.resposta.toLowerCase().includes(termoLimpo)
        );
      })
    );
  }
}