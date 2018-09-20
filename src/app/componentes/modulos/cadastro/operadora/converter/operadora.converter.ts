import { OperadoraEBO } from '../ebo/operadoraebo';
import { Injectable } from '@angular/core';
import { Operadora } from '../../../../../model/operadora.model';

@Injectable()
export class OperadoraConverter {

  converterParaBackend(operadora: Operadora): OperadoraEBO {
    const operadoraEBO = new OperadoraEBO();

    operadoraEBO.codigoOperadora = operadora.codigo;
    operadoraEBO.codigoOficial = operadora.codigoOficial;
    operadoraEBO.nomeOperadora = operadora.nome;
    operadoraEBO.descricaoOperadora = operadora.descricao;
    operadoraEBO.flagAtivo = operadora.flagAtivo;

    return operadoraEBO;

  }

  converterListaParaFrontend(listaOperadora: Array<OperadoraEBO>): Array<Operadora> {
    const listaOperadoraRetorno = new Array<Operadora>();
    for (const index of listaOperadora) {
      listaOperadoraRetorno.push(this.converterParaFrontend(index));
    }
    return listaOperadoraRetorno;
  }

  converterParaFrontend(operadora: OperadoraEBO): Operadora {
    const operadoraRetorno = new Operadora();
    operadoraRetorno.codigo = operadora.codigoOperadora;
    operadoraRetorno.codigoOficial = operadora.codigoOficial;
    operadoraRetorno.nome = operadora.nomeOperadora;
    operadoraRetorno.descricao = operadora.descricaoOperadora;
    operadoraRetorno.flagAtivo = operadora.flagAtivo;
    operadoraRetorno.dataCriacao = operadora.dataCriacao;
    operadoraRetorno.dataUltimaAlteracao = operadora.dataUltimaAlteracao;
    operadoraRetorno.usuarioUltimaAlteracao = operadora.usuarioUltimaAlteracao;
    return operadoraRetorno;
  }

}
