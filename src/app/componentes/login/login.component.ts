import { UsuarioService } from './../comum/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { SegurancaService } from '../seguranca/seguranca.service';
import { Router } from '@angular/router';
import { UsuarioAtual } from '../../model/usuario-atual.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();
  seguranca: SegurancaService;
  mensagem: string;

  constructor( private usuarioService: UsuarioService, private router: Router ) {
    this.seguranca = SegurancaService.getInstancia();
  }

  ngOnInit() {
  }

  /**
   * Entrar no sistema.
   */
  login() {
    this.mensagem = '';
    // this.usuarioService.login(this.usuario).subscribe(( usuarioAtenticado: UsuarioAtual) => {
    //   this.seguranca.token = usuarioAtenticado.token;
    //   this.seguranca.usuario = usuarioAtenticado.usuario;
    //   this.seguranca.usuario.perfis = this.seguranca.usuario.perfis.substring(5);
    //   this.seguranca.usuarioLogado.emit(true);
    //   this.router.navigate(['/']);
    // }, err => {
    //   this.seguranca.token = null;
    //   this.seguranca.usuario = null;
    //   this.seguranca.usuarioLogado.emit(false);
    //   this.mensagem = 'Não foi possível logar no sistema.';
    // });
    this.seguranca.usuarioLogado.emit(true);
    this.router.navigate(['/']);
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
