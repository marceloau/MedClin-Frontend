import { NgForm } from '@angular/forms';
import { Estado } from './../../../model/estado.model';
import { Mensagem } from './../../../model/mensagem';
import { PacienteEBO } from './../pacientes/ebo/pacienteebo';
import { TipoPlanoSaudeConverter } from './../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraService } from './../cadastro/operadora/service/operadora.service';
import { OperadoraConverter } from './../cadastro/operadora/converter/operadora.converter';
import { Excecao } from './../../comum/excecao/excecao';
import { DominioService } from './../../comum/services/dominio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../model/paciente.model';
import { PacienteService } from '../pacientes/service/paciente.service';
import { PacienteConverter } from '../pacientes/converter/paciente.converter';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { TipoContatoService } from '../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../cadastro/tipoContato/converter/tipocontato.converter';
import { TipoPlanoSaudeService } from '../cadastro/tipoPlanoSaude/service/tipoplanosaude.service';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContato } from '../../../model/tipo-contato.model';
import { Operadora } from '../../../model/operadora.model';
import { TipoPlanoSaude } from '../../../model/tipoplanosaude.model';
import { Constantes } from '../../comum/constantes';
import { Pagina } from '../../../model/comum/pagina.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter]
})
export class PerfilComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = false;

  paciente = new Paciente();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de paciente
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboOperadora = new Array<Operadora>();
  listaComboTipoPlanoSaude = new Array<TipoPlanoSaude>();
  // Fim lista de atributos dos compbos de paciente

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService, private pacienteConverter: PacienteConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private operadoraService: OperadoraService, private operadoraConverter: OperadoraConverter,
    private tipoPlanoSaudeService: TipoPlanoSaudeService, private tipoPlanoSaudeConverter: TipoPlanoSaudeConverter,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.paciente.codigo = res.codigo;
      }
    );
    this.inicializarCombos();
    this.buscarPorCodigo(this.paciente.codigo);
  }

  buscarPorCodigo(codigo: number) {
    this.pacienteService.buscarPorCodigo(codigo).subscribe((paciente: PacienteEBO) => {
      this.paciente = this.pacienteConverter.converterParaFrontend(paciente);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  modoEdicao() {
    if (this.habilitarEdicao) {
      this.atualizar();
      this.habilitarEdicao = false;
    } else {
      this.habilitarEdicao = true;
    }
  }

  inicializarCombos() {
    // Combo de estado civil.
    this.dominioService.listarDominio(Constantes.DOMINIO_ESTADO_CIVIL).subscribe((retorno: Array<any>) => {
      this.listaComboEstadoCivil = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_ESTADO_CIVIL);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de estado.
    this.dominioService.listarDominio(Constantes.DOMINIO_ESTADO).subscribe((retorno: Array<any>) => {
      this.listaComboEstado = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_ESTADO);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de tipo logradouro.
    this.dominioService.listarDominio(Constantes.DOMINIO_TIPO_LOGRADOURO).subscribe((retorno: Array<any>) => {
      this.listaComboTipoLogradouro = this.dominioConverter.converterListaParaFrontend(retorno, Constantes.DOMINIO_TIPO_LOGRADOURO);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Tipo Contato.
    this.tipoContatoService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoContato = this.tipoContatoConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Operadora.
    this.operadoraService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboOperadora = this.operadoraConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    // Combo de Tipo Plano Saúde.
    this.tipoPlanoSaudeService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboTipoPlanoSaude = this.tipoPlanoSaudeConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  atualizar() {
    const objetoAtualizado: PacienteEBO = this.pacienteConverter.converterParaBackend(this.paciente);
    this.pacienteService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: PacienteEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Paciente atualizado com sucesso.';
      this.habilitarEdicao = false;
      this.paciente = this.pacienteConverter.converterParaFrontend(objetoSalvo);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
