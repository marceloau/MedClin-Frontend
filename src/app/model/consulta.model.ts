import { SolicitacaoExame } from './solicitacaoexame.model';
import { SolicitacaoMedicamento } from './solicitacaomedicamento.model';
import { Medicamento } from './medicamento.model';
import { Medico } from './medico.model';
import { Paciente } from './paciente.model';
export class Consulta {

  codigo: number;
  paciente = new Paciente();
  medico = new Medico();
  codigoStatusConsulta: number;
  flagConfirmada: string;
  flagPrimeiraConsulta: string;
  historicoClinico: string;
  ordemChegada: number;
  listaSolicitacaoExame = new Array<SolicitacaoExame>();
  listaSolicitacaoMedicamento = new Array<SolicitacaoMedicamento>();
  dataAtendimento: any;
  dataConsulta: any;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
