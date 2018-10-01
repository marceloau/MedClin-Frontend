import { AgendaMedicoPK } from './agendamedicopk';
export class AgendaMedico {
  agendaMedicoPK = new AgendaMedicoPK();
  dataAtendimento: any;
  horaInicioAtendimento: any;
  horaFinalAtendimento: any;
  observacao: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
