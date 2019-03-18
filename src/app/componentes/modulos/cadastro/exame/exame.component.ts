import { TipoExameService } from './../tipoExame/service/tipoexame.service';
import { TipoExameConverter } from './../tipoExame/converter/tipoexame.converter';
import { Exame } from './../../../../model/exame.model';
import { ExameEBO } from './ebo/exameebo';
import { ExameService } from './service/exame.service';
import { ExameConverter } from './converter/exame.converter';
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
  selector: 'app-exame',
  templateUrl: './exame.component.html',
  styleUrls: ['./exame.component.css'],
  providers: [ExameConverter, Excecao, TipoExameConverter]
})
export class ExameComponent implements OnInit {

  constructor(private exameService: ExameService, private exameConverter: ExameConverter,
    private excecao: Excecao, private tipoExameConverter: TipoExameConverter, private tipoExameService: TipoExameService) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaExame = new Array<Exame>();
  listaComboTipoExame = new Array<TipoExame>();

  exame = new Exame();

  pagina: Pagina;


  ngOnInit() {
    this.exameService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaExame = this.exameConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      this.inicializarTable();
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
    this.inicializarCombos();
  }

  inicializarTable() {
    const table: any = $('#tabelaExame');
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
          'zeroRecords': 'Nenhum exame encontrado',
          'infoEmpty': 'Nenhum exame encontrado'
        },
      }), 0
    );
  }

  inicializarCombos() {
    // Combo de Tipo Exame
    this.tipoExameService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoExame = this.tipoExameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoExame');
    modal.click();
  }

  salvar() {
    const objetoSalvar: ExameEBO = this.exameConverter.converterParaBackend(this.exame);

    if (this.exame && !this.exame.codigo) {
      this.exameService.salvar(objetoSalvar).subscribe(( objetoSalvo: ExameEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Exame salvo com sucesso.';
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
    const objetoAtualizado: ExameEBO = this.exameConverter.converterParaBackend(this.exame);
    this.exameService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: ExameEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Exame atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.exameService.buscarPorCodigo(codigo).subscribe((exame: ExameEBO) => {
      this.exame = this.exameConverter.converterParaFrontend(exame);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do exame.';
    });
  }

  buscar() {
    this.exameService.buscarPorNome(0, 10, this.exame.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaExame = this.exameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do exame.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.exameService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaExame = this.exameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do exame.';
    });
  }

  limparCampos() {
    this.exame = new Exame();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoExame');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.exameService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaExame = this.exameConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalExame() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.exame.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.exame.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
