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
      this.mostrarPopup('Atenção: Os campos Nome e E-mail são obrigatórios!', 'erro');
      return;
    }
    if (this.mensagemTexto.trim() === '') {
      this.mostrarPopup('Atenção: Por favor, escreva uma mensagem antes de enviar!', 'erro');
      return;
    }

    this.mostrarPopup(`Obrigado pelo seu feedback, ${this.nomeUsuario}! Sua mensagem foi registrada.`);
  }

  // Limpar formulario
  limparFormulario() {
    this.nomeUsuario = '';
    this.emailUsuario = '';
    this.assunto = '';
    this.mensagemTexto = '';
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
}