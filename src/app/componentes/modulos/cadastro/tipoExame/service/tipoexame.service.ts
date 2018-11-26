import { environment } from '../../../../../../environments/environment';
import { TipoExameEBO } from '../ebo/tipoexameebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoExameService {

  pathBase = '/medclin/tipo-exame';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( tipoExame: TipoExameEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, tipoExame);
  }

  /**
   *
   */
  atualizar( tipoExame: TipoExameEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, tipoExame);
  }

  /**
   *
   */
  buscarPorNome( pagina: number, total: number, nome: string ) {
    const endereco = this.enderecoBase + this.pathBase + '/' + pagina + '/' + total + '/' + nome;
    return this.http.get(endereco);
  }

  /**
   *
   */
  buscarPorCodigo( codigo: number ) {
    const endereco = this.enderecoBase + this.pathBase + '/' + codigo;
    return this.http.get(endereco);
  }

  /**
   *
   */
  listarRegistros(pagina: number, total: number) {
    const endereco = this.enderecoBase + this.pathBase + '/' + pagina + '/' + total;
    return this.http.get(endereco);
  }
}
