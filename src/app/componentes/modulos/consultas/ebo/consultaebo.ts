import { MedicoEBO } from './../../medicos/ebo/medicoebo';
import { PacienteEBO } from './../../pacientes/ebo/pacienteebo';
export class ConsultaEBO {

  codigoConsulta: number;
  paciente = new PacienteEBO();
  medico = new MedicoEBO();
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
