import { UsoMedicamento } from './usomedicamento.model';
import { TipoMedicamento } from './tipomedicamento.model';

export class Medicamento {
  codigo: number;
  nome: string;
  descricao: string;
  tipoMedicamento = new TipoMedicamento();
  usoMedicamento = new UsoMedicamento();
  posologia: string;
  composicao: string;
  flagAtivo: string;
  flagEspecial: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
