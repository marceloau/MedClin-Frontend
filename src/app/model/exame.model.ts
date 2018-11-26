import { TipoExame } from './tipoexame.model';

export class Exame {
  codigo: number;
  nome: string;
  descricao: string;
  tipoExame = new TipoExame();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
