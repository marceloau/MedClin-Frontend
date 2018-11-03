import { PacienteEBO } from './../pacientes/ebo/pacienteebo';
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
import { DominioService } from './../../comum/services/dominio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContato } from '../../../model/tipo-contato.model';
import { Pagina } from '../../../model/comum/pagina.model';
import { MedicoService } from '../medicos/service/medico.service';

// Inicio Import Calendario
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { setHours, setMinutes, setDay } from 'date-fns';
import { AgendaMedico } from '../../../model/agendamedico.model';
import { Paciente } from '../../../model/paciente.model';
// Fim Import Calendario

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, PacienteConverter, MedicoConverter]
})
export class ConsultaComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  pagina: Pagina;

  paginaMedico: Pagina;

  paginaPaciente: Pagina;

  habilitarEdicao = false;

  medico = new Medico();

  agendaMedico = new AgendaMedico();

  mensagem = new Mensagem();

  consulta = new Consulta();

  listaConsulta = new Array<Consulta>();

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
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  view = 'month';

  // Traduzir o calendário
  locale = 'pt';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  // Fim Calendário

  constructor(private route: ActivatedRoute, private consultaService: ConsultaService, private consultaConverter: ConsultaConverter,
    private excecao: Excecao, private pacienteConverter: PacienteConverter, private pacienteService: PacienteService,
    private medicoConverter: MedicoConverter, private medicoService: MedicoService) { }

  ngOnInit() {
    this.inicializarCalendario();
    this.consultaService.listarRegistros(0, 10).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
      this.inicializarTable();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
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
        'autoWidth'   : false
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
        'autoWidth'   : false
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
        'autoWidth'   : false
      }), 0
    );
  }

  inicializarCalendario() {
    // this.medicoService.buscarPorCodigo(this.medico.codigo).subscribe((medico: MedicoEBO) => {
    //   this.medico = this.medicoConverter.converterParaFrontend(medico);
    //   if (this.medico.listaAgendaMedico && this.medico.listaAgendaMedico.length > 0) {
    //     const agenda: CalendarEvent[] = [];
    //     let evento: any = {};
    //     let horaInicio = [];
    //     let horaFim = [];
    //     for (const index of this.medico.listaAgendaMedico) {
    //       horaInicio = index.horaInicioAtendimento.split(':');
    //       horaFim = index.horaFinalAtendimento.split(':');
    //       evento = {
    //         title: index.horaInicioAtendimento + ' - ' + index.horaFinalAtendimento,
    //         start: setDay(setHours(setMinutes(new Date(), horaInicio[1]), horaInicio[0]), (index.diaSemana - 1)),
    //         end: setDay(setHours(setMinutes(new Date(), horaFim[1]), horaFim[0]), (index.diaSemana - 1)),
    //         color: this.cores.blue,
    //         data: index
    //       };
    //       agenda.push(evento);
    //       // evento.start = setDay(setHours(setMinutes(new Date(), horaInicio[1]), horaInicio[0]), (index.diaSemana - 1));
    //       // evento.end = setDay(setHours(setMinutes(new Date(), horaFim[1]), horaFim[0]), (index.diaSemana - 1));
    //       // evento.color = this.cores.blue;
    //     }
    //     this.events = agenda;
    //   }
    // }, err => {
    //   this.mensagem = this.excecao.exibirExcecao(err.error);
    // });
  }

  listarRegistros(pagina, total) {
    this.consultaService.listarRegistros(pagina, total).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  eventClicked({ event }: { event: any }): void {
    this.consulta = this.consultaConverter.converterParaFrontend(event.data);
    const modal: any = $('#btnNovoHorarioAtendimento');
    modal.click();
  }

  buscarPorCodigo(codigo: number) {
    this.consultaService.buscarPorCodigo(codigo).subscribe((consulta: ConsultaEBO) => {
      this.consulta = this.consultaConverter.converterParaFrontend(consulta);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  atualizar() {
    // const objetoAtualizado: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    // this.medicoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicoEBO) => {
    //   this.mensagem.codigoTipo = 0;
    //   this.mensagem.titulo = 'Sucesso';
    //   this.mensagem.texto = 'Médico atualizado com sucesso.';
    //   this.habilitarEdicao = false;
    //   this.medico = this.medicoConverter.converterParaFrontend(objetoSalvo);
    //   this.inicializarCalendario();
    // }, err => {
    //   this.mensagem = this.excecao.exibirExcecao(err.error);
    // });
  }

  salvar() {
    const objetoAtualizado: ConsultaEBO = this.consultaConverter.converterParaBackend(this.consulta);
    if (objetoAtualizado.codigoConsulta) {
      this.consultaService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Consulta atualizada com sucesso.';
        this.limparCamposConsulta();
        const modal: any = $('#fecharModal');
        modal.click();
        this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    } else {
      this.consultaService.salvar(objetoAtualizado).subscribe(( objetoSalvo: ConsultaEBO) => {
        this.mensagem.codigoTipo = 0;
        this.mensagem.titulo = 'Sucesso';
        this.mensagem.texto = 'Consulta marcada com sucesso.';
        this.limparCamposConsulta();
        const modal: any = $('#fecharModal');
        modal.click();
        this.consulta = this.consultaConverter.converterParaFrontend(objetoSalvo);
      }, err => {
        this.mensagem = this.excecao.exibirExcecao(err.error);
      });
    }
  }

  buscar() {
    this.consultaService.buscarPorNome(0, 10, this.consulta.paciente.nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarPacienteConsulta() {
    this.pacienteService.buscar(0, 10, this.consulta.paciente.nome, null, null, null, null, null, null).subscribe((retorno: Pagina) => {
      this.paginaPaciente = retorno;
      if (retorno) {
        this.listaPacienteModal = this.pacienteConverter.converterListaParaFrontend(retorno.content);
      } else {
        this.listaPacienteModal = [];
      }
      this.inicializarTableModalConsulta();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  buscarMedicoConsulta() {
    this.medicoService.buscar(0, 10, this.consulta.medico.nome).subscribe((retorno: Pagina) => {
      this.paginaMedico = retorno;
      if (retorno) {
        this.listaMedicoModal = this.medicoConverter.converterListaParaFrontend(retorno.content);
      } else {
        this.listaMedicoModal = [];
      }
      this.inicializarTableModalConsultaMedico();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  abrirModalAtualizar(codigo: number) {
    this.habilitarEdicao = true;
    this.buscarPorCodigo(codigo);
    const modal: any = $('#btnNovoHorarioAtendimento');
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
    this.consultaService.buscarPorNome(pagina, total, nome).subscribe((retorno: Pagina) => {
      this.pagina = retorno;
      if (retorno) {
        this.listaConsulta = this.consultaConverter.converterListaParaFrontend(retorno.content);
      }
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }
}
