import { Pagina } from './../../../model/comum/pagina.model';
import { PacienteService } from './../pacientes/service/paciente.service';
import { PacienteConverter } from './../pacientes/converter/paciente.converter';
import { ConsultaEBO } from './ebo/consultaebo';
import { ConsultaConverter } from './converter/consulta.converter';
import { ConsultaService } from './service/consulta.service';
import { StatusConsulta } from './statusconsulta.enum';
import { Consulta } from './../../../model/consulta.model';
import { Especialidade } from './../../../model/dominio/especialidade.model';
import { Medico } from './../../../model/medico.model';
import { MedicoConverter } from './../medicos/converter/medico.converter';
import { NgForm } from '@angular/forms';
import { Estado } from './../../../model/estado.model';
import { Mensagem } from './../../../model/mensagem';
import { Excecao } from './../../comum/excecao/excecao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContato } from '../../../model/tipo-contato.model';
import { MedicoService } from '../medicos/service/medico.service';

// Inicio Import Calendario
import { CalendarEvent, DAYS_OF_WEEK, CalendarEventAction,
  CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { AgendaMedico } from '../../../model/agendamedico.model';
import { Paciente } from '../../../model/paciente.model';
// Fim Import Calendario

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, PacienteConverter, MedicoConverter]
})
export class ConsultaComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  // Decorator wires up blockUI instance
  @BlockUI() blockUI: NgBlockUI;

  pagina: Pagina;

  paginaMedico: Pagina;

  paginaPaciente: Pagina;

  paginaConsulta: Pagina;

  habilitarEdicao = false;

  medico = new Medico();

  agendaMedico = new AgendaMedico();

  mensagem = new Mensagem();

  consulta = new Consulta();

  listaConsulta = new Array<Consulta>();

  listaConsultaCalendario = new Array<Consulta>();

  listaPacienteModal = new Array<Paciente>();

  listaMedicoModal = new Array<Medico>();

  StatusConsulta: typeof StatusConsulta = StatusConsulta;

  // Inicio lista de atributos dos compbos de medico
  listaComboEstadoCivil = new Array<EstadoCivil>();
  listaComboEstado = new Array<Estado>();
  listaComboTipoLogradouro = new Array<TipoLogradouro>();
  listaComboTipoContato = new Array<TipoContato>();
  listaComboEspecialidade = new Array<Especialidade>();
  // Fim lista de atributos dos compbos de medico


  // Inicio Calendário
  cores: any = {
    vermelho: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    azul: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    amarelo: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    },
    verde: {
      primary: '#37c45f',
      secondary: '#94e3ac'
    },
    azulMarinho: {
      primary: '#191d8c',
      secondary: '#4c51d4'
    },
    preto: {
      primary: '#0e0f0e',
      secondary: '#0e0f0e'
    },
    cinza: {
      primary: '#59595c',
      secondary: '#59595c'
    }
  };

  view = 'month';

  // Traduzir o calendário
  locale = 'pt';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-edit" alt="Atualizar Consulta" title="Atualizar Consulta"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Atualizar', event);
      }
    }
  ];

  activeDayIsOpen = false;
  // Fim Calendário

  constructor(private route: ActivatedRoute, private consultaService: ConsultaService, private consultaConverter: ConsultaConverter,
    private excecao: Excecao, private pacienteConverter: PacienteConverter, private pacienteService: PacienteService,
    private medicoConverter: MedicoConverter, private medicoService: MedicoService) { }

  ngOnInit() {
    this.blockUI.start('Carregando...');
    this.inicializarCalendario();
    this.consultaService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
      this.inicializarTable();
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: any): void {
    this.abrirModalAtualizar(event.data.codigo);
  }

  inicializarTable() {
    const table: any = $('#tabelaConsulta');
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
          'zeroRecords': 'Nenhuma consulta encontrada',
          'infoEmpty': 'Nenhum consulta encontrada'
        },
      }), 0
    );
  }

  inicializarTableModalConsulta() {
    const table: any = $('#tabelaModalConsultaPaciente');
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
          'zeroRecords': 'Nenhum paciente encontrado(a)',
          'infoEmpty': 'Nenhum paciente encontrado(a)'
        },
      }), 0
    );
  }

  inicializarTableModalConsultaMedico() {
    const table: any = $('#tabelaModalConsultaMedico');
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
          'zeroRecords': 'Nenhum médico(a) encontrado(a)',
          'infoEmpty': 'Nenhum médico(a) encontrado(a)'
        },
      }), 0
    );
  }

  inicializarCalendario() {
    this.consultaService.buscar(0, 100, null, null, this.viewDate.toString(), null, null).subscribe((consultaEBO: Pagina) => {
      this.listaConsultaCalendario = this.consultaConverter.converterListaParaFrontend(consultaEBO.content);
      if (consultaEBO && consultaEBO.content && consultaEBO.content.length > 0) {
        const consultas: CalendarEvent[] = [];
        let evento: any = {};
        for (const index of this.listaConsultaCalendario) {
          evento = {
            title: index.paciente.nome + ' - ' + new Date(index.dataConsulta).getHours() + ':'
            + (new Date(index.dataConsulta).getMinutes() === 0 ? '00hrs' : new Date(index.dataConsulta).getMinutes()) + ' - '
            + StatusConsulta[index.codigoStatusConsulta] + (index.flagPrimeiraConsulta === 'S' ? ' - Primeira Consulta' : ''),
            start : new Date(index.dataConsulta),
            end : new Date(index.dataConsulta),
            color: StatusConsulta[index.codigoStatusConsulta] === 'Confirmado' ? this.cores.azul
            : (StatusConsulta[index.codigoStatusConsulta] === 'Aberto' ? this.cores.amarelo
            : (StatusConsulta[index.codigoStatusConsulta] === 'Cancelada' ? this.cores.vermelho
            : (StatusConsulta[index.codigoStatusConsulta] === 'Finalizada' ? this.cores.verde
            : (StatusConsulta[index.codigoStatusConsulta] === 'Aguardando Atendimento' ? this.cores.azulMarinho
            : (StatusConsulta[index.codigoStatusConsulta] === 'Em Atendimento' ? this.cores.preto : this.cores.cinza))))),
            actions: this.actions,
            data: index
          };
          consultas.push(evento);
        }
        this.events = consultas;
      }
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  atualizarCalendarioEventos() {
    this.blockUI.start('Carregando...');
    this.consultaService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.blockUI.stop();
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
      if (retorno && retorno.content && retorno.content.length > 0) {
        const consultas: CalendarEvent[] = [];
        let evento: any = {};
        for (const index of this.listaConsulta) {
          evento = {
            title: index.paciente.nome + ' - ' + new Date(index.dataConsulta).getHours() + ':'
            + (new Date(index.dataConsulta).getMinutes() === 0 ? '00hrs' : new Date(index.dataConsulta).getMinutes()) + ' - '
            + StatusConsulta[index.codigoStatusConsulta] + (index.flagPrimeiraConsulta === 'S' ? ' - Primeira Consulta' : ''),
            start : new Date(index.dataConsulta),
            end : new Date(index.dataConsulta),
            color: StatusConsulta[index.codigoStatusConsulta] === 'Confirmado' ? this.cores.azul
            : (StatusConsulta[index.codigoStatusConsulta] === 'Aberto' ? this.cores.amarelo
            : (StatusConsulta[index.codigoStatusConsulta] === 'Cancelada' ? this.cores.vermelho
            : (StatusConsulta[index.codigoStatusConsulta] === 'Finalizada' ? this.cores.verde
            : (StatusConsulta[index.codigoStatusConsulta] === 'Aguardando Atendimento' ? this.cores.azulMarinho
            : (StatusConsulta[index.codigoStatusConsulta] === 'Em Atendimento' ? this.cores.preto : this.cores.cinza))))),
            actions: this.actions,
            data: index
          };
          consultas.push(evento);
        }
        this.events = consultas;
      }
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  listarRegistros(pagina, total) {
    this.blockUI.start('Carregando...');
    this.consultaService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    if ((this.activeDayIsOpen === true) || this.events.length === 0) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }
  }

  eventClicked({ event }: { event: any }): void {
    if ((this.activeDayIsOpen === true) || this.events.length === 0) {
      this.activeDayIsOpen = false;
    } else {
      this.activeDayIsOpen = true;
    }
  }

  buscarPorCodigo(codigo: number) {
    this.blockUI.start('Carregando...');
    this.consultaService.buscarPorCodigo(codigo).subscribe((consulta: ConsultaEBO) => {
      this.blockUI.stop();
      this.consulta = this.consultaConverter.converterParaFrontend(consulta);
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  salvar() {
    this.blockUI.start('Carregando...');
    const objetoAtualizado: ConsultaEBO = this.consultaConverter.converterParaBackend(this.consulta);
    if (objetoAtualizado.codigoConsulta) {
      this.consultaService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
        this.blockUI.stop();
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Consulta atualizada com sucesso.';
        this.atualizarCalendarioEventos();
        this.limparCamposConsulta();
        const modal: any = $('#fecharModal');
        modal.click();
        this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
      }, err => {
        this.blockUI.stop();
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.consultaService.salvar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
        this.blockUI.stop();
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Consulta marcada com sucesso.';
        this.atualizarCalendarioEventos();
        this.limparCamposConsulta();
        const modal: any = $('#fecharModal');
        modal.click();
        this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
      }, err => {
        this.blockUI.stop();
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }
  }

  buscar() {
    this.blockUI.start('Carregando...');
    this.consultaService.buscar(0, 10, this.consulta.paciente.nome, null, null, null, null).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
      this.blockUI.stop();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPacienteConsulta() {
    this.blockUI.start('Carregando...');
    this.pacienteService.buscar(0, 10, this.consulta.paciente.nome, null, null, null, null, null, null).subscribe((retorno: Pagina) => {
      this.blockUI.stop();
      this.paginaPaciente = retorno;
      if (retorno) {
        this.listaPacienteModal = this.pacienteConverter.converterListaParaFrontend(retorno.content);
      } else {
        this.listaPacienteModal = [];
      }
      this.inicializarTableModalConsulta();
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarMedicoConsulta() {
    this.blockUI.start('Carregando...');
    if (this.consulta.medico.nome) {
      this.medicoService.buscar(0, 10, this.consulta.medico.nome).subscribe((retorno: Pagina) => {
        this.blockUI.stop();
        this.paginaMedico = retorno;
        if (retorno) {
          this.listaMedicoModal = this.medicoConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaMedicoModal = [];
        }
        this.inicializarTableModalConsultaMedico();
      }, err => {
        this.blockUI.stop();
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.medicoService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
        this.blockUI.stop();
        this.paginaMedico = retorno;
        if (retorno) {
          this.listaMedicoModal = this.medicoConverter.converterListaParaFrontend(retorno.content);
        } else {
          this.listaMedicoModal = [];
        }
        this.inicializarTableModalConsultaMedico();
      }, err => {
        this.blockUI.stop();
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }
  }

  abrirModalAtualizar(codigo: number) {
    this.mensagem = new Mensagem();
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoAgendamento');
    modal.click();
  }

  selecionarPacienteModalConsulta(paciente: Paciente) {
    this.consulta.paciente = paciente;
    const modal: any = $('#fecharModalConsultaPaciente');
    modal.click();
  }

  selecionarMedicoModalConsulta(medico: Medico) {
    this.consulta.medico = medico;
    const modal: any = $('#fecharModalConsultaMedico');
    modal.click();
  }

  limparCamposConsulta() {
    this.consulta = new Consulta();
  }

  fecharModalAgendamento() {
    this.limparCamposConsulta();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharMosdal');
    modal.click();
  }

  changePage(event) {
    if (this.consulta.paciente.nome) {
      this.buscarPorNomePaginacao(event.page, event.size, this.consulta.paciente.nome);
    } else {
      this.listarRegistros(event.page, event.size);
    }
  }

  buscarPorNomePaginacao(pagina: number, total: number, nome: string) {
    this.blockUI.start('Carregando...');
    this.consultaService.buscar(pagina, total, nome, null, null, null, null).subscribe((retorno: Pagina) => {
      this.blockUI.stop();
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
    }, err => {
      this.blockUI.stop();
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
