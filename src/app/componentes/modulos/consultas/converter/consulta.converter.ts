import { SolicitacaoMedicamentoConverter } from './solicitacaomedicamento.converter';
import { SolicitacaoExameConverter } from './solicitacaoexame.converter';
import { PacienteConverter } from './../../pacientes/converter/paciente.converter';
import { ConsultaEBO } from './../ebo/consultaebo';
import { Consulta } from './../../../../model/consulta.model';
import { MedicoConverter } from './../../medicos/converter/medico.converter';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';

@Injectable({
  providedIn: 'root',
})
export class ConsultaConverter {

  constructor(private datePipe: DatePipe, private medicoConverter: MedicoConverter, private pacienteConverter: PacienteConverter,
    private solicitacaoExameConverter: SolicitacaoExameConverter,
    private solicitacaoMedicamentoConverter: SolicitacaoMedicamentoConverter) { }

  converterParaBackend(consulta: Consulta): ConsultaEBO {
    const consultaEBO = new ConsultaEBO();
    consultaEBO.codigoConsulta = consulta.codigo;
    consultaEBO.codigoStatusConsulta = consulta.codigoStatusConsulta;
    consultaEBO.paciente = this.pacienteConverter.converterParaBackend(consulta.paciente);
    consultaEBO.medico = this.medicoConverter.converterParaBackend(consulta.medico);
    consultaEBO.flagConfirmada = consulta.flagConfirmada;
    consultaEBO.flagPrimeiraConsulta = consulta.flagPrimeiraConsulta;
    if (consulta.listaSolicitacaoExame && consulta.listaSolicitacaoExame.length > 0) {
      consultaEBO.listaSolicitacaoExame = this.solicitacaoExameConverter.converterListaParaBackend(consulta.listaSolicitacaoExame);
    } else {
      consultaEBO.listaSolicitacaoExame = null;
    }
    if (consulta.listaSolicitacaoMedicamento && consulta.listaSolicitacaoMedicamento.length > 0) {
      consultaEBO.listaSolicitacaoMedicamento = this.solicitacaoMedicamentoConverter
      .converterListaParaBackend(consulta.listaSolicitacaoMedicamento);
    } else {
      consultaEBO.listaSolicitacaoMedicamento = null;
    }
    if (consulta.dataAtendimento) {
      consultaEBO.dataAtendimento = this.datePipe.transform(consulta.dataAtendimento, Constantes.FORMATO_DATA_BACKEND);
    }
    if (consulta.dataConsulta) {
      consultaEBO.dataConsulta = this.datePipe.transform(consulta.dataConsulta, Constantes.FORMATO_DATA_BACKEND);
    }
    consultaEBO.flagAtivo = consulta.flagAtivo;
    consultaEBO.dataCriacao = consulta.dataCriacao;
    consultaEBO.dataUltimaAlteracao = consulta.dataUltimaAlteracao;
    consultaEBO.usuarioUltimaAlteracao = consulta.usuarioUltimaAlteracao;

    return consultaEBO;

  }

  converterListaParaFrontend(listaConsulta: Array<ConsultaEBO>): Array<Consulta> {
    const listaConsultaRetorno = new Array<Consulta>();
    for (const index of listaConsulta) {
      listaConsultaRetorno.push(this.converterParaFrontend(index));
    }
    return listaConsultaRetorno;
  }

  converterParaFrontend(consultaEBO: ConsultaEBO): Consulta {
    const consultaRetorno = new Consulta();
    consultaRetorno.codigo = consultaEBO.codigoConsulta;
    consultaRetorno.codigoStatusConsulta = consultaEBO.codigoStatusConsulta;
    consultaRetorno.paciente = this.pacienteConverter.converterParaFrontend(consultaEBO.paciente);
    consultaRetorno.medico = this.medicoConverter.converterParaFrontend(consultaEBO.medico);
    consultaRetorno.flagConfirmada = consultaEBO.flagConfirmada;
    consultaRetorno.flagPrimeiraConsulta = consultaEBO.flagPrimeiraConsulta;
    if (consultaEBO.dataAtendimento) {
      consultaRetorno.dataAtendimento = this.datePipe.transform(consultaEBO.dataAtendimento, Constantes.FORMATO_DATA_FRONTEND_COMBO);
    }
    if (consultaEBO.dataConsulta) {
      consultaRetorno.dataConsulta = this.datePipe.transform(consultaEBO.dataConsulta, Constantes.FORMATO_DATA_FRONTEND_COMBO);
    }
    if (consultaEBO.listaSolicitacaoExame && consultaRetorno.listaSolicitacaoExame.length > 0) {
      consultaRetorno.listaSolicitacaoExame = this.solicitacaoExameConverter.converterListaParaFrontend(consultaEBO.listaSolicitacaoExame);
    } else {
      consultaRetorno.listaSolicitacaoExame = null;
    }
    if (consultaEBO.listaSolicitacaoMedicamento && consultaEBO.listaSolicitacaoMedicamento.length > 0) {
      consultaRetorno.listaSolicitacaoMedicamento = this.solicitacaoMedicamentoConverter
      .converterListaParaFrontend(consultaEBO.listaSolicitacaoMedicamento);
    } else {
      consultaRetorno.listaSolicitacaoMedicamento = null;
    }
    consultaRetorno.flagAtivo = consultaEBO.flagAtivo;
    consultaRetorno.dataCriacao = consultaEBO.dataCriacao;
    consultaRetorno.dataUltimaAlteracao = consultaEBO.dataUltimaAlteracao;
    consultaRetorno.usuarioUltimaAlteracao = consultaEBO.usuarioUltimaAlteracao;
    return consultaRetorno;
  }

}
