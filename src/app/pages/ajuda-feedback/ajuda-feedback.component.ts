import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Faq } from '../../models/Faq';
import { FormularioFeedback } from '../../models/Formulario-feedback';
import { FaqService } from '../../services/faq.service';
import { FormularioFeedbackService } from '../../services/formulario-feedback.service';

@Component({
  selector: 'app-ajuda-feedback',
  imports: [FormsModule],
  templateUrl: './ajuda-feedback.component.html',
  styleUrl: './ajuda-feedback.component.css'
})

export class AjudaFeedbackComponent implements OnInit {
  termoBusca: string = '';

  perguntasFaq: Faq[] = [];
  feedbacksEnviados: FormularioFeedback[] = [];
  exibirFeedbacksNaTela: boolean = true;

  nomeUsuario: string = '';
  emailUsuario: string = '';
  assunto: string = 'duvida';
  mensagemTexto: string = '';

  constructor(
    private faqService: FaqService,
    private feedbackService: FormularioFeedbackService
  ) {}

  ngOnInit(): void {
    this.carregarFaq();
  }

  carregarFaq(): void {
    this.faqService.listarPerguntas().subscribe({
      next: (dados) => {
        this.perguntasFaq = dados;
      },
      error: () => {
        alert('Não foi possível carregar o FAQ.');
      }
    });
  }

  // Método botão Buscar
  buscar(): void {
    this.faqService.buscarPerguntas(this.termoBusca).subscribe({
      next: (resultados) => {
        this.perguntasFaq = resultados;
        if (this.termoBusca.trim() !== '' && resultados.length === 0) {
          alert(`Nenhuma pergunta encontrada para "${this.termoBusca}".`);
        }
      },
      error: () => {
        alert('Erro ao buscar no servidor.');
      }
    });
  }

  // Método envio formulário (salva no db.json via POST)
  enviarFormulario(): void {
    if (this.nomeUsuario.trim() === '' || this.emailUsuario.trim() === '') {
      alert('Atenção: Os campos Nome e E-mail são obrigatórios!');
      return;
    }
    if (this.mensagemTexto.trim() === '') {
      alert('Atenção: Por favor, escreva uma mensagem antes de enviar!');
      return;
    }

    const novoFeedback: FormularioFeedback = {
      nomeUsuario: this.nomeUsuario.trim(),
      emailUsuario: this.emailUsuario.trim(),
      assunto: this.assunto,
      mensagemTexto: this.mensagemTexto.trim(),
      dataEnvio: new Date().toLocaleString('pt-BR')
    };

    this.feedbackService.enviarFeedback(novoFeedback).subscribe({
      next: (salvo) => {
        this.feedbacksEnviados.push(salvo);
        alert(`Obrigado pelo seu feedback, ${novoFeedback.nomeUsuario}! Sua mensagem foi salva.`);
        this.limparFormulario();
      },
      error: () => {
        alert('Erro ao enviar o feedback.');
      }
    });
  }

  limparFormulario(): void {
    this.nomeUsuario = '';
    this.emailUsuario = '';
    this.assunto = 'duvida';
    this.mensagemTexto = '';
  }
}