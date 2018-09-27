import { PlanoSaude } from './planosaude.model';
import { Endereco } from './endereco.model';
import { Contato } from './contato.model';
import { EstadoCivil } from './estadocivil.model';

export class Paciente {

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
  nomePai: string;
  nomeMae: string;
  profissao: string;
  endereco = new Endereco();
  contato = new Contato();
  planoSaude = new PlanoSaude();
  numeroCartaoSUS: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
