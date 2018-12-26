import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class Excecao {

  mensagem: Mensagem;

  exibirExcecao(erro: any): Mensagem {
    this.mensagem = new Mensagem();
    if (erro.status === Constantes.ERRO_CONFLITO) {
      this.mensagem.titulo = erro.msg;
      this.mensagem.codigoTipo = 1;
      erro.erros.forEach(error => {
        if (this.mensagem.texto) {
          this.mensagem.texto = this.mensagem.texto + error.mensagem + ' \n ';
        } else {
          this.mensagem.texto = error.mensagem + '\n';
        }
      });
    } else if (erro.status === Constantes.ERRO_INTERNAL_SERVER) {
      this.mensagem.titulo = 'Erro interno do Servidor';
      this.mensagem.codigoTipo = 1;
      this.mensagem.texto = 'Ocorreu um erro interno no Servidor, contate o administrador.';
    }
    return this.mensagem;
  }

}
