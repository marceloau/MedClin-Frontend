import { EstadoCivilEBO } from './../ebo/estadocivilebo';
import { TipoLogradouro } from './../../../model/tipologradouro.model';
import { Estado } from '../../../model/estado.model';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { Constantes } from '../constantes.enum';
import { Injectable } from '@angular/core';
import { EstadoEBO } from '../ebo/estadoebo';
import { TipoLogradouroEBO } from '../ebo/tipologradouroebo';

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
    if (objeto) {
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
    }

    return objetoRetorno;
  }

  converterParaBackend(objeto: any, dominio: string): any {

    let objetoRetornoEBO: any;

    if (dominio === Constantes.DOMINIO_ESTADO_CIVIL) {
      objetoRetornoEBO = new EstadoCivilEBO();
      objetoRetornoEBO.codigoEstadoCivil = objeto.codigo;
      objetoRetornoEBO.nomeEstadoCivil = objeto.nome;
      objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
      objetoRetornoEBO.dataCriacao = objeto.dataCriacao;
      objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    } else if (dominio === Constantes.DOMINIO_ESTADO) {
      objetoRetornoEBO = new EstadoEBO();
      objetoRetornoEBO.codigoEstado = objeto.codigo;
      objetoRetornoEBO.nomeEstado = objeto.nome;
      objetoRetornoEBO.siglaEstado = objeto.siglaEstado;
      objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
      objetoRetornoEBO.dataCriacao = objeto.dataCriacao;
      objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    } else if (dominio === Constantes.DOMINIO_TIPO_LOGRADOURO) {
      objetoRetornoEBO = new TipoLogradouroEBO();
      objetoRetornoEBO.codigoTipoLogradouro = objeto.codigo;
      objetoRetornoEBO.nomeTipoLogradouro = objeto.nome;
      objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
      objetoRetornoEBO.dataCriacao = objeto.dataCriacao;
      objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
      objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    }

    return objetoRetornoEBO;
  }

}
