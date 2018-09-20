import { Estado } from './estado.model';
import { TipoLogradouro } from './tipologradouro.model';

export class Endereco {
  codigo: number;
  bairro: string;
  cep: string;
  cidade: string;
  logradouro: string;
  numero: string;
  complemento: string;
  estado = new Estado();
  tipoLogradouro = new TipoLogradouro();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
