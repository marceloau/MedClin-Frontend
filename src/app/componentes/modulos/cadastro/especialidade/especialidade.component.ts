import { Mensagem } from './../../../../model/mensagem';
import { EspecialidadeConverter } from './converter/especialidade.converter';
import { EspecialidadeEBO } from './ebo/especialidadeebo';
import { EspecialidadeService } from './service/especialidade.service';
import { Especialidade } from './../../../../model/dominio/especialidade.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { Pagina } from '../../../../model/comum/pagina.model';

@Component({
  selector: 'app-especialidade',
  templateUrl: './especialidade.component.html',
  styleUrls: ['./especialidade.component.css'],
  providers: [EspecialidadeConverter]
})
export class EspecialidadeComponent implements OnInit {

  constructor(private especialidadeService: EspecialidadeService, private especialidadeConverter: EspecialidadeConverter) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaEspecialidade = new Array<Especialidade>();

  especialidade = new Especialidade();

  pagina: Pagina;


  ngOnInit() {
    this.especialidadeService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      const table: any = $('#tabelaEspecialidade');
      setTimeout(() =>
      table.DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false,
        'language': {
          'zeroRecords': 'Nenhuma especialidade encontrada',
          'infoEmpty': 'Nenhuma especialidade encontrada'
        },
      }), 0
      );
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovaEspecialidade');
    modal.click();
  }

  salvar() {
    const objetoSalvar: EspecialidadeEBO = this.especialidadeConverter.converterParaBackend(this.especialidade);

    if (this.especialidade && !this.especialidade.codigo) {
      this.especialidadeService.salvar(objetoSalvar).subscribe(( objetoSalvo: EspecialidadeEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Especialidade Salva com sucesso.';
        const modal: any = $('#fecharModal');
        modal.click();
        this.limparCampos();
      }, err => {
        // @TODO colocar para retornar exceção do util exceção.
        this.mensagem.codigoTipo = 1;
        this.mensagem.titulo = 'Erro';
        this.mensagem.texto = 'Não foi possível salvar a especialidade no sistema.';
      });
    } else {
      this.atualizar();
    }
  }

  atualizar() {
    const objetoAtualizado: EspecialidadeEBO = this.especialidadeConverter.converterParaBackend(this.especialidade);
    this.especialidadeService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: EspecialidadeEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Especialidade atualizada com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Não foi possível atualizar a especialidade.';
    });
  }

  buscarPorCodigo(codigo: number) {
    this.especialidadeService.buscarPorCodigo(codigo).subscribe((especialidade: EspecialidadeEBO) => {
      this.especialidade = this.especialidadeConverter.converterParaFrontend(especialidade);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código da especialidade.';
    });
  }

  buscarPorNome() {
    this.especialidadeService.buscarPorNome(0, 10, this.especialidade.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código da especialidade.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.especialidadeService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código da especialidade.';
    });
  }

  limparCampos() {
    this.especialidade = new Especialidade();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovaEspecialidade');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.especialidadeService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalEspecialidade() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.especialidade.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.especialidade.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
