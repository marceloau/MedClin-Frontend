import { Medicamento } from './medicamento.model';
import { Consulta } from './consulta.model';
import { SolicitacaoMedicamentoPK } from './solicitacaomedicamentopk.model';
export class SolicitacaoMedicamento {

  solicitacaoMedicamentoPK = new SolicitacaoMedicamentoPK();
  dataSolicitacaoMedicamento: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  consulta = new Consulta();
  medicamento = new Medicamento();
}
