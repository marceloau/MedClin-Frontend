import { TipoExameEBO } from './ebo/tipoexameebo';
import { TipoExameService } from './service/tipoexame.service';
import { TipoExameConverter } from './converter/tipoexame.converter';
import { Mensagem } from '../../../../model/mensagem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { Pagina } from '../../../../model/comum/pagina.model';
import { Excecao } from '../../../comum/excecao/excecao';
import { TipoExame } from '../../../../model/tipoexame.model';

@Component({
  selector: 'app-tipoExame',
  templateUrl: './tipoExame.component.html',
  styleUrls: ['./tipoExame.component.css'],
  providers: [TipoExameConverter, Excecao]
})
export class TipoExameComponent implements OnInit {

  constructor(private tipoExameService: TipoExameService, private tipoExameConverter: TipoExameConverter,
    private excecao: Excecao) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaTipoExame = new Array<TipoExame>();

  tipoExame = new TipoExame();

  pagina: Pagina;


  ngOnInit() {
    this.tipoExameService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaTipoExame = this.tipoExameConverter.converterListaParaFrontend(retorno.content);
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
    const table: any = $('#tabelaTipoExame');
    table.DataTable().destroy();
    setTimeout(() =>
      table.DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false
      }), 0
    );
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoExame');
    modal.click();
  }

  salvar() {
    const objetoSalvar: TipoExameEBO = this.tipoExameConverter.converterParaBackend(this.tipoExame);

    if (this.tipoExame && !this.tipoExame.codigo) {
      this.tipoExameService.salvar(objetoSalvar).subscribe(( objetoSalvo: TipoExameEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Tipo de exame salvo com sucesso.';
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
    const objetoAtualizado: TipoExameEBO = this.tipoExameConverter.converterParaBackend(this.tipoExame);
    this.tipoExameService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: TipoExameEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Tipo de exame atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.tipoExameService.buscarPorCodigo(codigo).subscribe((tipoExame: TipoExameEBO) => {
      this.tipoExame = this.tipoExameConverter.converterParaFrontend(tipoExame);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do tipo de exame.';
    });
  }

  buscar() {
    this.tipoExameService.buscarPorNome(0, 10, this.tipoExame.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoExame = this.tipoExameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de exame.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.tipoExameService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoExame = this.tipoExameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de exame.';
    });
  }

  limparCampos() {
    this.tipoExame = new TipoExame();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoExame');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.tipoExameService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoExame = this.tipoExameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalTipoExame() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.tipoExame.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.tipoExame.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
