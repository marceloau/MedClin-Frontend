import { environment } from '../../../../../../environments/environment';
import { TipoPlanoSaudeEBO } from '../ebo/tipoplanosaude';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoPlanoSaudeService {

  pathBase = '/medclin/tipo-plano-saude';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( tipoPlanoSaude: TipoPlanoSaudeEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, tipoPlanoSaude);
  }

  /**
   *
   */
  atualizar( tipoPlanoSaude: TipoPlanoSaudeEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, tipoPlanoSaude);
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
