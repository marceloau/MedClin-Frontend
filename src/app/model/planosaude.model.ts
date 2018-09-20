import { Operadora } from './operadora.model';
import { TipoPlanoSaude } from './tipoplanosaude.model';


export class PlanoSaude {
  codigo: number;
  numeroCartao: string;
  dataValidadeCartao: Date;
  nomeTitular: string;
  operadora = new Operadora();
  tipoPlanoSaude = new TipoPlanoSaude();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
