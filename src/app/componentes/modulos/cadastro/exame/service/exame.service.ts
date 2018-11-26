import { environment } from '../../../../../../environments/environment';
import { ExameEBO } from '../ebo/exameebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExameService {

  pathBase = '/medclin/exame';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( exame: ExameEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, exame);
  }

  /**
   *
   */
  atualizar( exame: ExameEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, exame);
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
