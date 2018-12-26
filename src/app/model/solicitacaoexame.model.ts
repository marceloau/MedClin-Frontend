import { Exame } from './exame.model';
import { Consulta } from './consulta.model';
import { SolicitacaoExamePK } from './solicitacaoexamepk.model';
export class SolicitacaoExame {

  solicitacaoExamePK = new SolicitacaoExamePK();
  dataSolicitacaoExame: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  consulta = new Consulta();
  exame = new Exame();
}
