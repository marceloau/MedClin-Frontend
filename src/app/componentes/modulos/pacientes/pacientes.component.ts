import { Router } from '@angular/router';
import { PacienteService } from './service/paciente.service';
import { PacienteEBO } from './ebo/pacienteebo';
import { TipoPlanoSaude } from './../../../model/tipoplanosaude.model';
import { TipoPlanoSaudeService } from './../cadastro/tipoPlanoSaude/service/tipoplanosaude.service';
import { OperadoraConverter } from './../cadastro/operadora/converter/operadora.converter';
import { OperadoraService } from './../cadastro/operadora/service/operadora.service';
import { TipoContato } from './../../../model/tipo-contato.model';
import { Excecao } from './../../comum/excecao/excecao';
import { DominioConverter } from './../../comum/converter/dominio.converter';
import { Constantes } from '../../comum/constantes';
import { DominioService } from './../../comum/services/dominio.service';
import { EstadoCivil } from './../../../model/estadocivil.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from '../../../model/paciente.model';
import { NgForm } from '@angular/forms';
import { Pagina } from '../../../model/comum/pagina.model';
import { Mensagem } from '../../../model/mensagem';
import { Estado } from '../../../model/estado.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContatoService } from '../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../cadastro/tipoContato/converter/tipocontato.converter';
import { Operadora } from '../../../model/operadora.model';
import { TipoPlanoSaudeConverter } from '../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { PacienteConverter } from './converter/paciente.converter';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter]
})
export class PacientesComponent implements OnInit {

  constructor(private pacienteService: PacienteService, private pacienteConverter: PacienteConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private operadoraService: OperadoraService, private operadoraConverter: OperadoraConverter,
    private tipoPlanoSaudeService: TipoPlanoSaudeService, private tipoPlanoSaudeConverter: TipoPlanoSaudeConverter,
    private router: Router) { }

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = true;

  paciente = new Paciente();
  listaPacientes = new Array<Paciente>();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de paciente
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboOperadora = new Array<Operadora>();
  listaComboTipoPlanoSaude = new Array<TipoPlanoSaude>();
  // Fim lista de atributos dos compbos de paciente

  pagina: Pagina;

  ngOnInit() {
    this.pacienteService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.listaPacientes = this.pacienteConverter.converterListaParaFrontend(retorno.content);
      this.pagina = retorno;
      const table: any = $('#tabelaPacientes');
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

    // Combo de Operadora
    this.operadoraService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Tipo Plano Saúde
    this.tipoPlanoSaudeService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  inicializarTable() {
    const table: any = $('#tabelaPacientes');
    table.DataTable().destroy();
    setTimeout(() =>
      table.DataTable({
        'paging'      : true,
        'lengthChange': false,
        'searching'   : false,
        'ordering'    : true,
        'info'        : false,
        'autoWidth'   : false
      }), 0
    );
  }

  salvar() {
    const objetoSalvar: PacienteEBO = this.pacienteConverter.converterParaBackend(this.paciente);

    if (this.paciente && !this.paciente.codigo) {
      this.pacienteService.salvar(objetoSalvar).subscribe(( objetoSalvo: PacienteEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Paciente salvo com sucesso.';
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
    const objetoAtualizado: PacienteEBO = this.pacienteConverter.converterParaBackend(this.paciente);
    this.pacienteService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: PacienteEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Paciente atualizado com sucesso.';
      const modal: any = $('#fecharModal');
      modal.click();
      this.listarRegistros(0, 10);
      this.limparCampos();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  listarRegistros(pagina, total) {
    this.pacienteService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaPacientes = this.pacienteConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  limparCampos() {
    this.paciente = new Paciente();
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoPaciente');
    modal.click();
  }

  buscarPorCodigo(codigo: number) {
    this.pacienteService.buscarPorCodigo(codigo).subscribe((paciente: PacienteEBO) => {
      this.paciente = this.pacienteConverter.converterParaFrontend(paciente);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  fecharModalPaciente() {
    this.limparCampos();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharModal');
    modal.click();
    this.habilitarEdicao = true;
  }

  verPerfil(codigo: number) {
    this.router.navigate(['perfil', codigo]);
  }

  buscar() {
    const codigoTipoPlanoSaude = (this.paciente.planoSaude.tipoPlanoSaude.codigo ?
      this.paciente.planoSaude.tipoPlanoSaude.codigo.toString() : undefined);
    this.pacienteService.buscar(0, 10, this.paciente.nome, this.paciente.nomeMae, this.paciente.rg, this.paciente.cpf,
      this.paciente.numeroCartaoSUS, codigoTipoPlanoSaude, this.paciente.contato.textoContato
      ).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaPacientes = this.pacienteConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    const codigoTipoPlanoSaude = (this.paciente.planoSaude.tipoPlanoSaude.codigo ?
      this.paciente.planoSaude.tipoPlanoSaude.codigo.toString() : null);
    this.pacienteService.buscar(0, 10, this.paciente.nome, this.paciente.nomeMae, this.paciente.rg, this.paciente.cpf,
      this.paciente.numeroCartaoSUS, codigoTipoPlanoSaude, this.paciente.contato.textoContato
      ).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaPacientes = this.pacienteConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  changePage(event) {
    if (this.paciente.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.paciente.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }

}
