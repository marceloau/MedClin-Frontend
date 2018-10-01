import { EnderecoPessoaPK } from './enderecopessoapk';
import { Estado } from './estado.model';
import { TipoLogradouro } from './tipologradouro.model';

export class Endereco {
  enderecoPessoaPK = new EnderecoPessoaPK;
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
