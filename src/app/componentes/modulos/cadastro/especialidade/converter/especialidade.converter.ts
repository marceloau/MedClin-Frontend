import { Especialidade } from '../../../../../model/dominio/especialidade.model';
import { EspecialidadeEBO } from '../ebo/especialidadeebo';
import { Injectable } from '@angular/core';

@Injectable()
export class EspecialidadeConverter {

  converterParaBackend(especialidade: Especialidade): EspecialidadeEBO {
    const especialidadeEBO = new EspecialidadeEBO();

    especialidadeEBO.codigoEspecialidade = especialidade.codigo;
    especialidadeEBO.nomeEspecialidade = especialidade.nome;
    especialidadeEBO.descricaoEspecialidade = especialidade.descricao;
    especialidadeEBO.flagAtivo = especialidade.flagAtivo;

    return especialidadeEBO;

  }

  converterListaParaFrontend(listaEspecialidade: Array<EspecialidadeEBO>): Array<Especialidade> {
    const listaEspecialidadeRetorno = new Array<Especialidade>();
    for (const index of listaEspecialidade) {
      listaEspecialidadeRetorno.push(this.converterParaFrontend(index));
    }
    return listaEspecialidadeRetorno;
  }

  converterParaFrontend(especialidade: EspecialidadeEBO): Especialidade {
    const especialidadeRetorno = new Especialidade();
    especialidadeRetorno.codigo = especialidade.codigoEspecialidade;
    especialidadeRetorno.nome = especialidade.nomeEspecialidade;
    especialidadeRetorno.descricao = especialidade.descricaoEspecialidade;
    especialidadeRetorno.flagAtivo = especialidade.flagAtivo;
    especialidadeRetorno.dataCriacao = especialidade.dataCriacao;
    especialidadeRetorno.dataUltimaAlteracao = especialidade.dataUltimaAlteracao;
    especialidadeRetorno.usuarioUltimaAlteracao = especialidade.usuarioUltimaAlteracao;
    return especialidadeRetorno;
  }

}
