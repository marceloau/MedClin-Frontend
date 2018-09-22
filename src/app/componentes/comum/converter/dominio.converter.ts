import { TipoLogradouro } from './../../../model/tipologradouro.model';
import { Estado } from '../../../model/estado.model';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { Constantes } from '../constantes.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class DominioConverter {

  converterListaParaFrontend(listaObjeto: Array<any>, dominio: string): Array<any> {
    const listaObjetoRetorno = new Array<any>();
    for (const index of listaObjeto) {
      listaObjetoRetorno.push(this.converterParaFrontend(index, dominio));
    }
    return listaObjetoRetorno;
  }

  converterParaFrontend(objeto: any, dominio: string): any {

    let objetoRetorno: any;

    if (dominio === Constantes.DOMINIO_ESTADO_CIVIL) {
      objetoRetorno = new EstadoCivil();
      objetoRetorno.codigo = objeto.codigoEstadoCivil;
      objetoRetorno.nome = objeto.nomeEstadoCivil;
      objetoRetorno.descricao = objeto.descricaoEstadoCivil;
      objetoRetorno.flagAtivo = objeto.flagAtivo;
      objetoRetorno.dataCriacao = objeto.dataCriacao;
      objetoRetorno.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetorno.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    } else if (dominio === Constantes.DOMINIO_ESTADO) {
      objetoRetorno = new Estado();
      objetoRetorno.codigo = objeto.codigoEstado;
      objetoRetorno.nomeEstado = objeto.nomeEstado;
      objetoRetorno.siglaEstado = objeto.siglaEstado;
      objetoRetorno.descricao = objeto.descricaoEstado;
      objetoRetorno.flagAtivo = objeto.flagAtivo;
      objetoRetorno.dataCriacao = objeto.dataCriacao;
      objetoRetorno.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetorno.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    } else if (dominio === Constantes.DOMINIO_TIPO_LOGRADOURO) {
      objetoRetorno = new TipoLogradouro();
      objetoRetorno.codigo = objeto.codigoTipoLogradouro;
      objetoRetorno.nome = objeto.nomeTipoLogradouro;
      objetoRetorno.descricao = objeto.descricaoTipoLogradouro;
      objetoRetorno.flagAtivo = objeto.flagAtivo;
      objetoRetorno.dataCriacao = objeto.dataCriacao;
      objetoRetorno.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetorno.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    }

    return objetoRetorno;
  }

}
