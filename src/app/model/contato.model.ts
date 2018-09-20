import { TipoContato } from './tipo-contato.model';
export class Contato {

  codigo: number;
  tipoContato = new TipoContato();
  textoContato: string;
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
