import { TipoExame } from './../../../../../model/tipoexame.model';
import { TipoExameEBO } from '../ebo/tipoexameebo';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoExameConverter {

  converterParaBackend(tipoExame: TipoExame): TipoExameEBO {
    const tipoExameEBO = new TipoExameEBO();

    tipoExameEBO.codigoTipoExame = tipoExame.codigo;
    tipoExameEBO.nomeTipoExame = tipoExame.nome;
    tipoExameEBO.descricaoTipoExame = tipoExame.descricao;
    tipoExameEBO.flagAtivo = tipoExame.flagAtivo;

    return tipoExameEBO;

  }

  converterListaParaFrontend(listaTipoExame: Array<TipoExameEBO>): Array<TipoExame> {
    const listaTipoExameRetorno = new Array<TipoExame>();
    for (const index of listaTipoExame) {
      listaTipoExameRetorno.push(this.converterParaFrontend(index));
    }
    return listaTipoExameRetorno;
  }

  converterParaFrontend(tipoExameEBO: TipoExameEBO): TipoExame {
    const tipoExameRetorno = new TipoExame();
    tipoExameRetorno.codigo = tipoExameEBO.codigoTipoExame;
    tipoExameRetorno.nome = tipoExameEBO.nomeTipoExame;
    tipoExameRetorno.descricao = tipoExameEBO.descricaoTipoExame;
    tipoExameRetorno.flagAtivo = tipoExameEBO.flagAtivo;
    tipoExameRetorno.dataCriacao = tipoExameEBO.dataCriacao;
    tipoExameRetorno.dataUltimaAlteracao = tipoExameEBO.dataUltimaAlteracao;
    tipoExameRetorno.usuarioUltimaAlteracao = tipoExameEBO.usuarioUltimaAlteracao;
    return tipoExameRetorno;
  }

}
