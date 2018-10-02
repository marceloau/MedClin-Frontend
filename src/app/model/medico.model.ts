import { AgendaMedico } from './agendamedico.model';
import { Especialidade } from './dominio/especialidade.model';
import { Endereco } from './endereco.model';
import { Contato } from './contato.model';
import { EstadoCivil } from './estadocivil.model';

export class Medico {

  codigo: number;
  nome: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
  naturalidade: string;
  nacionalidade: string;
  sexo: string;
  dataNascimento: any;
  informacaoAdicional: string;
  estadoCivil = new EstadoCivil();
  endereco = new Endereco();
  contato = new Contato();
  listaEspecialidade = new Array<Especialidade>();
  listaAgendaMedico = new Array<AgendaMedico>();
  numeroCRM: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
