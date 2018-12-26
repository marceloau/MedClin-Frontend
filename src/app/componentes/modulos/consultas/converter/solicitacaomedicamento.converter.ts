import { MedicamentoConverter } from './../../cadastro/medicamento/converter/medicamento.converter';
import { SolicitacaoMedicamentoEBO } from './../ebo/solicitacaomedicamentoebo';
import { SolicitacaoMedicamento } from './../../../../model/solicitacaomedicamento.model';
import { SolicitacaoMedicamentoPK } from './../../../../model/solicitacaomedicamentopk.model';
import { ConsultaConverter } from './consulta.converter';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoMedicamentoConverter {

  constructor(private datePipe: DatePipe, private medicamentoConverter: MedicamentoConverter) { }

  converterParaBackend(solicitacaoMedicamento: SolicitacaoMedicamento): SolicitacaoMedicamentoEBO {
    const solicitacaoMedicamentoRetorno = new SolicitacaoMedicamentoEBO();

    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK = new SolicitacaoMedicamentoPK();
    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK.codigoConsulta = solicitacaoMedicamento.solicitacaoMedicamentoPK.codigoConsulta;
    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK.codigoSolicitacaoMedicamento = solicitacaoMedicamento
    .solicitacaoMedicamentoPK.codigoSolicitacaoMedicamento;

    solicitacaoMedicamentoRetorno.flagAtivo = solicitacaoMedicamento.flagAtivo;
    solicitacaoMedicamentoRetorno.dataCriacao = solicitacaoMedicamento.dataCriacao;
    solicitacaoMedicamentoRetorno.dataUltimaAlteracao = solicitacaoMedicamento.dataUltimaAlteracao;
    solicitacaoMedicamentoRetorno.usuarioUltimaAlteracao = solicitacaoMedicamento.usuarioUltimaAlteracao;
    if (solicitacaoMedicamento.dataSolicitacaoMedicamento) {
      solicitacaoMedicamentoRetorno.dataSolicitacaoMedicamento = this.datePipe.transform(
        solicitacaoMedicamento.dataSolicitacaoMedicamento, Constantes.FORMATO_DATA_BACKEND);
    }
    solicitacaoMedicamentoRetorno.medicamento = this.medicamentoConverter.converterParaBackend(solicitacaoMedicamento.medicamento);

    return solicitacaoMedicamentoRetorno;
  }

  converterListaParaFrontend(listaSolicitacaoMedicamento: Array<SolicitacaoMedicamentoEBO>): Array<SolicitacaoMedicamento> {
    const listaSolicitacaoMedicamentoRetorno = new Array<SolicitacaoMedicamento>();
    for (const index of listaSolicitacaoMedicamento) {
      listaSolicitacaoMedicamentoRetorno.push(this.converterParaFrontend(index));
    }
    return listaSolicitacaoMedicamentoRetorno;
  }

  converterListaParaBackend(listaSolicitacaoMedicamento: Array<SolicitacaoMedicamento>): Array<SolicitacaoMedicamentoEBO> {
    const listaSolicitacaoMedicamentoRetorno = new Array<SolicitacaoMedicamentoEBO>();
    for (const index of listaSolicitacaoMedicamento) {
      listaSolicitacaoMedicamentoRetorno.push(this.converterParaBackend(index));
    }
    return listaSolicitacaoMedicamentoRetorno;
  }

  converterParaFrontend(solicitacaoMedicamentoEBO: SolicitacaoMedicamentoEBO): SolicitacaoMedicamento {

    const solicitacaoMedicamentoRetorno = new SolicitacaoMedicamento();

    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK = new SolicitacaoMedicamentoPK();
    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK.codigoConsulta =
    solicitacaoMedicamentoEBO.solicitacaoMedicamentoPK.codigoConsulta;
    solicitacaoMedicamentoRetorno.solicitacaoMedicamentoPK.codigoSolicitacaoMedicamento =
    solicitacaoMedicamentoEBO.solicitacaoMedicamentoPK.codigoSolicitacaoMedicamento;

    solicitacaoMedicamentoRetorno.flagAtivo = solicitacaoMedicamentoEBO.flagAtivo;
    solicitacaoMedicamentoRetorno.dataCriacao = solicitacaoMedicamentoEBO.dataCriacao;
    solicitacaoMedicamentoRetorno.dataUltimaAlteracao = solicitacaoMedicamentoEBO.dataUltimaAlteracao;
    solicitacaoMedicamentoRetorno.usuarioUltimaAlteracao = solicitacaoMedicamentoEBO.usuarioUltimaAlteracao;
    if (solicitacaoMedicamentoEBO.dataSolicitacaoMedicamento) {
      solicitacaoMedicamentoRetorno.dataSolicitacaoMedicamento = this.datePipe.transform(
        solicitacaoMedicamentoEBO.dataSolicitacaoMedicamento, Constantes.FORMATO_DATA_FRONTEND);
    }
    solicitacaoMedicamentoRetorno.medicamento = this.medicamentoConverter.converterParaFrontend(solicitacaoMedicamentoEBO.medicamento);

    return solicitacaoMedicamentoRetorno;
  }

}
