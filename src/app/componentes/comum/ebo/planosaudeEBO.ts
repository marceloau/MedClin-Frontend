import { OperadoraEBO } from './../../modulos/cadastro/operadora/ebo/operadoraebo';
import { TipoPlanoSaudeEBO } from '../../modulos/cadastro/tipoPlanoSaude/ebo/tipoplanosaudeebo';
import { PlanoSaudeEBOPK } from './planosaudeebopk';


export class PlanoSaudeEBO {
  planoSaudePacientePK = new PlanoSaudeEBOPK();
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
