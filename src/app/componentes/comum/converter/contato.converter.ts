import { TipoContatoConverter } from './../../modulos/cadastro/tipoContato/converter/tipocontato.converter';
import { DominioConverter } from './dominio.converter';
import { Injectable } from '@angular/core';
import { ContatoEBO } from '../ebo/contatoebo';
import { Contato } from '../../../model/contato.model';
import { ContatoEBOPK } from '../ebo/contatoebopk';

@Injectable({
  providedIn: 'root',
})
export class ContatoConverter {

  constructor(private tipoContatoConverter: TipoContatoConverter) { }

  converterParaBackend(contato: Contato): ContatoEBO {
    const contatoEBO = new ContatoEBO();

    if (contato.contatoPessoaPK.codigoContatoPessoa || contato.contatoPessoaPK.codigoPessoa) {
      contatoEBO.contatoPessoaPK.codigoContatoPessoa = contato.contatoPessoaPK.codigoContatoPessoa;
      contatoEBO.contatoPessoaPK.codigoPessoa = contato.contatoPessoaPK.codigoPessoa;
    } else {
      contatoEBO.contatoPessoaPK = undefined;
    }
    contatoEBO.tipoContato = this.tipoContatoConverter.converterParaBackend(contato.tipoContato);
    contatoEBO.textoContato = contato.textoContato;
    contatoEBO.flagAtivo = contato.flagAtivo;

    return contatoEBO;

  }

  converterListaParaFrontend(listaTipoContato: Array<ContatoEBO>): Array<Contato> {
    const listaTipoContatoRetorno = new Array<Contato>();
    for (const index of listaTipoContato) {
      listaTipoContatoRetorno.push(this.converterParaFrontend(index));
    }
    return listaTipoContatoRetorno;
  }

  converterParaFrontend(objetoEBO: ContatoEBO): Contato {

    const objetoRetorno = new Contato();
    objetoRetorno.contatoPessoaPK.codigoContatoPessoa = objetoEBO.contatoPessoaPK.codigoContatoPessoa;
    objetoRetorno.contatoPessoaPK.codigoPessoa = objetoEBO.contatoPessoaPK.codigoPessoa;
    objetoRetorno.tipoContato = this.tipoContatoConverter.converterParaFrontend(objetoEBO.tipoContato);
    objetoRetorno.textoContato = objetoEBO.textoContato;
    objetoRetorno.flagAtivo = objetoEBO.flagAtivo;

    return objetoRetorno;
  }

}
