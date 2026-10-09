import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajuda-feedback',
  imports: [FormsModule],
  templateUrl: './ajuda-feedback.component.html',
  styleUrl: './ajuda-feedback.component.css'
})
export class AjudaFeedbackComponent {

  termoBusca: string = '';

  // Variaveis formulario
  nomeUsuario: string = '';
  emailUsuario: string = '';
  assunto: string = 'duvida'; // Valor padrão marcado
  mensagemTexto: string = '';

  // Método botão Buscar
  buscar(): void {
    if (this.termoBusca.trim() === '') {
      alert('Por favor, digite uma dúvida antes de buscar.');
    } else {
      alert(`Você pesquisou por: "${this.termoBusca}".`);
      this.termoBusca = ''; // Limpa o campo automaticamente no HTML
    }
  }

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
}