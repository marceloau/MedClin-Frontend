import { EspecialidadeEBO } from './../../cadastro/especialidade/ebo/especialidadeebo';
import { EspecialidadeMedicoEBOPK } from './especialidademedicoebopk';
export class EspecialidadeMedicoEBO {
  especialidadeMedicoPK = new EspecialidadeMedicoEBOPK();
  dataInicioAtuacao: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
  especialidade = new EspecialidadeEBO();
}
