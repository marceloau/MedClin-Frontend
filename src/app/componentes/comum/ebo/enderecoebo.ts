import { EstadoEBO } from './estadoebo';
import { TipoLogradouroEBO } from './tipologradouroebo';

export class EnderecoEBO {
  codigoEnderecoPessoa: number;
  nomeBairro: string;
  numeroCep: string;
  nomeCidade: string;
  nomeLogradouro: string;
  numeroLogradouro: string;
  complemento: string;
  estado = new EstadoEBO();
  tipoLogradouro = new TipoLogradouroEBO();
  flagAtivo: string;
  usuarioUltimaAlteracao: string;
  dataUltimaAlteracao: Date;
  dataCriacao: Date;
}
