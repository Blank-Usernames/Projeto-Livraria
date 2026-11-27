import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly apiUrl = 'http://localhost:3000/feedbacks';

  constructor(private http: HttpClient) { }

  enviarFeedback(dados: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, dados);
  }
}