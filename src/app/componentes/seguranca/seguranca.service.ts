import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SegurancaService {

  public static instancia: SegurancaService = null;
  usuario: Usuario;
  token: string;
  usuarioLogado = new EventEmitter<boolean>();

  /**
   * Construtor padrão.
   */
  constructor() {
    return SegurancaService.instancia = SegurancaService.instancia || this;
  }

  /**
   * Inicia instancia da classe.
   */
  public static getInstancia() {
    if (this.instancia == null) {
      this.instancia = new SegurancaService();
    }
    return this.instancia;
  }

  /**
   * Verifica se usuário está logado no sistema.
   */
  isLogado() {
    let isLogado: boolean;
    if (this.usuario == null)  {
      isLogado = false;
    } else {
      isLogado = true;
    }
    return isLogado;
  }

}
