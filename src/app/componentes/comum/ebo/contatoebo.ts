import { TipoContatoEBO } from '../../modulos/cadastro/tipoContato/ebo/tipocontatoebo';
import { ContatoEBOPK } from './contatoebopk';
export class ContatoEBO {

  contatoPessoaPK = new ContatoEBOPK;
  textoContato: string;
  tipoContato = new TipoContatoEBO();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
