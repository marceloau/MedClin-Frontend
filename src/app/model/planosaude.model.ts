import { PlanoSaudePK } from './planosaudepk';
import { Operadora } from './operadora.model';
import { TipoPlanoSaude } from './tipoplanosaude.model';


export class PlanoSaude {
  planoSaudePacientePK = new PlanoSaudePK();
  numeroCartao: string;
  dataValidadeCartao: any;
  nomeTitular: string;
  operadora = new Operadora();
  tipoPlanoSaude = new TipoPlanoSaude();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
