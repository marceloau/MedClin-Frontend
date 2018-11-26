import { TipoExameConverter } from './../../tipoExame/converter/tipoexame.converter';
import { Exame } from './../../../../../model/exame.model';
import { Injectable } from '@angular/core';
import { ExameEBO } from '../ebo/exameebo';

@Injectable({
  providedIn: 'root',
})
export class ExameConverter {

  constructor(private tipoExameConverter: TipoExameConverter) {}

  converterParaBackend(exame: Exame): ExameEBO {
    const exameEBO = new ExameEBO();

    exameEBO.codigoExame = exame.codigo;
    exameEBO.nomeExame = exame.nome;
    exameEBO.tipoExame = this.tipoExameConverter.converterParaBackend(exame.tipoExame);
    exameEBO.descricaoExame = exame.descricao;
    exameEBO.flagAtivo = exame.flagAtivo;

    return exameEBO;

  }

  converterListaParaFrontend(listaExame: Array<ExameEBO>): Array<Exame> {
    const listaExameRetorno = new Array<Exame>();
    for (const index of listaExame) {
      listaExameRetorno.push(this.converterParaFrontend(index));
    }
    return listaExameRetorno;
  }

  converterParaFrontend(exameEBO: ExameEBO): Exame {
    const exameRetorno = new Exame();
    exameRetorno.codigo = exameEBO.codigoExame;
    exameRetorno.nome = exameEBO.nomeExame;
    exameRetorno.descricao = exameEBO.descricaoExame;
    exameRetorno.tipoExame = this.tipoExameConverter.converterParaFrontend(exameEBO.tipoExame);
    exameRetorno.flagAtivo = exameEBO.flagAtivo;
    exameRetorno.dataCriacao = exameEBO.dataCriacao;
    exameRetorno.dataUltimaAlteracao = exameEBO.dataUltimaAlteracao;
    exameRetorno.usuarioUltimaAlteracao = exameEBO.usuarioUltimaAlteracao;
    return exameRetorno;
  }

}
