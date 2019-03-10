import { Injectable } from '@angular/core';

@Injectable()
export class Utils {

  retornarNomeUsuarioResumido (nome: String): String {
    let retorno: String = '';

    if (nome) {
      const splitNome = nome.split(' ', 2);
      retorno = splitNome[0];
      if (splitNome.length > 1) {
        retorno = retorno + ' ' + splitNome[1];
      }
    }
    return retorno;
  }
}
