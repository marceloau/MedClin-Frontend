import { MedicoEBO } from './../ebo/medicoebo';
import { Medico } from './../../../../model/medico.model';
import { MedicoConverter } from './../converter/medico.converter';
import { NgForm } from '@angular/forms';
import { Estado } from './../../../../model/estado.model';
import { Mensagem } from './../../../../model/mensagem';
import { TipoPlanoSaudeConverter } from './../../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraConverter } from './../../cadastro/operadora/converter/operadora.converter';
import { Excecao } from './../../../comum/excecao/excecao';
import { DominioService } from './../../../comum/services/dominio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { TipoContatoService } from '../../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../../cadastro/tipoContato/converter/tipocontato.converter';
import { EstadoCivil } from '../../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../../model/tipologradouro.model';
import { TipoContato } from '../../../../model/tipo-contato.model';
import { Constantes } from '../../../comum/constantes';
import { Pagina } from '../../../../model/comum/pagina.model';
import { MedicoService } from '../service/medico.service';

@Component({
  selector: 'app-perfilmedico',
  templateUrl: './perfilmedico.component.html',
  styleUrls: ['./perfilmedico.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter]
})
export class PerfilMedicoComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = false;

  medico = new Medico();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de medico
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  // Fim lista de atributos dos compbos de medico

  constructor(private route: ActivatedRoute, private medicoService: MedicoService, private medicoConverter: MedicoConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.medico.codigo = res.codigo;
      }
    );
    this.inicializarCombos();
    this.buscarPorCodigo(this.medico.codigo);
  }

  buscarPorCodigo(codigo: number) {
    this.medicoService.buscarPorCodigo(codigo).subscribe((medico: MedicoEBO) => {
      this.medico = this.medicoConverter.converterParaFrontend(medico);
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
  }

  atualizar() {
    const objetoAtualizado: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    this.medicoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Médico atualizado com sucesso.';
      this.habilitarEdicao = false;
      this.medico = this.medicoConverter.converterParaFrontend(objetoSalvo);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
