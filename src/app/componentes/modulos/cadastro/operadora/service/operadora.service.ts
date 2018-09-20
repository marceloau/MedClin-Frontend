import { environment } from '../../../../../../environments/environment';
import { OperadoraEBO } from '../ebo/operadoraebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperadoraService {

  pathBase = '/medclin/operadora';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( operadora: OperadoraEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, operadora);
  }

  /**
   *
   */
  atualizar( operadora: OperadoraEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, operadora);
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
  buscarPorCodigoOficial( codigo: number ) {
    const endereco = this.enderecoBase + this.pathBase + '/codigoOficial=' + codigo;
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
