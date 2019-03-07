import { PacienteService } from './../modulos/pacientes/service/paciente.service';
import { ConsultaEBO } from './../modulos/consultas/ebo/consultaebo';
import { Consulta } from './../../model/consulta.model';
import { StatusConsulta } from './../modulos/consultas/statusconsulta.enum';
import { DatePipe } from '@angular/common';
import { Constantes } from '..//comum/constantes';
import { Mensagem } from './../../model/mensagem';
import { Pagina } from './../../model/comum/pagina.model';
import { Excecao } from '../comum/excecao/excecao';
import { ConsultaConverter } from '../modulos/consultas/converter/consulta.converter';
import { ConsultaService } from '../modulos/consultas/service/consulta.service';
import { AuthService } from '../seguranca/auth.service';
import { SessionStorageService } from '../seguranca/session-storage.service';
import { SegurancaService } from '../seguranca/seguranca.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
// Import BlockUI decorator & optional NgBlockUI type
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [Excecao]
})
export class HomeComponent implements OnInit {

  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  mostrarMenu: boolean = false;
  public seguranca: SegurancaService;
  mostrarMenuEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  listaConsultaDia = new Array();
  dataHoje = this.datePipe.transform(new Date(), Constantes.FORMATO_DATA_BACKEND_DATE);
  mensagem = new Mensagem();
  StatusConsulta: typeof StatusConsulta = StatusConsulta;
  totalPacientes = 0;
  totalConsultas = 0;

  exibirTabelaConsultasDia: boolean = false;

  // Ações tabela Ordem de Chegada
  habilitarCamposOrdemChegada: boolean = false;
  habilitarBotaoSalvarOrdemChegada: boolean = false;
  // Ações tabela Ordem de Chegada


  constructor(private storage: SessionStorageService, private authService: AuthService,
    private consultaService: ConsultaService, private consultaConverter: ConsultaConverter,
    private excecao: Excecao, private datePipe: DatePipe, private router: Router,
    public toastr: ToastrManager, private pacienteService: PacienteService) {
    this.authService.mostrarMenuEmitter.subscribe(data => this.mostrarMenu = data);
  }

  ngOnInit() {
    this.blockUI.start('Carregando...');
    const usuario = this.storage.get('logged');
    if (usuario && usuario.token) {
      this.seguranca = SegurancaService.getInstancia();
      this.authService.mostrarMenuEmitter.emit(true);
    }

    this.consultaService.buscar(0, 10, null, this.dataHoje.toString(), null, null, null).subscribe((retorno: Pagina) => {
      if (retorno) {
        this.listaConsultaDia = this.consultaConverter.converterListaParaFrontend(retorno.content);
        if(this.listaConsultaDia && this.listaConsultaDia.length > 0){
          this.exibirTabelaConsultasDia = true;
          this.inicializarTableModalConsulta();
        }
      }
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });

    this.buscarTotalPacientes();
    this.buscarTotalConsultas();

  }

  buscarTotalPacientes() {
    this.blockUI.start('Carregando...');
    this.pacienteService.totalPacientes().subscribe((totalPacientes: number) => {
      this.totalPacientes = totalPacientes;
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarTotalConsultas() {
    this.blockUI.start('Carregando...');
    this.consultaService.totalConsultas().subscribe((totalConsultas: number) => {
      this.totalConsultas = totalConsultas;
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  confirmarConsulta(consulta: Consulta) {
    this.blockUI.start('Carregando...');
    this.consultaService.confirmarConsulta(consulta.codigo).subscribe((retorno: ConsultaEBO) => {
      if (retorno) {
        const retornoConsultaConfirmada = this.consultaConverter.converterParaFrontend(retorno);
        this.listaConsultaDia.filter(item => {
          if (retornoConsultaConfirmada.codigo === item.codigo) {
            item = retornoConsultaConfirmada;
            return;
          }
        });
      }
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  onKey(valor, consulta: Consulta) {
    consulta.ordemChegada = valor;
  }

  atualizarOrdemChegada(consulta: Consulta) {
    this.blockUI.start('Carregando...');
    this.consultaService.atualizarOrdemChegada(consulta.codigo, consulta.ordemChegada).subscribe(
      (retorno: ConsultaEBO) => {
      if (retorno) {
        const retornoConsultaConfirmada = this.consultaConverter.converterParaFrontend(retorno);
        this.listaConsultaDia.filter(item => {
          if (retornoConsultaConfirmada.codigo === item.codigo) {
            item = retornoConsultaConfirmada;
            return;
          }
          this.toastr.successToastr('Ordem de chegada atualizada com sucesso.', 'Sucesso!', { position: 'top-center', toastTimeout: (5000) });
        });
      }
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      if(err && err.error && err.error.mensagem) {
        this.toastr.errorToastr(err.error.mensagem, 'Erro!', { position: 'top-center', toastTimeout: (10000) });
      } else {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      }
      consulta.ordemChegada = null;
    });
  }

  iniciarAtendimento (codigoConsulta) {
    this.router.navigate(['/consultas/atendimento/' + codigoConsulta]);
  }

  habilitarCamposEdicaoOrdemChegada() {
    if (this.habilitarCamposOrdemChegada) {
      this.habilitarCamposOrdemChegada = false;
      this.habilitarBotaoSalvarOrdemChegada = false;
    } else {
      this.habilitarCamposOrdemChegada = true;
      this.habilitarBotaoSalvarOrdemChegada = true;
    }
  }

  salvarAlteracoesOrdemChegada(){
    this.blockUI.start('Carregando...');
    for (const index of this.listaConsultaDia) {
      if(index.ordemChegada) {
        this.consultaService.atualizarOrdemChegada(index.codigo, index.ordemChegada).subscribe(
          (retorno: ConsultaEBO) => {
          if (retorno) {
            const retornoConsultaConfirmada = this.consultaConverter.converterParaFrontend(retorno);
            this.listaConsultaDia.filter(item => {
              if (retornoConsultaConfirmada.codigo === item.codigo) {
                item = retornoConsultaConfirmada;
                return;
              }
              this.toastr.successToastr('Ordem de chegada do paciente ' + index.paciente.nome + ', atualizada com sucesso.',
              'Sucesso!', { position: 'top-center', toastTimeout: (5000) });
            });
          }
          this.blockUI.stop();
        }, err => {
          this.blockUI.stop();
          if(err && err.error && err.error.mensagem) {
            this.toastr.errorToastr('Não foi possível atualizar a ordem de chegada do paciente ' + index.paciente.nome,
            'Erro!', { position: 'top-center', toastTimeout: (10000) });
          }
          index.ordemChegada = null;
        });
      }
    }
    this.habilitarCamposOrdemChegada = false;
    this.habilitarBotaoSalvarOrdemChegada = false;
  }

  inicializarTableModalConsulta() {
    const table: any = $('#tabelaConsultasDia');
    //table.DataTable().destroy();
    setTimeout(() =>
      table.DataTable({
        'paging'      : false,
        'lengthChange': false,
        'searching'   : false,
        'order': [[ 5, "asc" ]],
        'info'        : false,
        'autoWidth'   : false
      }), 0
    );
  }

}
