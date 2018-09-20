import { Injectable } from '@angular/core';
import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class Excecao {

  mensagem: Mensagem;

  exibirExcecao(erro: any): Mensagem {
    this.mensagem = new Mensagem();
    if (erro.status === 409) {
      this.mensagem.titulo = erro.msg;
      this.mensagem.codigoTipo = 1;
      erro.erros.forEach(error => {
        if (this.mensagem.texto) {
          this.mensagem.texto = this.mensagem.texto + error.mensagem + ' \n ';
        } else {
          this.mensagem.texto = error.mensagem + '\n';
        }
      });
    }
    return this.mensagem;
  }

}
