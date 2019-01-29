import { environment } from './../../../../environments/environment.prod';
import { Usuario } from './../../../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  enderecoBase = environment.enderecoBase;

  /**
   * @todo implementar método de login.
   */
  login( usuario: Usuario ) {

    return this.http.post(this.enderecoBase + '/login', usuario);
  }
}
