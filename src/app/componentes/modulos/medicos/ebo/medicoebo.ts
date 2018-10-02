import { AgendaMedicoEBO } from './agendamedicoebo';
import { ContatoEBO } from '../../../comum/ebo/contatoebo';
import { EstadoCivilEBO } from '../../../comum/ebo/estadocivilebo';
import { EnderecoEBO } from '../../../comum/ebo/enderecoebo';
import { EspecialidadeMedicoEBO } from './especialidademedicoebo';
export class MedicoEBO {

  codigoPessoa: number;
  nomePessoa: string;
  numeroCpf: string;
  numeroRg: string;
  orgamEmissor: string;
  naturalidade: string;
  nacionalidade: string;
  sexo: string;
  dataNascimento: any;
  informacaoAdicional: string;
  estadoCivil = new EstadoCivilEBO();
  enderecos = new Array<EnderecoEBO>();
  contatos = new Array<ContatoEBO>();
  numeroCRM: string;
  listaEspecialidadeMedico = new Array<EspecialidadeMedicoEBO>();
  listaAgendaMedico = new Array<AgendaMedicoEBO>();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;

}
