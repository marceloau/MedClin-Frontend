import { environment } from '../../../../../../environments/environment';
import { TipoContatoEBO } from '../ebo/tipocontatoebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoContatoService {

  pathBase = '/medclin/tipo-contato';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( tipoContato: TipoContatoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, tipoContato);
  }

  /**
   *
   */
  atualizar( tipoContato: TipoContatoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, tipoContato);
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
