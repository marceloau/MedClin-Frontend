import { EspecialidadeConverter } from '../../cadastro/especialidade/converter/especialidade.converter';
import { DatePipe } from '@angular/common';
import { EnderecoConverter } from '../../../comum/converter/endereco.converter';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';
import { ContatoConverter } from '../../../comum/converter/contato.converter';
import { AgendaMedicoEBO } from '../ebo/agendamedicoebo';
import { AgendaMedico } from '../../../../model/agendamedico.model';
import { setHours, setMinutes, setSeconds } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AgendaMedicoConverter {

  constructor(private dominioConverter: DominioConverter, private enderecoConverter: EnderecoConverter,
    private contatoConverter: ContatoConverter, private datePipe: DatePipe, private especialidadeConverter: EspecialidadeConverter) { }

  converterParaBackend(agendaMedico: AgendaMedico, codigoPessoa: number): AgendaMedicoEBO {
    const agendaMedicoEBORetorno = new AgendaMedicoEBO();
    agendaMedicoEBORetorno.agendaMedicoPK.codigoAgendaMedico = agendaMedico.agendaMedicoPK.codigoAgendaMedico;
    agendaMedicoEBORetorno.agendaMedicoPK.codigoPessoa = codigoPessoa;
    agendaMedicoEBORetorno.diaSemana = agendaMedico.diaSemana;
    if (agendaMedico.horaInicioAtendimento) {
      const hora = agendaMedico.horaInicioAtendimento.split(':');
      agendaMedicoEBORetorno.horaInicioAtendimento = this.datePipe.transform(
        setHours(setMinutes(setSeconds(new Date(), 0), hora[1]), hora[0]), Constantes.FORMATO_DATA_BACKEND);
    }
    if (agendaMedico.horaFinalAtendimento) {
      const hora = agendaMedico.horaFinalAtendimento.split(':');
      agendaMedicoEBORetorno.horaFinalAtendimento = this.datePipe.transform(
        setHours(setMinutes(setSeconds(new Date(), 0), hora[1]), hora[0]), Constantes.FORMATO_DATA_BACKEND);
    }
    agendaMedicoEBORetorno.observacao = agendaMedico.observacao;
    agendaMedicoEBORetorno.flagAtivo = agendaMedico.flagAtivo;
    agendaMedicoEBORetorno.usuarioUltimaAlteracao = agendaMedico.usuarioUltimaAlteracao;
    agendaMedicoEBORetorno.dataUltimaAlteracao = agendaMedico.dataUltimaAlteracao;
    agendaMedicoEBORetorno.dataCriacao = agendaMedico.dataCriacao;
    return agendaMedicoEBORetorno;

  }

  converterListaParaFrontend(listaAgendaMedico: Array<AgendaMedicoEBO>): Array<AgendaMedico> {
    const listaAgendaMedicoRetorno = new Array<AgendaMedico>();
    for (const index of listaAgendaMedico) {
      listaAgendaMedicoRetorno.push(this.converterParaFrontend(index));
    }
    return listaAgendaMedicoRetorno;
  }

  converterParaFrontend(agendaMedicoEBO: AgendaMedicoEBO): AgendaMedico {
    const agendaMedicoRetorno = new AgendaMedicoEBO();
    agendaMedicoRetorno.agendaMedicoPK.codigoAgendaMedico = agendaMedicoEBO.agendaMedicoPK.codigoAgendaMedico;
    agendaMedicoRetorno.agendaMedicoPK.codigoPessoa = agendaMedicoEBO.agendaMedicoPK.codigoPessoa;
    agendaMedicoRetorno.diaSemana = agendaMedicoEBO.diaSemana;
    if ((agendaMedicoEBO.horaInicioAtendimento && agendaMedicoEBO.horaInicioAtendimento.length > 15)
      || (agendaMedicoEBO.horaFinalAtendimento && agendaMedicoEBO.horaFinalAtendimento.length > 15)) {
      if (agendaMedicoEBO.horaInicioAtendimento) {
        agendaMedicoRetorno.horaInicioAtendimento = this.datePipe.transform(
          agendaMedicoEBO.horaInicioAtendimento, Constantes.FORMATO_TIME_FRONTEND);
      }
      if (agendaMedicoEBO.horaFinalAtendimento) {
        agendaMedicoRetorno.horaFinalAtendimento = this.datePipe.transform(
        agendaMedicoEBO.horaFinalAtendimento, Constantes.FORMATO_TIME_FRONTEND);
      }
    } else {
      agendaMedicoRetorno.horaInicioAtendimento = agendaMedicoEBO.horaInicioAtendimento;
      agendaMedicoRetorno.horaFinalAtendimento = agendaMedicoEBO.horaFinalAtendimento;
    }
    agendaMedicoRetorno.observacao = agendaMedicoEBO.observacao;
    agendaMedicoRetorno.flagAtivo = agendaMedicoEBO.flagAtivo;
    agendaMedicoRetorno.usuarioUltimaAlteracao = agendaMedicoEBO.usuarioUltimaAlteracao;
    agendaMedicoRetorno.dataUltimaAlteracao = agendaMedicoEBO.dataUltimaAlteracao;
    agendaMedicoRetorno.dataCriacao = agendaMedicoEBO.dataCriacao;
    return agendaMedicoRetorno;
  }

}
