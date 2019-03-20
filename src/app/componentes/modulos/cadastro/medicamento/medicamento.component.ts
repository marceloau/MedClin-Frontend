import { DominioConverter } from './../../../comum/converter/dominio.converter';
import { Constantes } from './../../../comum/constantes';
import { DominioService } from './../../../comum/services/dominio.service';
import { UsoMedicamento } from './../../../../model/usomedicamento.model';
import { MedicamentoService } from './service/medicamento.service';
import { TipoMedicamentoService } from '../tipoMedicamento/service/tipomedicamento.service';
import { TipoMedicamentoConverter } from '../tipoMedicamento/converter/tipomedicamento.converter';
import { Medicamento } from '../../../../model/medicamento.model';
import { MedicamentoEBO } from './ebo/medicamentoebo';
import { MedicamentoConverter } from './converter/medicamento.converter';
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
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css'],
  providers: [MedicamentoConverter, Excecao, TipoMedicamentoConverter, DominioConverter]
})
export class MedicamentoComponent implements OnInit {

  constructor(private medicamentoService: MedicamentoService, private medicamentoConverter: MedicamentoConverter,
    private excecao: Excecao, private tipoMedicamentoConverter: TipoMedicamentoConverter,
    private tipoMedicamentoService: TipoMedicamentoService, private dominioConverter: DominioConverter,
    private dominioService: DominioService) {
  }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  mensagem = new Mensagem();
  listaMedicamento = new Array<Medicamento>();
  listaComboTipoMedicamento = new Array<TipoMedicamento>();
  listaComboUsoMedicamento = new Array<UsoMedicamento>();

  medicamento = new Medicamento();

  pagina: Pagina;


  ngOnInit() {
    this.medicamentoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
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
    const table: any = $('#tabelaMedicamento');
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
          'zeroRecords': 'Nenhum medicamento encontrado',
          'infoEmpty': 'Nenhum medicamento encontrado'
        },
      }), 0
    );
  }

  inicializarCombos() {
    // Combo de Tipo Medicamento
    this.tipoMedicamentoService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoMedicamento = this.tipoMedicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Uso Medicamento
    this.dominioService.listarDominio(Constantes.DOMINIO_USO_MEDICAMENTO).subscribe((retorno: Array<any>) => {
      this.listaComboUsoMedicamento = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_USO_MEDICAMENTO);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  visualizarRegistro(codigo: number) {
    this.habilitarEdicao = false;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoMedicamento');
    modal.click();
  }

  salvar() {
    const objetoSalvar: MedicamentoEBO = this.medicamentoConverter.converterParaBackend(this.medicamento);

    if (this.medicamento && !this.medicamento.codigo) {
      this.medicamentoService.salvar(objetoSalvar).subscribe(( objetoSalvo: MedicamentoEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Medicamento salvo com sucesso.';
        const modal: any = $('#fecharModal');
        modal.click();
        this.listarRegistros(0, 10);
        this.limparCampos();
        this.inicializarTable();
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.atualizar();
    }
  }

  atualizar() {
    const objetoAtualizado: MedicamentoEBO = this.medicamentoConverter.converterParaBackend(this.medicamento);
    this.medicamentoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicamentoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Medicamento atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.medicamentoService.buscarPorCodigo(codigo).subscribe((medicamento: MedicamentoEBO) => {
      this.medicamento = this.medicamentoConverter.converterParaFrontend(medicamento);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o código do medicamento.';
    });
  }

  buscar() {
    this.medicamentoService.buscarPorNome(0, 10, this.medicamento.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do medicamento.';
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.medicamentoService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado para o nome do medicamento.';
    });
  }

  limparCampos() {
    this.medicamento = new Medicamento();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoMedicamento');
    modal.click();
  }

  listarRegistros(pagina, total) {
    this.medicamentoService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      // @TODO colocar para retornar exceção do util exceção.
      this.mensagem.codigoTipo = 1;
      this.mensagem.titulo = 'Erro';
      this.mensagem.texto = 'Nenhum registro encontrado.';
    });
  }

  fecharModalMedicamento() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  changePage(event) {
    if (this.medicamento.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.medicamento.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }
}
