import { Medico } from './medico.model';
import { Paciente } from './paciente.model';
export class Consulta {

  codigo: number;
  paciente = new Paciente();
  medico = new Medico();
  codigoStatusConsulta: number;
  flagConfirmada: string;
  flagPrimeiraConsulta: string;
  dataAtendimento: any;
  dataConsulta: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
