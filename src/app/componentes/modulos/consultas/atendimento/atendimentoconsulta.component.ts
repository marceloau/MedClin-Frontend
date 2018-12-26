import { SolicitacaoMedicamento } from './../../../../model/solicitacaomedicamento.model';
import { SolicitacaoMedicamentoConverter } from './../converter/solicitacaomedicamento.converter';
import { SolicitacaoMedicamentoService } from './../service/solicitacaomedicamento.service';
import { SolicitacaoExame } from './../../../../model/solicitacaoexame.model';
import { SolicitacaoExameConverter } from './../converter/solicitacaoexame.converter';
import { SolicitacaoExameEBO } from './../ebo/solicitacaoexameebo';
import { SolicitacaoExameService } from './../service/solicitacaoexame.service';
import { ConsultaEBO } from './../ebo/consultaebo';
import { ConsultaConverter } from './../converter/consulta.converter';
import { ConsultaService } from './../service/consulta.service';
import { NgForm } from '@angular/forms';
import { Estado } from './../../../../model/estado.model';
import { Mensagem } from './../../../../model/mensagem';
import { TipoPlanoSaudeConverter } from './../../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraService } from './../../cadastro/operadora/service/operadora.service';
import { OperadoraConverter } from './../../cadastro/operadora/converter/operadora.converter';
import { Excecao } from './../../../comum/excecao/excecao';
import { DominioService } from './../../../comum/services/dominio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../../model/paciente.model';
import { PacienteService } from '../../pacientes/service/paciente.service';
import { PacienteConverter } from '../../pacientes/converter/paciente.converter';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { TipoContatoService } from '../../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../../cadastro/tipoContato/converter/tipocontato.converter';
import { TipoPlanoSaudeService } from '../../cadastro/tipoPlanoSaude/service/tipoplanosaude.service';
import { EstadoCivil } from '../../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../../model/tipologradouro.model';
import { TipoContato } from '../../../../model/tipo-contato.model';
import { Operadora } from '../../../../model/operadora.model';
import { TipoPlanoSaude } from '../../../../model/tipoplanosaude.model';
import { Constantes } from '../../../comum/constantes';
import { Pagina } from '../../../../model/comum/pagina.model';
import { Consulta } from '../../../../model/consulta.model';

@Component({
  selector: 'app-atendimentoconsulta',
  templateUrl: './atendimentoconsulta.component.html',
  styleUrls: ['./atendimentoconsulta.component.css'],
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter]
})
export class AtendimentoConsultaComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = false;

  consulta = new Consulta();
  paciente = new Paciente();
  possuiHistoricoClinico = false;
  possuiSolicitacaoExame = false;
  possuiSolicitacaoMedicamento = false;
  totalConsultas: number;
  totalSolicitacoesExame: number;
  totalSolicitacoesMedicamento: number;

  listaConsultas = new Array<Consulta>();
  listaSolicitacaoExame = new Array<SolicitacaoExame>();
  listaSolicitacaoMedicamento = new Array<SolicitacaoMedicamento>();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de paciente
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboOperadora = new Array<Operadora>();
  listaComboTipoPlanoSaude = new Array<TipoPlanoSaude>();
  // Fim lista de atributos dos compbos de paciente

  constructor(private route: ActivatedRoute,
    private excecao: Excecao, private consultaService: ConsultaService,
    private consultaConverter: ConsultaConverter,
    private solicitacaoExameService: SolicitacaoExameService, private solicitacaoExameConverter: SolicitacaoExameConverter,
    private solicitacaoMedicamentoService: SolicitacaoMedicamentoService,
    private solicitacaoMedicamentoConverter: SolicitacaoMedicamentoConverter) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.consulta.codigo = res.codigo;
      }
    );

    // Buscando a consulta do paciente.
    this.consultaService.buscarPorCodigo(this.consulta.codigo).subscribe((consulta: ConsultaEBO) => {
      this.consulta = this.consultaConverter.converterParaFrontend(consulta);

      // Listar solicitacoes de exame do paciente.
      this.solicitacaoExameService.listarRegistrosCodigoPaciente(0, 100, this.consulta.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaSolicitacaoExame = this.solicitacaoExameConverter.converterListaParaFrontend(retorno.content);
        this.totalSolicitacoesExame = retorno.totalElements;
        if (this.listaSolicitacaoExame.length > 0) {
          this.possuiSolicitacaoExame = true;
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

      // Listar solicitacoes de medicamento do paciente.
      this.solicitacaoMedicamentoService.listarRegistrosCodigoPaciente(0, 100, this.consulta.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaSolicitacaoMedicamento = this.solicitacaoMedicamentoConverter.converterListaParaFrontend(retorno.content);
        this.totalSolicitacoesMedicamento = retorno.totalElements;
        if (this.listaSolicitacaoMedicamento.length > 0) {
          this.possuiSolicitacaoMedicamento = true;
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

      // Listando consultas do paciente.
      this.consultaService.buscar(0, 100, null, null, null, this.consulta.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaConsultas = this.consultaConverter.converterListaParaFrontend(retorno.content);
        this.totalConsultas = retorno.totalElements;
        if (this.listaConsultas.length > 0) {
          this.possuiHistoricoClinico = true;
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPorCodigo(codigo: number) {
    this.consultaService.buscarPorCodigo(codigo).subscribe((consulta: ConsultaEBO) => {
      this.consulta = this.consultaConverter.converterParaFrontend(consulta);
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

  atualizar() {
    const objetoAtualizado: ConsultaEBO = this.consultaConverter.converterParaBackend(this.consulta);
    this.consultaService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Consulta atualizado com sucesso.';
      this.habilitarEdicao = false;
      this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
