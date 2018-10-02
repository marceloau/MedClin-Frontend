import { AgendaMedicoEBOPK } from './agendamedicoebopk';
export class AgendaMedicoEBO {
  agendaMedicoPK = new AgendaMedicoEBOPK();
  dataAtendimento: any;
  horaInicioAtendimento: any;
  horaFinalAtendimento: any;
  observacao: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
