import { SolicitacaoMedicamentoEBO } from './solicitacaomedicamentoebo';
import { SolicitacaoExameEBO } from './solicitacaoexameebo';
import { MedicoEBO } from './../../medicos/ebo/medicoebo';
import { PacienteEBO } from './../../pacientes/ebo/pacienteebo';
export class ConsultaEBO {

  codigoConsulta: number;
  paciente = new PacienteEBO();
  medico = new MedicoEBO();
  codigoStatusConsulta: number;
  flagConfirmada: string;
  flagPrimeiraConsulta: string;
  historicoClinico: string;
  dataAtendimento: any;
  dataConsulta: any;
  dataUltimaConsulta: any;
  ordemChegada: number;
  listaSolicitacaoExame = new Array<SolicitacaoExameEBO>();
  listaSolicitacaoMedicamento = new Array<SolicitacaoMedicamentoEBO>();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
