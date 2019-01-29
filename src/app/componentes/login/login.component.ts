import { SessionStorageService } from './../seguranca/session-storage.service';
import { AuthService } from './../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { SegurancaService } from '../seguranca/seguranca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  seguranca: SegurancaService;
  mensagem: string;

  constructor( private authService: AuthService, private router: Router, private storage: SessionStorageService) {
    this.seguranca = SegurancaService.getInstancia();
  }

  ngOnInit() {
    const usuarioSession = this.storage.get('logged');

    if (usuarioSession && usuarioSession.token) {
      this.authService.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else{
      this.authService.mostrarMenuEmitter.emit(false);
    }
  }

  /**
   * Entrar no sistema.
   */
  login() {
    this.mensagem = '';
    this.authService.login({email: this.usuario.email, senha: this.usuario.senha});
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
