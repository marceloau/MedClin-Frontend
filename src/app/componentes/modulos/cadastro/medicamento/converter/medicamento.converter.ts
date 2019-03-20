import { Constantes } from './../../../../comum/constantes';
import { DominioConverter } from './../../../../comum/converter/dominio.converter';
import { TipoMedicamentoConverter } from '../../tipoMedicamento/converter/tipomedicamento.converter';
import { Medicamento } from '../../../../../model/medicamento.model';
import { Injectable } from '@angular/core';
import { MedicamentoEBO } from '../ebo/medicamentoebo';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoConverter {

  constructor(private tipoMedicamentoConverter: TipoMedicamentoConverter, private dominioConverter: DominioConverter) {}

  converterParaBackend(medicamento: Medicamento): MedicamentoEBO {
    const medicamentoEBO = new MedicamentoEBO();

    medicamentoEBO.codigoMedicamento = medicamento.codigo;
    medicamentoEBO.nomeMedicamento = medicamento.nome;
    medicamentoEBO.descricaoMedicamento = medicamento.descricao;
    medicamentoEBO.tipoMedicamento = this.tipoMedicamentoConverter.converterParaBackend(medicamento.tipoMedicamento);
    medicamentoEBO.usoMedicamento = this.dominioConverter.converterParaBackend(
      medicamento.usoMedicamento, Constantes.DOMINIO_USO_MEDICAMENTO);
    medicamentoEBO.composicao = medicamento.composicao;
    medicamentoEBO.posologia = medicamento.posologia;
    medicamentoEBO.flagAtivo = medicamento.flagAtivo;
    medicamentoEBO.flagEspecial = medicamento.flagEspecial;

    return medicamentoEBO;

  }

  converterListaParaFrontend(listaMedicamento: Array<MedicamentoEBO>): Array<Medicamento> {
    const listaMedicamentoRetorno = new Array<Medicamento>();
    for (const index of listaMedicamento) {
      listaMedicamentoRetorno.push(this.converterParaFrontend(index));
    }
    return listaMedicamentoRetorno;
  }

  converterParaFrontend(medicamentoEBO: MedicamentoEBO): Medicamento {
    const medicamentoRetorno = new Medicamento();
    medicamentoRetorno.codigo = medicamentoEBO.codigoMedicamento;
    medicamentoRetorno.nome = medicamentoEBO.nomeMedicamento;
    medicamentoRetorno.descricao = medicamentoEBO.descricaoMedicamento;
    medicamentoRetorno.tipoMedicamento = this.tipoMedicamentoConverter.converterParaFrontend(medicamentoEBO.tipoMedicamento);
    medicamentoRetorno.usoMedicamento = this.dominioConverter.converterParaFrontend(
      medicamentoEBO.usoMedicamento, Constantes.DOMINIO_USO_MEDICAMENTO);
    medicamentoRetorno.composicao = medicamentoEBO.composicao;
    medicamentoRetorno.posologia = medicamentoEBO.posologia;
    medicamentoRetorno.flagAtivo = medicamentoEBO.flagAtivo;
    medicamentoRetorno.flagEspecial = medicamentoEBO.flagEspecial;
    medicamentoRetorno.dataCriacao = medicamentoEBO.dataCriacao;
    medicamentoRetorno.dataUltimaAlteracao = medicamentoEBO.dataUltimaAlteracao;
    medicamentoRetorno.usuarioUltimaAlteracao = medicamentoEBO.usuarioUltimaAlteracao;
    return medicamentoRetorno;
  }

}
