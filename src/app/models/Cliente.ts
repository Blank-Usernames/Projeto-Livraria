export class Cliente {
    idUsuario: number;
    nomeUsuario: string;
    senhaUsuario: string;
    cpf: string;
    email: string;

    constructor(idUsuario: number, nomeUsuario: string, senhaUsuario: string, cpf: string, email: string) {
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.senhaUsuario = senhaUsuario;
        this.cpf = cpf;
        this.email = email;
    }
}