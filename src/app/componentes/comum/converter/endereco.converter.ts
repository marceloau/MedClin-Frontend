import { Endereco } from './../../../model/endereco.model';
import { DominioConverter } from './dominio.converter';
import { EnderecoEBO } from './../ebo/enderecoebo';
import { Constantes } from '../constantes.enum';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnderecoConverter {

  constructor(private dominioConverter: DominioConverter) { }

  converterListaParaFrontend(listaObjeto: Array<EnderecoEBO>): Array<any> {
    const listaObjetoRetorno = new Array<any>();
    for (const index of listaObjeto) {
      listaObjetoRetorno.push(this.converterParaFrontend(index));
    }
    return listaObjetoRetorno;
  }

  converterParaFrontend(objetoEBO: EnderecoEBO): Endereco {

    const objetoRetorno = new Endereco();
    objetoRetorno.codigo = objetoEBO.codigoEnderecoPessoa;
    objetoRetorno.bairro = objetoEBO.nomeBairro;
    objetoRetorno.cep = objetoEBO.numeroCep;
    objetoRetorno.cidade = objetoEBO.nomeCidade;
    objetoRetorno.logradouro = objetoEBO.nomeLogradouro;
    objetoRetorno.numero = objetoEBO.numeroLogradouro;
    objetoRetorno.complemento = objetoEBO.complemento;
    objetoRetorno.estado = this.dominioConverter.converterParaFrontend(objetoEBO.estado, Constantes.DOMINIO_ESTADO);
    objetoRetorno.tipoLogradouro = this.dominioConverter.converterParaFrontend(
      objetoEBO.tipoLogradouro, Constantes.DOMINIO_TIPO_LOGRADOURO);
    objetoRetorno.flagAtivo = objetoEBO.flagAtivo;
    objetoRetorno.usuarioUltimaAlteracao = objetoEBO.usuarioUltimaAlteracao;
    objetoRetorno.dataUltimaAlteracao = objetoEBO.dataUltimaAlteracao;
    objetoRetorno.dataCriacao = objetoEBO.dataCriacao;

    return objetoRetorno;
  }

  converterParaBackend(objeto: Endereco): EnderecoEBO {

    const objetoRetornoEBO = new EnderecoEBO();
    objetoRetornoEBO.codigoEnderecoPessoa = objeto.codigo;
    objetoRetornoEBO.nomeBairro = objeto.bairro;
    objetoRetornoEBO.numeroCep = objeto.cep;
    objetoRetornoEBO.nomeCidade = objeto.cidade;
    objetoRetornoEBO.nomeLogradouro = objeto.logradouro;
    objetoRetornoEBO.numeroLogradouro = objeto.numero;
    objetoRetornoEBO.complemento = objeto.complemento;
    objetoRetornoEBO.estado = this.dominioConverter.converterParaBackend(objeto.estado, Constantes.DOMINIO_ESTADO);
    objetoRetornoEBO.tipoLogradouro = this.dominioConverter.converterParaBackend(objeto.tipoLogradouro, Constantes.DOMINIO_TIPO_LOGRADOURO);
    objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
    objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
    objetoRetornoEBO.dataCriacao = objeto.dataCriacao;

    return objetoRetornoEBO;
  }

}
