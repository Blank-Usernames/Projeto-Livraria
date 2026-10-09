export class Livro {
    idLivro: number;
    tituloLivro: string;
    autorLivro: string;
    genero: string;
    descricao: string;
    dataLancamento: Date;
    qtdPagina: number;
    precoLivro: number;
    imagemLivro: string;

    constructor(idLivro: number, tituloLivro: string, autorLivro: string, genero: string, descricao: string, dataLancamento: Date, qtdPagina: number, precoLivro: number, imagemLivro: string) {
        this.idLivro = idLivro;
        this.tituloLivro = tituloLivro;
        this.autorLivro = autorLivro;
        this.genero = genero;
        this.descricao = descricao;
        this.dataLancamento = dataLancamento;
        this.qtdPagina = qtdPagina;
        this.precoLivro = precoLivro;
        this.imagemLivro = imagemLivro;
    }

}