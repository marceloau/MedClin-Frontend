import { Constantes } from './../../../comum/constantes';
import { GerenciadorArquivosImpressaoS3Service } from './../../comum/service/gerenciadorarquivosimpressaos3.service';
import { ImpressaoService } from './../../comum/service/impressao.service';
import { TimeLineConverter } from '../../../comum/converter/timeline.converter';
import { TimeLine } from '../../../../model/comum/timeline.model';
import { MedicamentoConverter } from '../../cadastro/medicamento/converter/medicamento.converter';
import { MedicamentoService } from '../../cadastro/medicamento/service/medicamento.service';
import { Medicamento } from '../../../../model/medicamento.model';
import { Pagina } from '../../../../model/comum/pagina.model';
import { ExameConverter } from '../../cadastro/exame/converter/exame.converter';
import { ExameService } from '../../cadastro/exame/service/exame.service';
import { Exame } from '../../../../model/exame.model';
import { SolicitacaoMedicamento } from '../../../../model/solicitacaomedicamento.model';
import { SolicitacaoMedicamentoConverter } from '../converter/solicitacaomedicamento.converter';
import { SolicitacaoMedicamentoService } from '../service/solicitacaomedicamento.service';
import { SolicitacaoExame } from '../../../../model/solicitacaoexame.model';
import { SolicitacaoExameConverter } from '../converter/solicitacaoexame.converter';
import { SolicitacaoExameService } from '../service/solicitacaoexame.service';
import { ConsultaEBO } from '../ebo/consultaebo';
import { ConsultaConverter } from '../converter/consulta.converter';
import { ConsultaService } from '../service/consulta.service';
import { NgForm } from '@angular/forms';
import { Estado } from '../../../../model/estado.model';
import { Mensagem } from '../../../../model/mensagem';
import { TipoPlanoSaudeConverter } from '../../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraConverter } from '../../cadastro/operadora/converter/operadora.converter';
import { Excecao } from '../../../comum/excecao/excecao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../../model/paciente.model';
import { PacienteConverter } from '../../pacientes/converter/paciente.converter';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { TipoContatoConverter } from '../../cadastro/tipoContato/converter/tipocontato.converter';
import { EstadoCivil } from '../../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../../model/tipologradouro.model';
import { TipoContato } from '../../../../model/tipo-contato.model';
import { Operadora } from '../../../../model/operadora.model';
import { TipoPlanoSaude } from '../../../../model/tipoplanosaude.model';
import { Consulta } from '../../../../model/consulta.model';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-atendimentoconsulta',
  templateUrl: './atendimentoconsulta.component.html',
  styleUrls: ['./atendimentoconsulta.component.css'],
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter,
    TipoPlanoSaudeConverter, SolicitacaoExameConverter, SolicitacaoMedicamentoConverter, TimeLineConverter]
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

  modalBuscarExame = new Exame();
  listaModalExame = new Array<Exame>();
  paginaModalExame = new Pagina();

  modalBuscarMedicamento = new Medicamento();
  listaModalMedicamento = new Array<Medicamento>();
  paginaModalMedicamento = new Pagina();

  mensagem = new Mensagem();

  // Inicio lista de atributos dos compbos de paciente
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboOperadora = new Array<Operadora>();
  listaComboTipoPlanoSaude = new Array<TipoPlanoSaude>();
  // Fim lista de atributos dos compbos de paciente

  listaTimeLineHistoricoClinico = new Array<TimeLine>();
  listaTimeLineSolicitacaoExame = new Array<TimeLine>();
  listaTimeLineSolicitacaoMedicamento = new Array<TimeLine>();

  constructor(private route: ActivatedRoute, private timeLineConverter: TimeLineConverter,
    private excecao: Excecao, private consultaService: ConsultaService,
    private consultaConverter: ConsultaConverter,
    private exameService: ExameService,
    private exameConverter: ExameConverter,
    private solicitacaoExameService: SolicitacaoExameService,
    private solicitacaoExameConverter: SolicitacaoExameConverter,
    private solicitacaoMedicamentoService: SolicitacaoMedicamentoService,
    private solicitacaoMedicamentoConverter: SolicitacaoMedicamentoConverter,
    private impressaoService: ImpressaoService,
    private gerenciadorArquivosS3Service: GerenciadorArquivosImpressaoS3Service,
    private medicamentoService: MedicamentoService,
    private medicamentoConverter: MedicamentoConverter,
    public toastr: ToastrManager,
    private router: Router) { }

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
          this.listaTimeLineSolicitacaoExame = this.timeLineConverter.montarTimeLineSolicitacaoExame(this.listaSolicitacaoExame);
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
          this.listaTimeLineSolicitacaoMedicamento = this.timeLineConverter
          .montarTimeLineSolicitacaoMedicamento(this.listaSolicitacaoMedicamento);
        }
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });

      // Listando consultas do paciente.
      this.consultaService.buscar(0, 100, null, null, null, this.consulta.paciente.codigo, null)
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
    this.consultaService.buscarPorCodigo(codigo).subscribe((consulta: ConsultaEBO) => {
      this.consulta = this.consultaConverter.converterParaFrontend(consulta);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarExame() {
    if (this.modalBuscarExame.nome) {
      this.exameService.buscarPorNome(0, 10, this.modalBuscarExame.nome).subscribe((retorno: Pagina) => {
        this.paginaModalExame = retorno;
        if (retorno && retorno.content) {
          this.listaModalExame = this.exameConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaModalExame = [];
        }
        this.inicializarTableModalSolicitacaoExame();
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.exameService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
        this.paginaModalExame = retorno;
        if (retorno && retorno.content) {
          this.listaModalExame = this.exameConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaModalExame = [];
        }
        this.inicializarTableModalSolicitacaoExame();
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }
  }

  inicializarTableModalSolicitacaoExame() {
    const table: any = $('#tabelaModalSolicitacaoExame');
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
          'zeroRecords': 'Nenhuma solicitação de exame encontrada',
          'infoEmpty': 'Nenhuma solicitação de exame encontrada'
        },
      }), 0
    );
  }

  selecionarExame(exame: Exame) {
    const exameSolicitado = this.consulta.listaSolicitacaoExame.filter(item => item.exame.codigo === exame.codigo);
    if (exameSolicitado.length > 0) {
      this.toastr.infoToastr('Exame de ' + exame.nome + ' já consta na lista de solicitações', 'Info!');
    } else {
      this.consulta.listaSolicitacaoExame.push(this.solicitacaoExameConverter.converterExameParaSolicitacaoExame(exame, this.consulta));
      this.toastr.successToastr('Exame de ' + exame.nome + ' adicionado a lista de solicitações', 'Sucesso!');
    }
  }

  removerSolicitacaoExame(solicitacaoExame: SolicitacaoExame) {
    this.consulta.listaSolicitacaoExame = this.consulta.listaSolicitacaoExame
    .filter(item => item.exame.codigo !== solicitacaoExame.exame.codigo);
  }

  removerSolicitacaoMedicamento(solicitacaoMedicamento: SolicitacaoMedicamento) {
    this.consulta.listaSolicitacaoMedicamento = this.consulta.listaSolicitacaoMedicamento.filter(item =>
      item.medicamento.codigo !== solicitacaoMedicamento.medicamento.codigo);
  }

  buscarMedicamento() {
    if (this.modalBuscarMedicamento.nome) {
      this.medicamentoService.buscarPorNome(0, 10, this.modalBuscarMedicamento.nome).subscribe((retorno: Pagina) => {
        this.paginaModalMedicamento = retorno;
        if (retorno && retorno.content) {
          this.listaModalMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaModalMedicamento = [];
        }
        this.inicializarTableModalSolicitacaoMedicamento();
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.medicamentoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
        this.paginaModalMedicamento = retorno;
        if (retorno && retorno.content) {
          this.listaModalMedicamento = this.medicamentoConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaModalMedicamento = [];
        }
        this.inicializarTableModalSolicitacaoMedicamento();
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }
  }

  inicializarTableModalSolicitacaoMedicamento() {
    const table: any = $('#tabelaModalSolicitacaoMedicamento');
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
          'zeroRecords': 'Nenhuma solicitação de medicamento encontrada',
          'infoEmpty': 'Nenhuma solicitação de medicamento encontrada'
        },
      }), 0
    );
  }

  selecionarMedicamento(medicamento: Medicamento) {
    const medicamentoPrescrito = this.consulta.listaSolicitacaoMedicamento.filter(item => item.medicamento.codigo === medicamento.codigo);
    if (medicamentoPrescrito.length > 0) {
      this.toastr.infoToastr('Medicamento ' + medicamento.nome + ' já consta na lista de medicamentos prescritos.', 'Info!');
    } else {
      this.consulta.listaSolicitacaoMedicamento.push(this.solicitacaoMedicamentoConverter
        .converterMedicamentoParaSolicitacaoMedicamento(medicamento, this.consulta));
      this.toastr.successToastr('Medicamento ' + medicamento.nome + ' adicionado a lista de medicamentos prescritos.', 'Sucesso!');
    }
  }

  finalizarConsulta() {
    this.consulta.dataAtendimento = new Date();
    this.consulta.codigoStatusConsulta = Constantes.STATUS_CONSULTA_FINALIZADA;
    const objetoAtualizado: ConsultaEBO = this.consultaConverter.converterParaBackend(this.consulta);
    this.consultaService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Consulta finalizada com sucesso.';
      this.habilitarEdicao = false;
      this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
      this.router.navigate(['/consultas/atendimento']);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  imprimirTodasSolicitacoesMedicamento () {
    let solicitacoesMedicamentosImprimir = '';
    for (const index of this.consulta.listaSolicitacaoMedicamento) {
      solicitacoesMedicamentosImprimir = index.medicamento.codigo + ',';
    }
    this.impressaoService.imprimirSolicitacaoMedicamento(this.consulta.codigo, solicitacoesMedicamentosImprimir)
    .subscribe(( impressao: any) => {
      console.log(impressao);
      if (impressao && impressao.nomeArquivo) {
        this.gerenciadorArquivosS3Service.baixarImpressao(impressao.nomeArquivo);
      }
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
