import { EspecialidadeConverter } from '../../cadastro/especialidade/converter/especialidade.converter';
import { DatePipe } from '@angular/common';
import { EnderecoConverter } from '../../../comum/converter/endereco.converter';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';
import { ContatoConverter } from '../../../comum/converter/contato.converter';
import { AgendaMedicoEBO } from '../ebo/agendamedicoebo';
import { AgendaMedico } from '../../../../model/agendamedico.model';

@Injectable({
  providedIn: 'root',
})
export class AgendaMedicoConverter {

  constructor(private dominioConverter: DominioConverter, private enderecoConverter: EnderecoConverter,
    private contatoConverter: ContatoConverter, private datePipe: DatePipe, private especialidadeConverter: EspecialidadeConverter) { }

  converterParaBackend(agendaMedico: AgendaMedico): AgendaMedicoEBO {
    const agendaMedicoEBORetorno = new AgendaMedicoEBO();
    agendaMedicoEBORetorno.agendaMedicoPK.codigoAgendaMedico = agendaMedico.agendaMedicoPK.codigoAgendaMedico;
    agendaMedicoEBORetorno.agendaMedicoPK.codigoPessoa = agendaMedico.agendaMedicoPK.codigoPessoa;
    if (agendaMedico.dataAtendimento) {
      agendaMedicoEBORetorno.dataAtendimento = this.datePipe.transform(agendaMedico.dataAtendimento, Constantes.FORMATO_DATA_FRONTEND);
    }
    if (agendaMedico.horaInicioAtendimento) {
      agendaMedicoEBORetorno.horaInicioAtendimento = this.datePipe.transform(
        agendaMedico.horaInicioAtendimento, Constantes.FORMATO_DATA_FRONTEND);
    }
    if (agendaMedico.horaInicioAtendimento) {
      agendaMedicoEBORetorno.horaFinalAtendimento = this.datePipe.transform(
        agendaMedico.horaFinalAtendimento, Constantes.FORMATO_DATA_FRONTEND);
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
    agendaMedicoRetorno.dataAtendimento = agendaMedicoEBO.dataAtendimento;
    agendaMedicoRetorno.horaInicioAtendimento = agendaMedicoEBO.horaInicioAtendimento;
    agendaMedicoRetorno.horaFinalAtendimento = agendaMedicoEBO.horaFinalAtendimento;
    agendaMedicoRetorno.observacao = agendaMedicoEBO.observacao;
    agendaMedicoRetorno.flagAtivo = agendaMedicoEBO.flagAtivo;
    agendaMedicoRetorno.usuarioUltimaAlteracao = agendaMedicoEBO.usuarioUltimaAlteracao;
    agendaMedicoRetorno.dataUltimaAlteracao = agendaMedicoEBO.dataUltimaAlteracao;
    agendaMedicoRetorno.dataCriacao = agendaMedicoEBO.dataCriacao;
    return agendaMedicoRetorno;
  }

}
