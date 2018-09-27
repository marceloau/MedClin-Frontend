import { OperadoraEBO } from './../../modulos/cadastro/operadora/ebo/operadoraebo';
import { TipoPlanoSaudeEBO } from '../../modulos/cadastro/tipoPlanoSaude/ebo/tipoplanosaudeebo';


export class PlanoSaudeEBO {
  codigoPlanoSaudePaciente: number;
  numeroCartao: string;
  nomeTitular: string;
  validadeCartao: any;
  operadora = new OperadoraEBO();
  tipoPlanoSaude = new TipoPlanoSaudeEBO();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
