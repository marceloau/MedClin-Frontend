import { OperadoraConverter } from './converter/operadora.converter';
import { Operadora } from './../../../../model/operadora.model';
import { Mensagem } from './../../../../model/mensagem';
import { OperadoraEBO } from './ebo/operadoraebo';
import { OperadoraService } from './service/operadora.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

// import necessário para o datatable funcionar corretamente.
import * as $ from 'jquery';
import 'DataTables.net';
import 'datatables.net-bs4';
import { Pagina } from '../../../../model/comum/pagina.model';

@Component({
  selector: 'app-operadora',
  templateUrl: './operadora.component.html',
  styleUrls: ['./operadora.component.css'],
  providers: [OperadoraConverter]
})
export class OperadoraComponent implements OnInit {

  constructor(private operadoraService: OperadoraService, private operadoraConverter: OperadoraConverter) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaOperadora = new Array<Operadora>();

  operadora = new Operadora();

  pagina: Pagina;


  ngOnInit() {
    this.operadoraService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      const table: any = $('#tabelaOperadora');
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
    const modal: any = $('#btnNovaOperadora');
    modal.click();
  }

  salvar() {
    const objetoSalvar: OperadoraEBO = this.operadoraConverter.converterParaBackend(this.operadora);

    if (this.operadora && !this.operadora.codigo) {
      this.operadoraService.salvar(objetoSalvar).subscribe(( objetoSalvo: OperadoraEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Operadora Salva com sucesso.';
        const modal: any = $('#fecharModal');
        modal.click();
        this.limparCampos();
        this.listarRegistros(0, 10);
      }, err => {
        // @TODO colocar para retornar exceção do util exceção.
        this.mensagem.codigoTipo = 1;
        this.mensagem.titulo = 'Erro';
        this.mensagem.texto = 'Não foi possível salvar a operadora no sistema.';
      });
    } else {
      this.atualizar();
    }
  }

  atualizar() {
    const objetoAtualizado: OperadoraEBO = this.operadoraConverter.converterParaBackend(this.operadora);
    this.operadoraService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: OperadoraEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Operadora atualizada com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Não foi possível atualizar a operadora.';
    });
  }

  buscarPorCodigo(codigo: number) {
    this.operadoraService.buscarPorCodigo(codigo).subscribe((operadora: OperadoraEBO) => {
      this.operadora = this.operadoraConverter.converterParaFrontend(operadora);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código da operadora.';
    });
  }

  buscar() {
    if (this.operadora.nome) {
      this.operadoraService.buscarPorNome(0, 10, this.operadora.nome).subscribe((retorno: Pagina) => {
        this.pagina = retorno;
        this.listaOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
      }, err => {
        // @TODO colocar para retornar exceção do util exceção.
        this.mensagem.codigoTipo = 1;
        this.mensagem.titulo = 'Erro';
        this.mensagem.texto = 'Nenhum registro encontrado para o nome da operadora.';
      });
    } else {
      this.operadoraService.buscarPorCodigoOficial(this.operadora.codigoOficial).subscribe((retorno: Pagina) => {
        this.pagina = retorno;
        this.listaOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
      }, err => {
        // @TODO colocar para retornar exceção do util exceção.
        this.mensagem.codigoTipo = 1;
        this.mensagem.titulo = 'Erro';
        this.mensagem.texto = 'Nenhum registro encontrado para o código oficial da operadora.';
      });
    }
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.operadoraService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código da operadora.';
    });
  }

  limparCampos() {
    this.operadora = new Operadora();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovaOperadora');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.operadoraService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalOperadora() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.operadora.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.operadora.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
