import { PlanoSaude } from './../../../model/planosaude.model';
import { DominioConverter } from './dominio.converter';
import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { PlanoSaudeEBO } from '../ebo/planosaudeEBO';
import { OperadoraConverter } from '../../modulos/cadastro/operadora/converter/operadora.converter';
import { TipoPlanoSaudeConverter } from '../../modulos/cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlanoSaudeConverter {

  constructor(private dominioConverter: DominioConverter, private oeradoraConverter: OperadoraConverter,
    private tipoPlanoSaudeConverter: TipoPlanoSaudeConverter, private datePipe: DatePipe) { }

  converterListaParaFrontend(listaObjeto: Array<PlanoSaudeEBO>): Array<PlanoSaude> {
    const listaObjetoRetorno = new Array<PlanoSaude>();
    for (const index of listaObjeto) {
      listaObjetoRetorno.push(this.converterParaFrontend(index));
    }
    return listaObjetoRetorno;
  }

  converterParaFrontend(objetoEBO: PlanoSaudeEBO): PlanoSaude {

    const objetoRetorno = new PlanoSaude();

    objetoRetorno.codigo = objetoEBO.codigoPlanoSaudePaciente;
    objetoRetorno.numeroCartao = objetoEBO.numeroCartao;
    objetoRetorno.nomeTitular = objetoEBO.nomeTitular;
    objetoRetorno.dataValidadeCartao = objetoEBO.validadeCartao;
    objetoRetorno.operadora = this.oeradoraConverter.converterParaFrontend( objetoEBO.operadora);
    objetoRetorno.tipoPlanoSaude = this.tipoPlanoSaudeConverter.converterParaFrontend(objetoEBO.tipoPlanoSaude);
    objetoRetorno.flagAtivo = objetoEBO.flagAtivo;
    objetoRetorno.usuarioUltimaAlteracao = objetoEBO.usuarioUltimaAlteracao;
    objetoRetorno.dataUltimaAlteracao = objetoEBO.dataUltimaAlteracao;
    objetoRetorno.dataCriacao = objetoEBO.dataCriacao;
    return objetoRetorno;
  }

  converterParaBackend(objeto: PlanoSaude): PlanoSaudeEBO {

    const objetoRetornoEBO = new PlanoSaudeEBO();

    objetoRetornoEBO.codigoPlanoSaudePaciente = objeto.codigo;
    objetoRetornoEBO.numeroCartao = objeto.numeroCartao;
    objetoRetornoEBO.nomeTitular = objeto.nomeTitular;
    if (objeto.dataValidadeCartao) {
      objetoRetornoEBO.validadeCartao = this.datePipe.transform(new Date(objeto.dataValidadeCartao), Constantes.FORMATO_DATA_BACKEND);
    }
    objetoRetornoEBO.operadora = this.oeradoraConverter.converterParaBackend( objeto.operadora);
    objetoRetornoEBO.tipoPlanoSaude = this.tipoPlanoSaudeConverter.converterParaBackend(objeto.tipoPlanoSaude);
    objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
    objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
    objetoRetornoEBO.dataCriacao = objeto.dataCriacao;

    return objetoRetornoEBO;
  }

}
