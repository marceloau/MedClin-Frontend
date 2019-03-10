import { Utils } from './../util/utils';
import { EventEmitterService } from './../util/eventemitter.service';
import { SessionStorageService } from './../../seguranca/session-storage.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioSession = this.storage.get('logged');
  existePerfilAdmin = false;
  existePerfilRecep = false;
  existePerfilMedico = false;
  nomeUsuario: String = '';

  constructor(private storage: SessionStorageService, private utils: Utils,
    private cdRef: ChangeDetectorRef, private eventEmitterService: EventEmitterService) {
    this.eventEmitterService.perfilEmmiter.subscribe(data => {this.validarExibicao()});
  }


  ngOnInit() {
    this.usuarioSession = this.storage.get('logged');
    if (this.usuarioSession && this.usuarioSession.nome) {
      this.nomeUsuario = this.utils.retornarNomeUsuarioResumido(this.usuarioSession.nome);
    }
    this.validarExibicao();
  }

  ngAfterViewChecked() {
    // check if it change, tell CD update view
    if (this.existePerfilAdmin || this.existePerfilRecep || this.existePerfilMedico) {
      this.validarExibicao()
      this.cdRef.detectChanges();
    }
  }

  validarExibicao() {
    this.usuarioSession = this.storage.get('logged');
    this.existePerfilAdmin = false;
    this.existePerfilRecep = false;
    this.existePerfilMedico = false;
    if (this.usuarioSession && this.usuarioSession.perfis) {
      for (const obj of this.usuarioSession.perfis) {
        if(obj === 'PRF_ADMIN') {
          this.existePerfilAdmin = true;
        } else if (obj === 'PRF_RECEP') {
          this.existePerfilRecep = true;
        } else if (obj === 'PRF_MEDICO') {
          this.existePerfilMedico = true;
        }
      }
    }
  }

}
