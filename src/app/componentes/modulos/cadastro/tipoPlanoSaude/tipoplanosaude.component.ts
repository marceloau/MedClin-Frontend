import { TipoPlanoSaudeConverter } from './converter/tipoplanosaude.converter';
import { Mensagem } from '../../../../model/mensagem';
import { TipoPlanoSaudeEBO } from './ebo/tipoplanosaudeebo';
import { TipoPlanoSaudeService } from './service/tipoplanosaude.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { TipoPlanoSaude } from '../../../../model/tipoplanosaude.model';
import { Pagina } from '../../../../model/comum/pagina.model';
import { Excecao } from '../../../comum/excecao/excecao';

@Component({
  selector: 'app-tipoplanosaude',
  templateUrl: './tipoplanosaude.component.html',
  styleUrls: ['./tipoplanosaude.component.css'],
  providers: [TipoPlanoSaudeConverter, Excecao]
})
export class TipoPlanoSaudeComponent implements OnInit {

  constructor(private tipoPlanoSaudeService: TipoPlanoSaudeService, private tipoPlanoSaudeConverter: TipoPlanoSaudeConverter,
    private excecao: Excecao) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaTipoPlanoSaude = new Array<TipoPlanoSaude>();

  tipoPlanoSaude = new TipoPlanoSaude();

  pagina: Pagina;


  ngOnInit() {
    this.tipoPlanoSaudeService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
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
    const table: any = $('#tabelaTipoPlanoSaude');
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
          'zeroRecords': 'Nenhum tipo de plano de saúde encontrado',
          'infoEmpty': 'Nenhum tipo de plano de saúde encontrado'
        },
      }), 0
    );
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoPlanoSaude');
    modal.click();
  }

  salvar() {
    const objetoSalvar: TipoPlanoSaudeEBO = this.tipoPlanoSaudeConverter.converterParaBackend(this.tipoPlanoSaude);

    if (this.tipoPlanoSaude && !this.tipoPlanoSaude.codigo) {
      this.tipoPlanoSaudeService.salvar(objetoSalvar).subscribe(( objetoSalvo: TipoPlanoSaudeEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Tipo de plano de saúde salvo com sucesso.';
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
    const objetoAtualizado: TipoPlanoSaudeEBO = this.tipoPlanoSaudeConverter.converterParaBackend(this.tipoPlanoSaude);
    this.tipoPlanoSaudeService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: TipoPlanoSaudeEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Tipo de plano de saúde atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.tipoPlanoSaudeService.buscarPorCodigo(codigo).subscribe((tipoPlanoSaude: TipoPlanoSaudeEBO) => {
      this.tipoPlanoSaude = this.tipoPlanoSaudeConverter.converterParaFrontend(tipoPlanoSaude);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do tipo de plano de saúde.';
    });
  }

  buscar() {
    this.tipoPlanoSaudeService.buscarPorNome(0, 10, this.tipoPlanoSaude.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do tipo de plano de saúde.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.tipoPlanoSaudeService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do tipo do plano de serviço.';
    });
  }

  limparCampos() {
    this.tipoPlanoSaude = new TipoPlanoSaude();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoTipoPlanoSaude');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.tipoPlanoSaudeService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalTipoPlanoSaude() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.tipoPlanoSaude.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.tipoPlanoSaude.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
