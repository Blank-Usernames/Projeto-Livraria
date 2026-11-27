export type TipoAssunto = 'duvida' | 'sugestao' | 'reclamacao';

export interface FormularioFeedback {
  id?: string | number;
  nomeUsuario: string;
  emailUsuario: string;
  assunto: TipoAssunto | string;
  mensagemTexto: string;
  dataEnvio?: string;
}