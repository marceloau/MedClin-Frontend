import { ConsultaService } from './../consultas/service/consulta.service';
import { ConsultaConverter } from './../consultas/converter/consulta.converter';
import { SolicitacaoMedicamentoService } from './../consultas/service/solicitacaomedicamento.service';
import { SolicitacaoExameService } from './../consultas/service/solicitacaoexame.service';
import { TimeLine } from './../../../model/comum/timeline.model';
import { SolicitacaoMedicamento } from './../../../model/solicitacaomedicamento.model';
import { SolicitacaoExame } from './../../../model/solicitacaoexame.model';
import { Consulta } from './../../../model/consulta.model';
import { TimeLineConverter } from './../../comum/converter/timeline.converter';
import { SolicitacaoMedicamentoConverter } from './../consultas/converter/solicitacaomedicamento.converter';
import { SolicitacaoExameConverter } from './../consultas/converter/solicitacaoexame.converter';
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
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter,
    SolicitacaoExameConverter, SolicitacaoMedicamentoConverter, TimeLineConverter, ConsultaConverter]
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

  modalConsulta = new Consulta();

  totalConsultas: number;
  totalSolicitacoesExame: number;
  totalSolicitacoesMedicamento: number;

  possuiHistoricoClinico = false;
  possuiSolicitacaoExame = false;
  possuiSolicitacaoMedicamento = false;

  listaConsultas = new Array<Consulta>();
  listaSolicitacaoExame = new Array<SolicitacaoExame>();
  listaSolicitacaoMedicamento = new Array<SolicitacaoMedicamento>();

  listaTimeLineHistoricoClinico = new Array<TimeLine>();
  listaTimeLineSolicitacaoExame = new Array<TimeLine>();
  listaTimeLineSolicitacaoMedicamento = new Array<TimeLine>();

  constructor(private route: ActivatedRoute, private pacienteService: PacienteService, private pacienteConverter: PacienteConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private operadoraService: OperadoraService, private operadoraConverter: OperadoraConverter,
    private tipoPlanoSaudeService: TipoPlanoSaudeService, private tipoPlanoSaudeConverter: TipoPlanoSaudeConverter,
    private router: Router, private solicitacaoExameService: SolicitacaoExameService,
    private solicitacaoExameConverter: SolicitacaoExameConverter,
    private solicitacaoMedicamentoService: SolicitacaoMedicamentoService,
    private solicitacaoMedicamentoConverter: SolicitacaoMedicamentoConverter,
    private consultaService: ConsultaService,
    private consultaConverter: ConsultaConverter,
    private timeLineConverter: TimeLineConverter) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.paciente.codigo = res.codigo;
      }
    );
    this.inicializarCombos();
    this.pacienteService.buscarPorCodigo(this.paciente.codigo).subscribe((paciente: PacienteEBO) => {
      this.paciente = this.pacienteConverter.converterParaFrontend(paciente);
      // Listar solicitacoes de exame do paciente.
      this.solicitacaoExameService.listarRegistrosCodigoPaciente(0, 100, this.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaSolicitacaoExame = this.solicitacaoExameConverter.converterListaParaFrontend(retorno.content);
        this.totalSolicitacoesExame = retorno.totalElements;
        if (this.listaSolicitacaoExame.length > 0) {
          this.possuiSolicitacaoExame = true;
          this.listaTimeLineSolicitacaoExame = this.timeLineConverter.montarTimeLineSolicitacaoExame(this.listaSolicitacaoExame);
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

      // Listar solicitacoes de medicamento do paciente.
      this.solicitacaoMedicamentoService.listarRegistrosCodigoPaciente(0, 100, this.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaSolicitacaoMedicamento = this.solicitacaoMedicamentoConverter.converterListaParaFrontend(retorno.content);
        this.totalSolicitacoesMedicamento = retorno.totalElements;
        if (this.listaSolicitacaoMedicamento.length > 0) {
          this.possuiSolicitacaoMedicamento = true;
          this.listaTimeLineSolicitacaoMedicamento = this.timeLineConverter
          .montarTimeLineSolicitacaoMedicamento(this.listaSolicitacaoMedicamento);
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

      // Listando consultas do paciente.
      this.consultaService.buscar(0, 100, null, null, null, this.paciente.codigo)
      .subscribe((retorno: Pagina) => {
        this.listaConsultas = this.consultaConverter.converterListaParaFrontend(retorno.content);
        this.totalConsultas = retorno.totalElements;
        if (this.listaConsultas.length > 0) {
          this.possuiHistoricoClinico = true;
          this.listaTimeLineHistoricoClinico = this.timeLineConverter.montarTimeLineHistoricoClinico(this.listaConsultas);
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
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

  verConsulta(consulta: Consulta) {
    this. modalConsulta = consulta;
  }
}
