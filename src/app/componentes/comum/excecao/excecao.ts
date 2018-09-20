import { Injectable } from '@angular/core';
import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class Excecao {

  mensagem: Mensagem;

  exibirExcecao(erro: any): Mensagem {

    this.mensagem = new Mensagem();

    return this.mensagem;

  }

}
