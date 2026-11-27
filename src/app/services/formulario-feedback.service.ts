import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormularioFeedback } from '../models/Formulario-feedback';

@Injectable({
  providedIn: 'root'
})
export class FormularioFeedbackService {
  private readonly apiUrl = 'http://localhost:3000/feedbacks';

  constructor(private http: HttpClient) {}

  enviarFeedback(dados: FormularioFeedback): Observable<FormularioFeedback> {
    return this.http.post<FormularioFeedback>(this.apiUrl, dados);
  }
}