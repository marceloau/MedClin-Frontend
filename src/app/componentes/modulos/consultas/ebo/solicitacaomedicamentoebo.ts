import { MedicamentoEBO } from './../../cadastro/medicamento/ebo/medicamentoebo';
import { ConsultaEBO } from './consultaebo';
import { SolicitacaoMedicamentoPK } from './../../../../model/solicitacaomedicamentopk.model';
export class SolicitacaoMedicamentoEBO {

  solicitacaoMedicamentoPK = new SolicitacaoMedicamentoPK();
  dataSolicitacaoMedicamento: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  consulta = new ConsultaEBO();
  medicamento = new MedicamentoEBO();
}
