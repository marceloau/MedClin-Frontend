import { TipoExameEBO } from './../../tipoExame/ebo/tipoexameebo';

export class ExameEBO {
  codigoExame: number;
  nomeExame: string;
  descricaoExame: string;
  tipoExame = new TipoExameEBO();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
