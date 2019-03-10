import { Utils } from './../util/utils';
import { SessionStorageService } from './../../seguranca/session-storage.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioSession = this.storage.get('logged');
  nomeUsuario: String = '';

  constructor(private authService: AuthService, private router: Router, private storage: SessionStorageService,
    private utils: Utils) { }

  ngOnInit() {
    this.usuarioSession = this.storage.get('logged');
    if (this.usuarioSession && this.usuarioSession.nome) {
      this.nomeUsuario = this.utils.retornarNomeUsuarioResumido(this.usuarioSession.nome);
    }
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
