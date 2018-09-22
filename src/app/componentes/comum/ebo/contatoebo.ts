import { TipoContatoEBO } from '../../modulos/cadastro/tipoContato/ebo/tipocontatoebo';
export class ContatoEBO {

  codigoContatoPessoa: number;
  textoContato: string;
  tipoContato = new TipoContatoEBO();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
