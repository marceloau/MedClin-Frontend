import { SolicitacaoExamePK } from './../../../../model/solicitacaoexamepk.model';
import { ExameEBO } from './../../cadastro/exame/ebo/exameebo';
import { ConsultaEBO } from './consultaebo';
export class SolicitacaoExameEBO {

  solicitacaoExamePK = new SolicitacaoExamePK();
  dataSolicitacaoExame: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  consulta = new ConsultaEBO();
  exame = new ExameEBO();
}
