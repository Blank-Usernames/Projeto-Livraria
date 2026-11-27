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
}