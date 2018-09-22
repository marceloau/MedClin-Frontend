import { EnderecoConverter } from './../../../comum/converter/endereco.converter';
import { DominioConverter } from './../../../comum/converter/dominio.converter';
import { Paciente } from './../../../../model/paciente.model';
import { PacienteEBO } from '../ebo/pacienteebo';
import { Injectable } from '@angular/core';
import { Constantes } from '../../../comum/constantes.enum';
import { ContatoConverter } from '../../../comum/converter/contato.converter';
import { PlanoSaudeConverter } from '../../../comum/converter/planosaude.converter';

@Injectable({
  providedIn: 'root',
})
export class PacienteConverter {

  constructor(private dominioConverter: DominioConverter, private enderecoConverter: EnderecoConverter,
    private contatoConverter: ContatoConverter, private planoSaudeConverter: PlanoSaudeConverter) { }

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
    pacienteEBO.dataNascimento = paciente.dataNascimento;
    pacienteEBO.informacaoAdicional = paciente.informacaoAdicional;
    pacienteEBO.estadoCivil = this.dominioConverter.converterParaBackend(paciente.estadoCivil, Constantes.DOMINIO_ESTADO_CIVIL);
    pacienteEBO.nomePai = paciente.nomePai;
    pacienteEBO.nomeMae = paciente.nomeMae;
    pacienteEBO.nomeProfissao = paciente.profissao;
    pacienteEBO.enderecos.push(this.enderecoConverter.converterParaBackend(paciente.endereco));
    pacienteEBO.contatos.push(this.contatoConverter.converterParaBackend(paciente.contato));
    pacienteEBO.listaPlanoSaudePaciente.push(this.planoSaudeConverter.converterParaBackend(paciente.planoSaude));
    pacienteEBO.numeroCartaoSus = paciente.numeroCartaoSUS;
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
    pacienteRetorno.dataNascimento = pacienteEBO.dataNascimento;
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
    pacienteRetorno.numeroCartaoSUS = pacienteEBO.numeroCartaoSus;
    pacienteRetorno.flagAtivo = pacienteEBO.flagAtivo;
    pacienteRetorno.dataCriacao = pacienteEBO.dataCriacao;
    pacienteRetorno.dataUltimaAlteracao = pacienteEBO.dataUltimaAlteracao;
    pacienteRetorno.usuarioUltimaAlteracao = pacienteEBO.usuarioUltimaAlteracao;
    return pacienteRetorno;
  }

}
