import { TipoContatoEBO } from './ebo/tipocontatoebo';
import { TipoContatoService } from './service/tipocontato.service';
import { TipoContatoConverter } from './converter/tipocontato.converter';
import { Mensagem } from '../../../../model/mensagem';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { Pagina } from '../../../../model/comum/pagina.model';
import { Excecao } from '../../../comum/excecao/excecao';
import { TipoContato } from '../../../../model/tipo-contato.model';

@Component({
  selector: 'app-tipocontato',
  templateUrl: './tipocontato.component.html',
  styleUrls: ['./tipocontato.component.css'],
  providers: [TipoContatoConverter, Excecao]
})
export class TipoContatoComponent implements OnInit {

  constructor(private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private excecao: Excecao) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaTipoContato = new Array<TipoContato>();

  tipoContato = new TipoContato();

  pagina: Pagina;


  ngOnInit() {
    this.tipoContatoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
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
    const table: any = $('#tabelaTipoContato');
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
    const modal: any = $('#btnNovoTipoContato');
    modal.click();
  }

  salvar() {
    const objetoSalvar: TipoContatoEBO = this.tipoContatoConverter.converterParaBackend(this.tipoContato);

    if (this.tipoContato && !this.tipoContato.codigo) {
      this.tipoContatoService.salvar(objetoSalvar).subscribe(( objetoSalvo: TipoContatoEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Tipo do contato salvo com sucesso.';
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
    const objetoAtualizado: TipoContatoEBO = this.tipoContatoConverter.converterParaBackend(this.tipoContato);
    this.tipoContatoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: TipoContatoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Tipo contato atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.tipoContatoService.buscarPorCodigo(codigo).subscribe((tipoContato: TipoContatoEBO) => {
      this.tipoContato = this.tipoContatoConverter.converterParaFrontend(tipoContato);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do tipo de contato.';
    });
  }

  buscar() {
    this.tipoContatoService.buscarPorNome(0, 10, this.tipoContato.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de contato.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.tipoContatoService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo contato.';
    });
  }

  limparCampos() {
    this.tipoContato = new TipoContato();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoContato');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.tipoContatoService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalTipoContato() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.tipoContato.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.tipoContato.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
