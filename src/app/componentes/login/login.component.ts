import { EventEmitterService } from './../comum/util/eventemitter.service';
import { SessionStorageService } from './../seguranca/session-storage.service';
import { AuthService } from './../seguranca/auth.service';
import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { SegurancaService } from '../seguranca/seguranca.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  seguranca: SegurancaService;
  mensagem: string;

  @ViewChild('form')
  form: NgForm;

  jwtHelper: JwtHelperService = new JwtHelperService();

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor( private authService: AuthService, private router: Router, private storage: SessionStorageService,
    private eventEmitterService: EventEmitterService) {
    this.seguranca = SegurancaService.getInstancia();
  }

  ngOnInit() {
    const usuarioSession = this.storage.get('logged');

    if (usuarioSession && usuarioSession.token) {
      this.authService.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/painel']);
    } else{
      this.authService.mostrarMenuEmitter.emit(false);
    }
  }

  /**
   * Entrar no sistema.
   */
  entrar() {
    this.mensagem = '';
    this.authService.login({login: this.usuario.login, senha: this.usuario.senha}).subscribe(data => {
      const logged: any = {
        login: this.jwtHelper.decodeToken(data.headers.get('Authorization')).sub,
        nome: this.jwtHelper.decodeToken(data.headers.get('Authorization')).nome,
        email: this.jwtHelper.decodeToken(data.headers.get('Authorization')).email,
        perfis: this.jwtHelper.decodeToken(data.headers.get('Authorization')).perfis,
        token: data.headers.get('Authorization')
      };
      this.authService.startSession(logged);
      this.eventEmitterService.perfilEmmiter.emit(null);
      this.router.navigate(['/painel']);
    },
      error => {
        console.log(error);
    });
  }

  /**
   * Cancelar o login.
   */
  cancelarLogin() {
    this.mensagem = '';
    this.usuario = new Usuario();
    window.location.href = '/login';
    window.location.reload();
  }

  getFromGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }
}
