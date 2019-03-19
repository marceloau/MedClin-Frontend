import { AgendaMedicoConverter } from './../converter/agendamedico.converter';
import { EspecialidadeConverter } from './../../cadastro/especialidade/converter/especialidade.converter';
import { EspecialidadeService } from './../../cadastro/especialidade/service/especialidade.service';
import { Especialidade } from './../../../../model/dominio/especialidade.model';
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
import { ActivatedRoute } from '@angular/router';
import { DominioConverter } from '../../../comum/converter/dominio.converter';
import { TipoContatoService } from '../../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../../cadastro/tipoContato/converter/tipocontato.converter';
import { EstadoCivil } from '../../../../model/estadocivil.model';
import { TipoLogradouro } from '../../../../model/tipologradouro.model';
import { TipoContato } from '../../../../model/tipo-contato.model';
import { Constantes } from '../../../comum/constantes';
import { Pagina } from '../../../../model/comum/pagina.model';
import { MedicoService } from '../service/medico.service';

// Inicio Import Calendario
import { CalendarEvent, DAYS_OF_WEEK } from 'angular-calendar';
import { setHours, setMinutes, setDay } from 'date-fns';
import { AgendaMedico } from '../../../../model/agendamedico.model';
import { DatePipe } from '@angular/common';
// Fim Import Calendario

@Component({
  selector: 'app-perfilmedico',
  templateUrl: './perfilmedico.component.html',
  styleUrls: ['./perfilmedico.component.css'],
  providers: [MedicoConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter,
  AgendaMedicoConverter]
})
export class PerfilMedicoComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;

  habilitarEdicao = false;

  medico = new Medico();

  agendaMedico = new AgendaMedico();

  mensagem = new Mensagem();

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

  view = 'week';

  // Traduzir o calendário
  locale = 'pt';

  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;

  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  // Fim Calendário

  constructor(private route: ActivatedRoute, private medicoService: MedicoService, private medicoConverter: MedicoConverter,
    private dominioService: DominioService, private dominioConverter: DominioConverter,
    private excecao: Excecao, private tipoContatoService: TipoContatoService, private tipoContatoConverter: TipoContatoConverter,
    private especialidadeService: EspecialidadeService, private especialidadeConverter: EspecialidadeConverter,
    private agendaMedicoConverter: AgendaMedicoConverter) { }

  ngOnInit() {
    this.route.params.subscribe(
      res => {
        this.medico.codigo = res.codigo;
      }
    );
    this.inicializarCombos();
    this.inicializarCalendario();
  }

  inicializarCalendario() {
    this.medicoService.buscarPorCodigo(this.medico.codigo).subscribe((medico: MedicoEBO) => {
      this.medico = this.medicoConverter.converterParaFrontend(medico);
      if (this.medico.listaAgendaMedico && this.medico.listaAgendaMedico.length > 0) {
        const agenda: CalendarEvent[] = [];
        let evento: any = {};
        let horaInicio = [];
        let horaFim = [];
        for (const index of this.medico.listaAgendaMedico) {
          horaInicio = index.horaInicioAtendimento.split(':');
          horaFim = index.horaFinalAtendimento.split(':');
          evento = {
            title: (index.observacao ? index.observacao + ' - ' : '')
            + horaInicio[0] + ':' + horaInicio[1]
            + ' - ' + horaFim[0] + ':' + horaFim[1],
            start: setDay(setHours(setMinutes(new Date(), horaInicio[1]), horaInicio[0]), (index.diaSemana - 1)),
            end: setDay(setHours(setMinutes(new Date(), horaFim[1]), horaFim[0]), (index.diaSemana - 1)),
            color: this.cores.blue,
            data: index
          };
          agenda.push(evento);
          // evento.start = setDay(setHours(setMinutes(new Date(), horaInicio[1]), horaInicio[0]), (index.diaSemana - 1));
          // evento.end = setDay(setHours(setMinutes(new Date(), horaFim[1]), horaFim[0]), (index.diaSemana - 1));
          // evento.color = this.cores.blue;
        }
        this.events = agenda;
      }
    }, err => {
      this.mensagem = this.excecao.exibirExcecao(err.error);
    });
  }

  eventClicked({ event }: { event: any }): void {
    this.agendaMedico = this.agendaMedicoConverter.converterParaFrontend(event.data);
    const modal: any = $('#btnNovoHorarioAtendimento');
    modal.click();
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

    // Combo de Especialidade
    this.especialidadeService.listarRegistros(0, 100).subscribe((retorno: Pagina) => {
      this.listaComboEspecialidade = this.especialidadeConverter.converterListaParaFrontend(retorno.content);
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

  limparCamposAgendaMedico() {
    this.agendaMedico = new AgendaMedico();
  }

  fecharModalHorarioAtendimento() {
    this.limparCamposAgendaMedico();
    this.mensagem = new Mensagem();
    const modal: any = $('#fecharMosdal');
    modal.click();
  }
}
