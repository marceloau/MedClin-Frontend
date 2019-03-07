import { EventEmitterService } from './../util/eventemitter.service';
import { SessionStorageService } from './../../seguranca/session-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  usuarioSession = this.storage.get('logged');
  PRF_ADMIN = false;
  PRF_RECEP = false;
  PRF_MEDICO = false;

  constructor(private storage: SessionStorageService) {
    EventEmitterService.get('perfis').subscribe(data => {this.validarExibicao()});
  }


  ngOnInit() {
    this.usuarioSession = this.storage.get('logged');
  }

  validarExibicao() {
    if(this.usuarioSession.perfis) {
      for (const obj of this.usuarioSession.perfis) {
        if(obj === 'PRF_ADMIN') {
          this.PRF_ADMIN = true;
        } else if (obj === 'PRF_RECEP') {
          this.PRF_RECEP = true;
        } else if (obj === 'PRF_MEDICO') {
          this.PRF_MEDICO = true;
        }
      }
    }
  }

}
