import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Paciente } from '../../../model/paciente.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  constructor() { }

  @ViewChild('form')
  form: NgForm;

  paciente = new Paciente();

  ngOnInit() {
  }

  onChange($event: any): void {
    console.log('onChange');
  }

  salvar() {
    // TODO fazer o método para salvar o paciente.
    console.log(this.paciente);
  }

  onSelectionChangeSexo(sexo: string) {
    this.paciente.sexo = sexo;
  }

  dosomething(data) {
    this.paciente.informacaoAdicional = data;
  }

}
