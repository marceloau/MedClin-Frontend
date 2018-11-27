import { TipoMedicamentoEBO } from './../ebo/tipomedicamentoebo';
import { TipoMedicamento } from './../../../../../model/tipomedicamento.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TipoMedicamentoConverter {

  converterParaBackend(tipoMedicamento: TipoMedicamento): TipoMedicamentoEBO {
    const tipoMedicamentoEBO = new TipoMedicamentoEBO();

    tipoMedicamentoEBO.codigoTipoMedicamento = tipoMedicamento.codigo;
    tipoMedicamentoEBO.nomeTipoMedicamento = tipoMedicamento.nome;
    tipoMedicamentoEBO.descricaoTipoMedicamento = tipoMedicamento.descricao;
    tipoMedicamentoEBO.flagAtivo = tipoMedicamento.flagAtivo;

    return tipoMedicamentoEBO;

  }

  converterListaParaFrontend(listaTipoMedicamento: Array<TipoMedicamentoEBO>): Array<TipoMedicamento> {
    const listaTipoMedicamentoRetorno = new Array<TipoMedicamento>();
    for (const index of listaTipoMedicamento) {
      listaTipoMedicamentoRetorno.push(this.converterParaFrontend(index));
    }
    return listaTipoMedicamentoRetorno;
  }

  converterParaFrontend(tipoMedicamentoEBO: TipoMedicamentoEBO): TipoMedicamento {
    const tipoMedicamentoRetorno = new TipoMedicamento();
    tipoMedicamentoRetorno.codigo = tipoMedicamentoEBO.codigoTipoMedicamento;
    tipoMedicamentoRetorno.nome = tipoMedicamentoEBO.nomeTipoMedicamento;
    tipoMedicamentoRetorno.descricao = tipoMedicamentoEBO.descricaoTipoMedicamento;
    tipoMedicamentoRetorno.flagAtivo = tipoMedicamentoEBO.flagAtivo;
    tipoMedicamentoRetorno.dataCriacao = tipoMedicamentoEBO.dataCriacao;
    tipoMedicamentoRetorno.dataUltimaAlteracao = tipoMedicamentoEBO.dataUltimaAlteracao;
    tipoMedicamentoRetorno.usuarioUltimaAlteracao = tipoMedicamentoEBO.usuarioUltimaAlteracao;
    return tipoMedicamentoRetorno;
  }

}
