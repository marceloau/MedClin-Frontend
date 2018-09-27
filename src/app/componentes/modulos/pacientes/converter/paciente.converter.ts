import { DatePipe } from '@angular/common';
import { EnderecoConverter } from './../../../comum/converter/endereco.converter';
import { DominioConverter } from './../../../comum/converter/dominio.converter';
import { Paciente } from './../../../../model/paciente.model';
import { PacienteEBO } from '../ebo/pacienteebo';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes';
import { ContatoConverter } from '../../../comum/converter/contato.converter';
import { PlanoSaudeConverter } from '../../../comum/converter/planosaude.converter';
import { DataPipe } from '../../../comum/pipe/data.pipe';

@Injectable({
  providedIn: 'root',
})
export class PacienteConverter {

  constructor(private dominioConverter: DominioConverter, private enderecoConverter: EnderecoConverter,
    private contatoConverter: ContatoConverter, private planoSaudeConverter: PlanoSaudeConverter,
    private datePipe: DatePipe) { }

  converterParaBackend(paciente: Paciente): PacienteEBO {
    const pacienteEBO = new PacienteEBO();
    pacienteEBO.codigoPessoa = paciente.codigo;
    pacienteEBO.nomePessoa = paciente.nome;
    pacienteEBO.numeroCpf = paciente.cpf;
    pacienteEBO.numeroRg = paciente.rg;
    pacienteEBO.orgamEmissor = paciente.orgaoEmissor;
    pacienteEBO.naturalidade = paciente.naturalidade;
    pacienteEBO.nacionalidade = paciente.nacionalidade;
    pacienteEBO.sexo = paciente.sexo;
    if (paciente.dataNascimento) {
      pacienteEBO.dataNascimento = this.datePipe.transform(paciente.dataNascimento, Constantes.FORMATO_DATA_BACKEND);
    }
    pacienteEBO.informacaoAdicional = paciente.informacaoAdicional;
    if (paciente.estadoCivil && paciente.estadoCivil.codigo) {
      pacienteEBO.estadoCivil = this.dominioConverter.converterParaBackend(paciente.estadoCivil, Constantes.DOMINIO_ESTADO_CIVIL);
    }
    pacienteEBO.nomePai = paciente.nomePai;
    pacienteEBO.nomeMae = paciente.nomeMae;
    pacienteEBO.nomeProfissao = paciente.profissao;
    if (paciente.endereco) {
      pacienteEBO.enderecos.push(this.enderecoConverter.converterParaBackend(paciente.endereco));
    }
    if (paciente.contato && (paciente.contato.textoContato ||
      (paciente.contato.tipoContato && paciente.contato.tipoContato.codigo))) {
      pacienteEBO.contatos.push(this.contatoConverter.converterParaBackend(paciente.contato));
    }
    if (paciente.planoSaude) {
      pacienteEBO.listaPlanoSaudePaciente.push(this.planoSaudeConverter.converterParaBackend(paciente.planoSaude));
    }
    pacienteEBO.numeroCartaoSUS = paciente.numeroCartaoSUS;
    pacienteEBO.flagAtivo = paciente.flagAtivo;
    pacienteEBO.dataCriacao = paciente.dataCriacao;
    pacienteEBO.dataUltimaAlteracao = paciente.dataUltimaAlteracao;
    pacienteEBO.usuarioUltimaAlteracao = paciente.usuarioUltimaAlteracao;

    return pacienteEBO;

  }

  converterListaParaFrontend(listaPaciente: Array<PacienteEBO>): Array<Paciente> {
    const listaPacienteRetorno = new Array<Paciente>();
    for (const index of listaPaciente) {
      listaPacienteRetorno.push(this.converterParaFrontend(index));
    }
    return listaPacienteRetorno;
  }

  converterParaFrontend(pacienteEBO: PacienteEBO): Paciente {
    const pacienteRetorno = new Paciente();
    pacienteRetorno.codigo = pacienteEBO.codigoPessoa;
    pacienteRetorno.nome = pacienteEBO.nomePessoa;
    pacienteRetorno.cpf = pacienteEBO.numeroCpf;
    pacienteRetorno.rg = pacienteEBO.numeroRg;
    pacienteRetorno.orgaoEmissor = pacienteEBO.orgamEmissor;
    pacienteRetorno.naturalidade = pacienteEBO.naturalidade;
    pacienteRetorno.nacionalidade = pacienteEBO.nacionalidade;
    pacienteRetorno.sexo = pacienteEBO.sexo;
    if (pacienteEBO.dataNascimento) {
      pacienteRetorno.dataNascimento = this.datePipe.transform(pacienteEBO.dataNascimento, Constantes.FORMATO_DATA_FRONTEND);
    }
    pacienteRetorno.informacaoAdicional = pacienteEBO.informacaoAdicional;
    pacienteRetorno.estadoCivil = this.dominioConverter.converterParaFrontend(pacienteEBO.estadoCivil, Constantes.DOMINIO_ESTADO_CIVIL);
    pacienteRetorno.nomePai = pacienteEBO.nomePai;
    pacienteRetorno.nomeMae = pacienteEBO.nomeMae;
    pacienteRetorno.profissao = pacienteEBO.nomeProfissao;
    if (pacienteEBO.enderecos) {
      pacienteRetorno.endereco = this.enderecoConverter.converterParaFrontend(pacienteEBO.enderecos[0]);
    }
    if (pacienteEBO.contatos) {
      pacienteRetorno.contato = this.contatoConverter.converterParaFrontend(pacienteEBO.contatos[0]);
    }
    if (pacienteEBO.listaPlanoSaudePaciente) {
      pacienteRetorno.planoSaude = this.planoSaudeConverter.converterParaFrontend(pacienteEBO.listaPlanoSaudePaciente[0]);
    }
    pacienteRetorno.numeroCartaoSUS = pacienteEBO.numeroCartaoSUS;
    pacienteRetorno.flagAtivo = pacienteEBO.flagAtivo;
    pacienteRetorno.dataCriacao = pacienteEBO.dataCriacao;
    pacienteRetorno.dataUltimaAlteracao = pacienteEBO.dataUltimaAlteracao;
    pacienteRetorno.usuarioUltimaAlteracao = pacienteEBO.usuarioUltimaAlteracao;
    return pacienteRetorno;
  }

}
