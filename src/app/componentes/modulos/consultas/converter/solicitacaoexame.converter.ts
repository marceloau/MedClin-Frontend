import { Consulta } from './../../../../model/consulta.model';
import { Exame } from './../../../../model/exame.model';
import { ExameConverter } from './../../cadastro/exame/converter/exame.converter';
import { SolicitacaoExameEBO } from './../ebo/solicitacaoexameebo';
import { SolicitacaoExamePK } from './../../../../model/solicitacaoexamepk.model';
import { SolicitacaoExame } from './../../../../model/solicitacaoexame.model';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoExameConverter {

  constructor(private datePipe: DatePipe, private exameConverter: ExameConverter) { }

  converterParaBackend(solicitacaoExame: SolicitacaoExame): SolicitacaoExameEBO {
    const solicitacaoExameRetorno = new SolicitacaoExameEBO();

    solicitacaoExameRetorno.solicitacaoExamePK = new SolicitacaoExamePK();
    solicitacaoExameRetorno.solicitacaoExamePK.codigoConsulta = solicitacaoExame.solicitacaoExamePK.codigoConsulta;
    solicitacaoExameRetorno.solicitacaoExamePK.codigoSolicitacaoExame = solicitacaoExame.solicitacaoExamePK.codigoSolicitacaoExame;

    solicitacaoExameRetorno.flagAtivo = solicitacaoExame.flagAtivo;
    solicitacaoExameRetorno.dataCriacao = solicitacaoExame.dataCriacao;
    solicitacaoExameRetorno.dataUltimaAlteracao = solicitacaoExame.dataUltimaAlteracao;
    solicitacaoExameRetorno.usuarioUltimaAlteracao = solicitacaoExame.usuarioUltimaAlteracao;
    solicitacaoExameRetorno.consulta = undefined;
    if (solicitacaoExame.dataSolicitacaoExame) {
      solicitacaoExameRetorno.dataSolicitacaoExame = this.datePipe.transform(
        solicitacaoExame.dataSolicitacaoExame, Constantes.FORMATO_DATA_BACKEND);
    }
    solicitacaoExameRetorno.exame = this.exameConverter.converterParaBackend(solicitacaoExame.exame);

    return solicitacaoExameRetorno;
  }

  converterListaParaFrontend(listaSolicitacaoExame: Array<SolicitacaoExameEBO>): Array<SolicitacaoExame> {
    const listaSolicitacaoExameRetorno = new Array<SolicitacaoExame>();
    for (const index of listaSolicitacaoExame) {
      listaSolicitacaoExameRetorno.push(this.converterParaFrontend(index));
    }
    return listaSolicitacaoExameRetorno;
  }

  converterListaParaBackend(listaSolicitacaoExame: Array<SolicitacaoExame>): Array<SolicitacaoExameEBO> {
    const listaSolicitacaoExameRetorno = new Array<SolicitacaoExameEBO>();
    for (const index of listaSolicitacaoExame) {
      listaSolicitacaoExameRetorno.push(this.converterParaBackend(index));
    }
    return listaSolicitacaoExameRetorno;
  }

  converterParaFrontend(solicitacaoExameEBO: SolicitacaoExameEBO): SolicitacaoExame {

    const solicitacaoExameRetorno = new SolicitacaoExame();

    solicitacaoExameRetorno.solicitacaoExamePK = new SolicitacaoExamePK();
    solicitacaoExameRetorno.solicitacaoExamePK.codigoConsulta = solicitacaoExameEBO.solicitacaoExamePK.codigoConsulta;
    solicitacaoExameRetorno.solicitacaoExamePK.codigoSolicitacaoExame = solicitacaoExameEBO.solicitacaoExamePK.codigoSolicitacaoExame;

    solicitacaoExameRetorno.flagAtivo = solicitacaoExameEBO.flagAtivo;
    solicitacaoExameRetorno.dataCriacao = solicitacaoExameEBO.dataCriacao;
    solicitacaoExameRetorno.dataUltimaAlteracao = solicitacaoExameEBO.dataUltimaAlteracao;
    solicitacaoExameRetorno.usuarioUltimaAlteracao = solicitacaoExameEBO.usuarioUltimaAlteracao;
    if (solicitacaoExameEBO.dataSolicitacaoExame) {
      solicitacaoExameRetorno.dataSolicitacaoExame = this.datePipe.transform(
        solicitacaoExameEBO.dataSolicitacaoExame, Constantes.FORMATO_DATA_FRONTEND);
    }
    solicitacaoExameRetorno.exame = this.exameConverter.converterParaFrontend(solicitacaoExameEBO.exame);

    return solicitacaoExameRetorno;
  }

  converterExameParaSolicitacaoExame(exame: Exame, consulta: Consulta): SolicitacaoExame {
    const retorno = new SolicitacaoExame();

    retorno.dataSolicitacaoExame = new Date();
    retorno.exame = exame;
    retorno.flagAtivo = 'S';
    retorno.solicitacaoExamePK = new SolicitacaoExamePK();
    retorno.solicitacaoExamePK.codigoConsulta = consulta.codigo;

    return retorno;
  }

}
