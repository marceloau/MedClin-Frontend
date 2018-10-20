import { ConsultaEBO } from './ebo/consultaebo';
import { ConsultaConverter } from './converter/consulta.converter';
import { ConsultaService } from './service/consulta.service';
import { StatusConsulta } from './statusconsulta.enum';
import { Consulta } from './../../../model/consulta.model';
import { AgendaMedicoConverter } from './../medicos/converter/agendamedico.converter';
import { EspecialidadeConverter } from './../cadastro/especialidade/converter/especialidade.converter';
import { EspecialidadeService } from './../cadastro/especialidade/service/especialidade.service';
import { Especialidade } from './../../../model/dominio/especialidade.model';
import { MedicoEBO } from './../medicos/ebo/medicoebo';
import { Medico } from './../../../model/medico.model';
import { MedicoConverter } from './../medicos/converter/medico.converter';
import { NgForm } from '@angular/forms';
import { Estado } from './../../../model/estado.model';
import { Mensagem } from './../../../model/mensagem';
import { TipoPlanoSaudeConverter } from './../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraConverter } from './../cadastro/operadora/converter/operadora.converter';
import { Excecao } from './../../comum/excecao/excecao';
import { DominioService } from './../../comum/services/dominio.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { TipoContatoService } from '../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../cadastro/tipoContato/converter/tipocontato.converter';
import { EstadoCivil } from '../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../model/tipologradouro.model';
import { TipoContato } from '../../../model/tipo-contato.model';
import { Constantes } from '../../comum/constantes';
import { Pagina } from '../../../model/comum/pagina.model';
import { MedicoService } from '../medicos/service/medico.service';

// Inicio Import Calendario
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { setHours, setMinutes, setDay } from 'date-fns';
import { AgendaMedico } from '../../../model/agendamedico.model';
// Fim Import Calendario

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter,
  AgendaMedicoConverter]
})
export class ConsultaComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  pagina: Pagina;

  habilitarEdicao = false;

  medico = new Medico();

  agendaMedico = new AgendaMedico();

  mensagem = new Mensagem();

  consulta = new Consulta();

  listaConsulta = new Array<Consulta>();

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
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao) { }

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
    const objetoAtualizado: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    this.medicoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Médico atualizado com sucesso.';
      this.habilitarEdicao = false;
      this.medico = this.medicoConverter.converterParaFrontend(objetoSalvo);
      this.inicializarCalendario();
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  salvarAgendaMedico() {
    this.medico.listaAgendaMedico.push(this.agendaMedico);
    const objetoAtualizado: MedicoEBO = this.medicoConverter.converterParaBackend(this.medico);
    this.medicoService.atualizar(objetoAtualizado).subscribe(( objetoSalvo: MedicoEBO) => {
      this.mensagem.codigoTipo = 0;
      this.mensagem.titulo = 'Sucesso';
      this.mensagem.texto = 'Agenda do médico atualizada com sucesso.';
      this.habilitarEdicao = false;
      this.limparCamposAgendaMedico();
      const modal: any = $('#fecharModal');
      modal.click();
      this.medico = this.medicoConverter.converterParaFrontend(objetoSalvo);
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
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

  limparCamposAgendaMedico() {
    this.agendaMedico = new AgendaMedico();
  }

  fecharModalHorarioAtendimento() {
    this.limparCamposAgendaMedico();
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
