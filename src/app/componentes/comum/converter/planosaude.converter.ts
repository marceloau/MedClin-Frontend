import { PlanoSaude } from './../../../model/planosaude.model';
import { DominioConverter } from './dominio.converter';
import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { PlanoSaudeEBO } from '../ebo/planosaudeebo';
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

    objetoRetorno.planoSaudePacientePK.codigoPessoa = objetoEBO.planoSaudePacientePK.codigoPessoa;
    objetoRetorno.planoSaudePacientePK.codigoPlanoSaudePaciente = objetoEBO.planoSaudePacientePK.codigoPlanoSaudePaciente;
    objetoRetorno.numeroCartao = objetoEBO.numeroCartao;
    objetoRetorno.nomeTitular = objetoEBO.nomeTitular;
    if (objetoEBO.validadeCartao) {
      objetoRetorno.dataValidadeCartao = this.datePipe.transform(objetoEBO.validadeCartao, Constantes.FORMATO_DATA_FRONTEND);
    }
    if (objetoEBO.operadora) {
      objetoRetorno.operadora = this.oeradoraConverter.converterParaFrontend(objetoEBO.operadora);
    }
    if (objetoEBO.tipoPlanoSaude) {
      objetoRetorno.tipoPlanoSaude = this.tipoPlanoSaudeConverter.converterParaFrontend(objetoEBO.tipoPlanoSaude);
    }
    objetoRetorno.flagAtivo = objetoEBO.flagAtivo;
    objetoRetorno.usuarioUltimaAlteracao = objetoEBO.usuarioUltimaAlteracao;
    objetoRetorno.dataUltimaAlteracao = objetoEBO.dataUltimaAlteracao;
    objetoRetorno.dataCriacao = objetoEBO.dataCriacao;
    return objetoRetorno;
  }

  converterParaBackend(objeto: PlanoSaude): PlanoSaudeEBO {

    const objetoRetornoEBO = new PlanoSaudeEBO();

    if (objeto.planoSaudePacientePK.codigoPessoa || objeto.planoSaudePacientePK.codigoPlanoSaudePaciente) {
      objetoRetornoEBO.planoSaudePacientePK.codigoPessoa = objeto.planoSaudePacientePK.codigoPessoa;
      objetoRetornoEBO.planoSaudePacientePK.codigoPlanoSaudePaciente = objeto.planoSaudePacientePK.codigoPlanoSaudePaciente;
    } else {
      objetoRetornoEBO.planoSaudePacientePK = undefined;
    }
    objetoRetornoEBO.numeroCartao = objeto.numeroCartao;
    objetoRetornoEBO.nomeTitular = objeto.nomeTitular;
    if (objeto.dataValidadeCartao) {
      objetoRetornoEBO.validadeCartao = this.datePipe.transform(new Date(objeto.dataValidadeCartao), Constantes.FORMATO_DATA_BACKEND);
    }
    if (objeto.operadora.codigo) {
      objetoRetornoEBO.operadora = this.oeradoraConverter.converterParaBackend(objeto.operadora);
    } else {
      objetoRetornoEBO.operadora = undefined;
    }
    if (objeto.tipoPlanoSaude.codigo) {
      objetoRetornoEBO.tipoPlanoSaude = this.tipoPlanoSaudeConverter.converterParaBackend(objeto.tipoPlanoSaude);
    } else {
      objetoRetornoEBO.tipoPlanoSaude = undefined;
    }
    objetoRetornoEBO.flagAtivo = objeto.flagAtivo;
    objetoRetornoEBO.usuarioUltimaAlteracao = objeto.usuarioUltimaAlteracao;
    objetoRetornoEBO.dataUltimaAlteracao = objeto.dataUltimaAlteracao;
    objetoRetornoEBO.dataCriacao = objeto.dataCriacao;

    return objetoRetornoEBO;
  }

}
