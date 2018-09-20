import { Usuario } from './../../../model/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  /**
   * @todo implementar método de login.
   */
  login( usuario: Usuario ) {

    return this.http.post('http://localhost:9081/api/auth', usuario);
  }
}
