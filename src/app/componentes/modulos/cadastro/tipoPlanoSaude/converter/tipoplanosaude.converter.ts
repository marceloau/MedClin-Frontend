import { TipoPlanoSaude } from './../../../../../model/tipoplanosaude.model';
import { TipoPlanoSaudeEBO } from '../ebo/tipoplanosaudeebo';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoPlanoSaudeConverter {

  converterParaBackend(tipoPlanoSaude: TipoPlanoSaude): TipoPlanoSaudeEBO {
    const tipoPlanoSaudeEBO = new TipoPlanoSaudeEBO();

    tipoPlanoSaudeEBO.codigoTipoPlano = tipoPlanoSaude.codigo;
    tipoPlanoSaudeEBO.nomeTipoPlano = tipoPlanoSaude.nome;
    tipoPlanoSaudeEBO.descricaoTipoPlano = tipoPlanoSaude.descricao;
    tipoPlanoSaudeEBO.flagAtivo = tipoPlanoSaude.flagAtivo;

    return tipoPlanoSaudeEBO;

  }

  converterListaParaFrontend(listaTipoPlanoSaude: Array<TipoPlanoSaudeEBO>): Array<TipoPlanoSaude> {
    const listaTipoPlanoSaudeRetorno = new Array<TipoPlanoSaude>();
    for (const index of listaTipoPlanoSaude) {
      listaTipoPlanoSaudeRetorno.push(this.converterParaFrontend(index));
    }
    return listaTipoPlanoSaudeRetorno;
  }

  converterParaFrontend(tipoPlanoSaudeEBO: TipoPlanoSaudeEBO): TipoPlanoSaude {
    const tipoPlanoSaudeRetorno = new TipoPlanoSaude();
    tipoPlanoSaudeRetorno.codigo = tipoPlanoSaudeEBO.codigoTipoPlano;
    tipoPlanoSaudeRetorno.nome = tipoPlanoSaudeEBO.nomeTipoPlano;
    tipoPlanoSaudeRetorno.descricao = tipoPlanoSaudeEBO.descricaoTipoPlano;
    tipoPlanoSaudeRetorno.flagAtivo = tipoPlanoSaudeEBO.flagAtivo;
    tipoPlanoSaudeRetorno.dataCriacao = tipoPlanoSaudeEBO.dataCriacao;
    tipoPlanoSaudeRetorno.dataUltimaAlteracao = tipoPlanoSaudeEBO.dataUltimaAlteracao;
    tipoPlanoSaudeRetorno.usuarioUltimaAlteracao = tipoPlanoSaudeEBO.usuarioUltimaAlteracao;
    return tipoPlanoSaudeRetorno;
  }

}
