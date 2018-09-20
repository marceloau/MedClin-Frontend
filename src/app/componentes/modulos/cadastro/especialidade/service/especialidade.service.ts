import { Pagina } from './../../../../../model/comum/pagina.model';
import { environment } from './../../../../../../environments/environment';
import { EspecialidadeEBO } from './../ebo/especialidadeebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {

  pathBase = '/medclin/especialidade';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( especialidade: EspecialidadeEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, especialidade);
  }

  /**
   *
   */
  atualizar( especialidade: EspecialidadeEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, especialidade);
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
