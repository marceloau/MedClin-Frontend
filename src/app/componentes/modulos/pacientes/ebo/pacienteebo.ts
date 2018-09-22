import { EstadoCivil } from './../../../../model/estadocivil.model';
import { Endereco } from '../../../../model/endereco.model';
import { Contato } from '../../../../model/contato.model';
import { PlanoSaude } from '../../../../model/planosaude.model';
export class PacienteEBO {

  codigoPessoa: number;
  nomePessoa: string;
  numeroCpf: string;
  numeroRg: string;
  orgamEmissor: string;
  naturalidade: string;
  nacionalidade: string;
  sexo: string;
  dataNascimento: Date;
  informacaoAdicional: string;
  estadoCivil = new EstadoCivil();
  enderecos = new Array<Endereco>();
  contatos = new Array<Contato>();
  numeroCartaoSus: string;
  nomeProfissao: string;
  nomePai: string;
  nomeMae: string;
  listaPlanoSaudePaciente = new Array<PlanoSaude>();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;

}
