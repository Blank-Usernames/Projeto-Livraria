import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajuda-feedback',
  imports: [FormsModule],
  templateUrl: './ajuda-feedback.component.html',
  styleUrl: './ajuda-feedback.component.css'
})
export class AjudaFeedbackComponent {

  // Variaveis formulario
  nomeUsuario: string = '';
  emailUsuario: string = '';
  assunto: string = 'duvida'; // Valor padrão marcado
  mensagemTexto: string = '';

  // Método evio formulario
  enviarFormulario(): void {
    if (this.nomeUsuario.trim() === '' || this.emailUsuario.trim() === '') {
      alert('Atenção: Os campos Nome e E-mail são obrigatórios!');
      return;
    }
    if (this.mensagemTexto.trim() === '') {
      alert('Atenção: Por favor, escreva uma mensagem antes de enviar!');
      return;
    }

    alert(`Obrigado pelo seu feedback, ${this.nomeUsuario}! Sua mensagem foi registrada.`);
  }

  // Limpar formulario
  limparFormulario() {
    this.nomeUsuario = '';
    this.emailUsuario = '';
    this.assunto = '';
    this.mensagemTexto = '';
  }
}