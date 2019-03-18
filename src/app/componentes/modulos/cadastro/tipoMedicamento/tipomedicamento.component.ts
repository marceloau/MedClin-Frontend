import { TipoMedicamentoEBO } from './ebo/tipomedicamentoebo';
import { TipoMedicamentoService } from './service/tipomedicamento.service';
import { TipoMedicamentoConverter } from './converter/tipomedicamento.converter';
import { Mensagem } from '../../../../model/mensagem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { Pagina } from '../../../../model/comum/pagina.model';
import { Excecao } from '../../../comum/excecao/excecao';
import { TipoMedicamento } from '../../../../model/tipomedicamento.model';

@Component({
  selector: 'app-tipomedicamento',
  templateUrl: './tipoMedicamento.component.html',
  styleUrls: ['./tipoMedicamento.component.css'],
  providers: [TipoMedicamentoConverter, Excecao]
})
export class TipoMedicamentoComponent implements OnInit {

  constructor(private tipoMedicamentoService: TipoMedicamentoService, private tipoMedicamentoConverter: TipoMedicamentoConverter,
    private excecao: Excecao) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaTipoMedicamento = new Array<TipoMedicamento>();

  tipoMedicamento = new TipoMedicamento();

  pagina: Pagina;


  ngOnInit() {
    this.tipoMedicamentoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaTipoMedicamento = this.tipoMedicamentoConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      this.inicializarTable();
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  inicializarTable() {
    const table: any = $('#tabelaTipoMedicamento');
    table.DataTable().destroy();
    setTimeout(() =>
      table.DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false,
        'language': {
          'zeroRecords': 'Nenhum tipo de medicamento encontrado',
          'infoEmpty': 'Nenhum tipo de medicamento encontrado'
        },
      }), 0
    );
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoMedicamento');
    modal.click();
  }

  salvar() {
    const objetoSalvar: TipoMedicamentoEBO = this.tipoMedicamentoConverter.converterParaBackend(this.tipoMedicamento);

    if (this.tipoMedicamento && !this.tipoMedicamento.codigo) {
      this.tipoMedicamentoService.salvar(objetoSalvar).subscribe(( objetoSalvo: TipoMedicamentoEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Tipo de medicamento salvo com sucesso.';
        const modal: any = $('#fecharModal');
        modal.click();
        this.limparCampos();
        this.inicializarTable();
        this.listarRegistros(0, 10);
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.atualizar();
    }
  }

  atualizar() {
    const objetoAtualizado: TipoMedicamentoEBO = this.tipoMedicamentoConverter.converterParaBackend(this.tipoMedicamento);
    this.tipoMedicamentoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: TipoMedicamentoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Tipo de medicamento atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.tipoMedicamentoService.buscarPorCodigo(codigo).subscribe((tipoMedicamento: TipoMedicamentoEBO) => {
      this.tipoMedicamento = this.tipoMedicamentoConverter.converterParaFrontend(tipoMedicamento);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do tipo de medicamento.';
    });
  }

  buscar() {
    this.tipoMedicamentoService.buscarPorNome(0, 10, this.tipoMedicamento.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoMedicamento = this.tipoMedicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de medicamento.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.tipoMedicamentoService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoMedicamento = this.tipoMedicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de medicamento.';
    });
  }

  limparCampos() {
    this.tipoMedicamento = new TipoMedicamento();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoMedicamento');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.tipoMedicamentoService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoMedicamento = this.tipoMedicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalTipoMedicamento() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.tipoMedicamento.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.tipoMedicamento.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
