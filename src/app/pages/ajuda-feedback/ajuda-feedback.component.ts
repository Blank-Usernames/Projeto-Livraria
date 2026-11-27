import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Faq } from '../../models/Faq';
import { Feedback } from '../../models/Feedback';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { FaqService } from '../../services/faq.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-ajuda-feedback',
  imports: [FormsModule],
  templateUrl: './ajuda-feedback.component.html',
  styleUrl: './ajuda-feedback.component.css'
})
export class AjudaFeedbackComponent implements OnInit {

  // SERVIÇOS
  constructor(
    private faqService: FaqService,
    private feedbackService: FeedbackService,
    private clienteService: ClienteService
  ) { }

  // CARREGAMENTOS
  ngOnInit(): void {
    this.carregarFaq();
    this.carregarDadosUsuario();
    this.verificarCampos(); /* VERIFICAR AO CARREGAR PARA GARANTIR DISABLED */
  }

  // ESTRUTURAS DE DADOS
  perguntasFaq: Faq[] = [];
  feedbacksEnviados: Feedback[] = [];
  exibirFeedbacksNaTela: boolean = true;

  // BUSCAR DADOS [FAQ]
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

  // BUSCAR DADOS [USUÁRIO]
  carregarDadosUsuario(): void {
    this.nomeUsuario = '';
    this.emailUsuario = '';

    const usuarioLogado = localStorage.getItem('usuarioLogado'); /* DESCOBRIR SE HÁ LOGIN */
    const userId = localStorage.getItem('userId'); /* DESCOBRIR QUAL USUÁRIO */

    // DESABILITAR O BOTÃO DE ENVIO CASO NÃO HAJA USUÁRIO
    if (usuarioLogado !== 'true' || !userId) {
      this.verificarCampos();
      return;
    }

    this.clienteService.buscarPorId(userId).subscribe({
      next: (cliente) => { 
        // PREENCHER INPUTS COM DADOS DO USUÁRIO BUSCADO
        this.nomeUsuario = cliente.nomeUsuario;
        this.emailUsuario = cliente.email;

        // DESABILITAR O BOTÃO DE ENVIO APÓS PREENCHER INPUTS 
        this.verificarCampos();
      },
      error: () => {
        this.mostrarPopup('Não foi possível carregar seus dados.', 'erro');
      }
    });
  }

  // VARIÁVEIS [FORMULÁRIO]
  nomeUsuario: string = '';
  emailUsuario: string = '';
  assunto: string = 'duvida'; /* VALOR PADRÃO */
  mensagemTexto: string = '';

  // VARIÁVEIS [BUSCA FAQ]
  termoBusca: string = '';

  // VARIÁVEIS [KEYUP]
  formularioValido: boolean = false;

  // VERIFICAÇÃO DE INPUTS [KEYUP]
  verificarCampos(): void {
    this.formularioValido =
      this.nomeUsuario.trim() !== '' &&
      this.emailUsuario.trim() !== '' &&
      this.mensagemTexto.trim() !== '';
  }

  // ENVIO DO FORMULÁRIO
  enviarFormulario(): void {
    // VERIFICAÇÃO DE INPUTS [IF NULL]
    if (this.nomeUsuario.trim() === '' || this.emailUsuario.trim() === '') {
      this.mostrarPopup('Atenção: Os campos Nome e E-mail são obrigatórios!', 'erro');
      return;
    }

    // VERIFICAÇÃO DE TEXTAREA [IF NULL]
    if (this.mensagemTexto.trim() === '') {
      this.mostrarPopup('Atenção: Por favor, escreva uma mensagem antes de enviar!', 'erro');
      return;
    }

    // OBJETO JSON [FEEDBACK]
    const novoFeedback: Feedback = {
      nomeUsuario: this.nomeUsuario.trim(),
      emailUsuario: this.emailUsuario.trim(),
      assunto: this.assunto,
      mensagemTexto: this.mensagemTexto.trim(),
      dataEnvio: new Date().toLocaleString('pt-BR') /* RETORNO DE Date() PRECISA SER FORMATADO */
    };

    // ENVIAR JSON [FEEDBACK]
    this.feedbackService.enviarFeedback(novoFeedback).subscribe({
      next: (salvo) => {
        this.feedbacksEnviados.push(salvo);
        this.mostrarPopup(`Obrigado pelo seu feedback, ${salvo.nomeUsuario}! Sua mensagem foi registrada.`);
        this.limparFormulario();
      },
      error: () => {
        this.mostrarPopup('Erro ao enviar o feedback.', 'erro');
      }
    });
  }

  // LIMPAR INPUTS [FORMULÁRIO]
  limparFormulario() {
    this.assunto = '';
    this.mensagemTexto = '';
    this.assunto = 'duvida';
    this.verificarCampos();
  }

  // BUSCAR TERMOS
  buscar(): void {
    const termoLimpo = this.termoBusca.trim().toLowerCase();

    // NENHUM TERMO DIGITADO
    if (termoLimpo === '') {
      this.mostrarPopup('Por favor, digite uma dúvida antes de buscar.', 'aviso');
      return;
    }

    // PREENCHER LISTA EM RELAÇÃO AO TERMO BUSCADO
    this.faqService.listarPerguntas().subscribe({
      next: (perguntas) => {
        this.perguntasFaq = perguntas.filter(
          (item) =>
            item.pergunta.toLowerCase().includes(termoLimpo) ||
            item.resposta.toLowerCase().includes(termoLimpo)
        );

        // LISTA RETORNOU VAZIA
        if (this.perguntasFaq.length === 0) {
          this.mostrarPopup('Nenhuma pergunta encontrada.', 'aviso');
        }
      },
      error: () => {
        this.mostrarPopup('Erro ao buscar no servidor.', 'erro');
      }
    });
  }

  // LIMPAR INPUTS [BUSCA]
  limparBusca(): void {
    this.termoBusca = '';
    this.carregarFaq();
  }

  // POP-UP [VARIÁVEIS]
  mensagemPopup = '';
  tipoPopup = '';

  // POP-UP
  mostrarPopup(mensagem: string, tipo: string = 'sucesso') {
    this.mensagemPopup = mensagem;
    this.tipoPopup = tipo;

    setTimeout(() => {
      this.mensagemPopup = '';
    }, 3000);
  }
}