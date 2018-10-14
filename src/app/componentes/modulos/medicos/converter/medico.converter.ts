import { AgendaMedicoConverter } from './agendamedico.converter';
import { EspecialidadeConverter } from './../../cadastro/especialidade/converter/especialidade.converter';
import { DatePipe } from '@angular/common';
import { EnderecoConverter } from '../../../comum/converter/endereco.converter';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { Medico } from '../../../../model/medico.model';
import { MedicoEBO } from '../ebo/medicoebo';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';
import { ContatoConverter } from '../../../comum/converter/contato.converter';
import { EspecialidadeMedicoEBO } from '../ebo/especialidademedicoebo';

@Injectable({
  providedIn: 'root',
})
export class MedicoConverter {

  constructor(private dominioConverter: DominioConverter, private enderecoConverter: EnderecoConverter,
    private contatoConverter: ContatoConverter, private datePipe: DatePipe, private especialidadeConverter: EspecialidadeConverter,
    private agendaMedicoConverter: AgendaMedicoConverter) { }

  converterParaBackend(medico: Medico): MedicoEBO {
    const medicoEBO = new MedicoEBO();
    medicoEBO.numeroCRM = medico.numeroCRM;
    medicoEBO.codigoPessoa = medico.codigo;
    medicoEBO.nomePessoa = medico.nome;
    medicoEBO.numeroCpf = medico.cpf;
    medicoEBO.numeroRg = medico.rg;
    medicoEBO.orgamEmissor = medico.orgaoEmissor;
    medicoEBO.naturalidade = medico.naturalidade;
    medicoEBO.nacionalidade = medico.nacionalidade;
    medicoEBO.sexo = medico.sexo;
    if (medico.dataNascimento) {
      medicoEBO.dataNascimento = this.datePipe.transform(medico.dataNascimento, Constantes.FORMATO_DATA_BACKEND);
    }
    medicoEBO.informacaoAdicional = medico.informacaoAdicional;
    if (medico.estadoCivil && medico.estadoCivil.codigo) {
      medicoEBO.estadoCivil = this.dominioConverter.converterParaBackend(medico.estadoCivil, Constantes.DOMINIO_ESTADO_CIVIL);
    } else {
      medicoEBO.estadoCivil = undefined;
    }
    if (medico.endereco && ((medico.endereco.enderecoPessoaPK && medico.endereco.enderecoPessoaPK.codigoPessoa)
    || medico.endereco.bairro || medico.endereco.cep
      || medico.endereco.logradouro)) {
        medicoEBO.enderecos.push(this.enderecoConverter.converterParaBackend(medico.endereco));
    }
    if (medico.contato && (medico.contato.textoContato ||
      (medico.contato.tipoContato && medico.contato.tipoContato.codigo))) {
        medicoEBO.contatos.push(this.contatoConverter.converterParaBackend(medico.contato));
    }
    if (medico.listaEspecialidade) {
      for (const index of medico.listaEspecialidade) {
        const especialidadeMedicoEBO = new EspecialidadeMedicoEBO();
        especialidadeMedicoEBO.especialidadeMedicoPK.codigoEspecialidadeMedico = index.codigo;
        especialidadeMedicoEBO.especialidadeMedicoPK.codigoPessoa = medico.codigo;
        especialidadeMedicoEBO.especialidade = this.especialidadeConverter.converterParaBackend(index);
        medicoEBO.listaEspecialidadeMedico.push(especialidadeMedicoEBO);
      }
    } else {
      medicoEBO.listaEspecialidadeMedico = undefined;
    }
    if (medico.listaAgendaMedico) {
      for (const index of medico.listaAgendaMedico) {
        medicoEBO.listaAgendaMedico.push(this.agendaMedicoConverter.converterParaBackend(index, medico.codigo));
      }
    }
    medicoEBO.numeroCRM = medico.numeroCRM;
    medicoEBO.flagAtivo = medico.flagAtivo;
    medicoEBO.dataCriacao = medico.dataCriacao;
    medicoEBO.dataUltimaAlteracao = medico.dataUltimaAlteracao;
    medicoEBO.usuarioUltimaAlteracao = medico.usuarioUltimaAlteracao;

    return medicoEBO;

  }

  converterListaParaFrontend(listaMedico: Array<MedicoEBO>): Array<Medico> {
    const listaMedicoRetorno = new Array<Medico>();
    for (const index of listaMedico) {
      listaMedicoRetorno.push(this.converterParaFrontend(index));
    }
    return listaMedicoRetorno;
  }

  converterParaFrontend(medicoEBO: MedicoEBO): Medico {
    const medicoRetorno = new Medico();
    medicoRetorno.codigo = medicoEBO.codigoPessoa;
    medicoRetorno.nome = medicoEBO.nomePessoa;
    medicoRetorno.cpf = medicoEBO.numeroCpf;
    medicoRetorno.rg = medicoEBO.numeroRg;
    medicoRetorno.orgaoEmissor = medicoEBO.orgamEmissor;
    medicoRetorno.naturalidade = medicoEBO.naturalidade;
    medicoRetorno.nacionalidade = medicoEBO.nacionalidade;
    medicoRetorno.sexo = medicoEBO.sexo;
    if (medicoEBO.dataNascimento) {
      medicoRetorno.dataNascimento = this.datePipe.transform(medicoEBO.dataNascimento, Constantes.FORMATO_DATA_FRONTEND);
    }
    medicoRetorno.informacaoAdicional = medicoEBO.informacaoAdicional;
    medicoRetorno.estadoCivil = this.dominioConverter.converterParaFrontend(medicoEBO.estadoCivil, Constantes.DOMINIO_ESTADO_CIVIL);
    if (medicoEBO.enderecos) {
      medicoRetorno.endereco = this.enderecoConverter.converterParaFrontend(medicoEBO.enderecos[0]);
    }
    if (medicoEBO.contatos) {
      medicoRetorno.contato = this.contatoConverter.converterParaFrontend(medicoEBO.contatos[0]);
    }
    if (medicoEBO.listaEspecialidadeMedico) {
      for (const index of medicoEBO.listaEspecialidadeMedico) {
        medicoRetorno.listaEspecialidade.push(this.especialidadeConverter.converterParaFrontend(index.especialidade));
      }
    } else {
      medicoRetorno.listaEspecialidade = undefined;
    }
    if (medicoEBO.listaAgendaMedico) {
      for (const index of medicoEBO.listaAgendaMedico) {
        medicoRetorno.listaAgendaMedico.push(this.agendaMedicoConverter.converterParaFrontend(index));
      }
    }
    medicoRetorno.numeroCRM = medicoEBO.numeroCRM;
    medicoRetorno.flagAtivo = medicoEBO.flagAtivo;
    medicoRetorno.dataCriacao = medicoEBO.dataCriacao;
    medicoRetorno.dataUltimaAlteracao = medicoEBO.dataUltimaAlteracao;
    medicoRetorno.usuarioUltimaAlteracao = medicoEBO.usuarioUltimaAlteracao;
    return medicoRetorno;
  }

}
