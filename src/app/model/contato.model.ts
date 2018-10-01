import { ContatoPessoaPK } from './contatopessoapk';
import { TipoContato } from './tipo-contato.model';
export class Contato {

  contatoPessoaPK = new ContatoPessoaPK;
  tipoContato = new TipoContato();
  textoContato: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
