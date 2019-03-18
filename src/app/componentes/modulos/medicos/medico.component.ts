import { Especialidade } from './../../../model/dominio/especialidade.model';
import { EspecialidadeService } from './../cadastro/especialidade/service/especialidade.service';
import { Medico } from './../../../model/medico.model';
import { Router } from '@angular/router';
import { MedicoService } from './service/medico.service';
import { MedicoEBO } from './ebo/medicoebo';
import { TipoContato } from '../../../model/tipo-contato.model';
import { Excecao } from '../../comum/excecao/excecao';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { Constantes } from '../../comum/constantes';
import { DominioService } from '../../comum/services/dominio.service';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Pagina } from '../../../model/comum/pagina.model';
import { Mensagem } from '../../../model/mensagem';
import { Estado } from '../../../model/estado.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContatoService } from '../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../cadastro/tipoContato/converter/tipocontato.converter';
import { MedicoConverter } from './converter/medico.converter';
import { EspecialidadeConverter } from '../cadastro/especialidade/converter/especialidade.converter';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, TipoContatoConverter, EspecialidadeConverter]
})
export class MedicoComponent implements OnInit {

  constructor(private medicoService: MedicoService, private medicoConverter: MedicoConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private router: Router, private especialidadeService: EspecialidadeService, private especialidadeConverter: EspecialidadeConverter) { }

  @ViewChild('form')
  form: NgForm;

  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  habilitarEdicao = true;

  medico = new Medico();
  listaMedicos = new Array<Medico>();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de medico
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboEspecialidade = new Array<Especialidade>();
  // Fim lista de atributos dos compbos de medico

  pagina: Pagina;

  ngOnInit() {
    this.blockUI.start('Carregando...');
    this.medicoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaMedicos = this.medicoConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      const table: any = $('#tabelaMedicos');
      setTimeout(() =>
      table.DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false,
        'language': {
          'zeroRecords': 'Nenhum médico encontrado',
          'infoEmpty': 'Nenhum médico encontrado'
        },
      }), 0
      );
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
    this.inicializarCombos();
  }

  inicializarCombos() {
    // Combo de estado civil
    this.dominioService.listarDominio(Constantes.DOMINIO_ESTADO_CIVIL).subscribe((retorno: Array<any>) => {
      this.listaComboEstadoCivil = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_ESTADO_CIVIL);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de estado
    this.dominioService.listarDominio(Constantes.DOMINIO_ESTADO).subscribe((retorno: Array<any>) => {
      this.listaComboEstado = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_ESTADO);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de tipo logradouro
    this.dominioService.listarDominio(Constantes.DOMINIO_TIPO_LOGRADOURO).subscribe((retorno: Array<any>) => {
      this.listaComboTipoLogradouro = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_TIPO_LOGRADOURO);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Tipo Contato
    this.tipoContatoService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Especialidade
    this.especialidadeService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

  }

  inicializarTable() {
    const table: any = $('#tabelaMedicos');
    table.DataTable().destroy();
    setTimeout(() =>
      table.DataTable({
        'paging'      : true,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false,
        'language': {
          'zeroRecords': 'Nenhum médico encontrado',
          'infoEmpty': 'Nenhum médico encontrado'
        },
      }), 0
    );
  }

  salvar() {
    const objetoSalvar: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    this.blockUI.start('Carregando...');
    if (this.medico && !this.medico.codigo) {
      this.medicoService.salvar(objetoSalvar).subscribe(( objetoSalvo: MedicoEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Medico salvo com sucesso.';
        const modal: any = $('#fecharModal');
        modal.click();
        this.limparCampos();
        this.inicializarTable();
        this.listarRegistros(0, 10);
        this.blockUI.stop();
      }, err => {
        this.blockUI.stop();
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.atualizar();
    }
  }

  atualizar() {
    this.blockUI.start('Carregando...');
    const objetoAtualizado: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    this.medicoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Medico atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  listarRegistros(pagina, total) {
    this.blockUI.start('Carregando...');
    this.medicoService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaMedicos = this.medicoConverter.converterListaParaFrontend(retorno.content);
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  limparCampos() {
    this.medico = new Medico();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoMedico');
    modal.click();
  }

  buscarPorCodigo(codigo: number) {
    this.blockUI.start('Carregando...');
    this.medicoService.buscarPorCodigo(codigo).subscribe((medico: MedicoEBO) => {
      this.medico = this.medicoConverter.converterParaFrontend(medico);
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  fecharModalMedico() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  verPerfil(codigo: number) {
    this.router.navigate(['medico/perfil', codigo]);
  }

  buscar() {
    this.blockUI.start('Carregando...');
    this.medicoService.buscar(0, 10, this.medico.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaMedicos = this.medicoConverter.converterListaParaFrontend(retorno.content);
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number) {
    this.blockUI.start('Carregando...');
    this.medicoService.buscar(pagina, total, this.medico.nome).subscribe((retorno: Pagina) => {
     this.pagina = retorno;
     this.listaMedicos = this.medicoConverter.converterListaParaFrontend(retorno.content);
     this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  changePage(event) {
    if (this.medico.nome || this.medico.rg || this.medico.cpf || this.medico.contato.textoContato) {
      this.buscarPorNomePaginacao(event.page, event.size);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }

  changeEspecialidade(valor) {
    console.log();
  }

}
