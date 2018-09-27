import { Mensagem } from './../../../model/mensagem';
import { PacienteEBO } from './../pacientes/ebo/pacienteebo';
import { TipoPlanoSaudeConverter } from './../cadastro/tipoPlanoSaude/converter/tipoplanosaude.converter';
import { OperadoraService } from './../cadastro/operadora/service/operadora.service';
import { OperadoraConverter } from './../cadastro/operadora/converter/operadora.converter';
import { Excecao } from './../../comum/excecao/excecao';
import { DominioService } from './../../comum/services/dominio.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Paciente } from '../../../model/paciente.model';
import { PacienteService } from '../pacientes/service/paciente.service';
import { PacienteConverter } from '../pacientes/converter/paciente.converter';
import { DominioConverter } from '../../comum/converter/dominio.converter';
import { TipoContatoService } from '../cadastro/tipoContato/service/tipocontato.service';
import { TipoContatoConverter } from '../cadastro/tipoContato/converter/tipocontato.converter';
import { TipoPlanoSaudeService } from '../cadastro/tipoPlanoSaude/service/tipoplanosaude.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [PacienteConverter, DominioConverter, Excecao, TipoContatoConverter, OperadoraConverter, TipoPlanoSaudeConverter]
})
export class PerfilComponent implements OnInit {

  // @ViewChild('form')
  // form: NgForm;

  habilitarEdicao = false;

  paciente = new Paciente();

  mensagem = new Mensagem();

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
    this.habilitarEdicao = true;
  }
}
