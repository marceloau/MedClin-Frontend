import { UsoMedicamentoEBO } from './usomedicamentoebo';
import { TipoMedicamentoEBO } from '../../tipoMedicamento/ebo/tipomedicamentoebo';

export class MedicamentoEBO {
  codigoMedicamento: number;
  nomeMedicamento: string;
  descricaoMedicamento: string;
  tipoMedicamento = new TipoMedicamentoEBO();
  usoMedicamento = new UsoMedicamentoEBO();
  posologia: string;
  composicao: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
