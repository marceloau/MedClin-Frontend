import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class Excecao {

  mensagem: Mensagem;

  exibirExcecao(erro: any): Mensagem {
    this.mensagem = new Mensagem();
    if (erro.status === Constantes.ERRO_CONFLITO || erro.codigo === Constantes.ERRO_CONFLITO) {
      this.mensagem.titulo = erro.mensagem;
      this.mensagem.codigoTipo = 1;
      for (const index of erro.erros) {
        if (this.mensagem.texto) {
          this.mensagem.texto = this.mensagem.texto + index.mensagem + ' - ';
        } else {
          this.mensagem.texto = index.mensagem + ' - ';
        }
      }
    } else if (erro.status === Constantes.ERRO_INTERNAL_SERVER || erro.codigo === Constantes.ERRO_INTERNAL_SERVER) {
      this.mensagem.titulo = 'Erro interno do Servidor';
      this.mensagem.codigoTipo = 1;
      this.mensagem.texto = 'Ocorreu um erro interno no Servidor, contate o administrador.';
    }
    return this.mensagem;
  }

}
