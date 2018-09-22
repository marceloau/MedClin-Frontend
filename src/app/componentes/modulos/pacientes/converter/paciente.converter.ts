import { Paciente } from './../../../../model/paciente.model';
import { PacienteEBO } from '../ebo/pacienteebo';
import { Injectable } from '@angular/core';

@Injectable()
export class PacienteConverter {

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
    pacienteEBO.estadoCivil = paciente.estadoCivil;
    pacienteEBO.nomePai = paciente.nomePai;
    pacienteEBO.nomeMae = paciente.nomeMae;
    pacienteEBO.nomeProfissao = paciente.profissao;
    pacienteEBO.enderecos.push(paciente.endereco);
    pacienteEBO.contatos.push(paciente.contato);
    pacienteEBO.listaPlanoSaudePaciente.push(paciente.planoSaude);
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
    pacienteRetorno.estadoCivil = pacienteEBO.estadoCivil;
    pacienteRetorno.nomePai = pacienteEBO.nomePai;
    pacienteRetorno.nomeMae = pacienteEBO.nomeMae;
    pacienteRetorno.profissao = pacienteEBO.nomeProfissao;
    pacienteRetorno.endereco = pacienteEBO.enderecos[0];
    pacienteRetorno.contato = pacienteEBO.contatos[0];
    pacienteRetorno.planoSaude = pacienteEBO.listaPlanoSaudePaciente[0];
    pacienteRetorno.numeroCartaoSUS = pacienteEBO.numeroCartaoSus;
    pacienteRetorno.flagAtivo = pacienteEBO.flagAtivo;
    pacienteRetorno.dataCriacao = pacienteEBO.dataCriacao;
    pacienteRetorno.dataUltimaAlteracao = pacienteEBO.dataUltimaAlteracao;
    pacienteRetorno.usuarioUltimaAlteracao = pacienteEBO.usuarioUltimaAlteracao;
    return pacienteRetorno;
  }

}
