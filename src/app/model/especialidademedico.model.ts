import { EspecialidademedicoPK } from './especialidademedicopk';
import { Especialidade } from './dominio/especialidade.model';
export class Especialidademedico {
  especialidadeMedicoPK = new EspecialidademedicoPK();
  dataInicioAtuacao: Date;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  especialidade = new Especialidade();
}
