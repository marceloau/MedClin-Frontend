import { TipoContato } from './../../../../../model/tipo-contato.model';
import { TipoContatoEBO } from '../ebo/tipocontatoebo';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoContatoConverter {

  converterParaBackend(tipoContato: TipoContato): TipoContatoEBO {
    const titpoContatoEBO = new TipoContatoEBO();

    titpoContatoEBO.codigoTipoContato = tipoContato.codigo;
    titpoContatoEBO.nomeTipoContato = tipoContato.nome;
    titpoContatoEBO.descricaoTipoContato = tipoContato.descricao;
    titpoContatoEBO.flagAtivo = tipoContato.flagAtivo;

    return titpoContatoEBO;

  }

  converterListaParaFrontend(listaTipoContato: Array<TipoContatoEBO>): Array<TipoContato> {
    const listaTipoContatoRetorno = new Array<TipoContato>();
    for (const index of listaTipoContato) {
      listaTipoContatoRetorno.push(this.converterParaFrontend(index));
    }
    return listaTipoContatoRetorno;
  }

  converterParaFrontend(tipoContatoEBO: TipoContatoEBO): TipoContato {
    const tipoContatoRetorno = new TipoContato();
    tipoContatoRetorno.codigo = tipoContatoEBO.codigoTipoContato;
    tipoContatoRetorno.nome = tipoContatoEBO.nomeTipoContato;
    tipoContatoRetorno.descricao = tipoContatoEBO.descricaoTipoContato;
    tipoContatoRetorno.flagAtivo = tipoContatoEBO.flagAtivo;
    tipoContatoRetorno.dataCriacao = tipoContatoEBO.dataCriacao;
    tipoContatoRetorno.dataUltimaAlteracao = tipoContatoEBO.dataUltimaAlteracao;
    tipoContatoRetorno.usuarioUltimaAlteracao = tipoContatoEBO.usuarioUltimaAlteracao;
    return tipoContatoRetorno;
  }

}
