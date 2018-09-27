import { ContatoEBO } from './../../../comum/ebo/contatoebo';
import { EstadoCivilEBO } from './../../../comum/ebo/estadocivilebo';
import { EnderecoEBO } from './../../../comum/ebo/enderecoebo';
import { PlanoSaudeEBO } from '../../../comum/ebo/planosaudeEBO';
export class PacienteEBO {

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
  numeroCartaoSUS: string;
  nomeProfissao: string;
  nomePai: string;
  nomeMae: string;
  listaPlanoSaudePaciente = new Array<PlanoSaudeEBO>();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;

}
