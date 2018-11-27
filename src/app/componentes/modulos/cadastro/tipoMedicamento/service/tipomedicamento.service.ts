import { environment } from '../../../../../../environments/environment';
import { TipoMedicamentoEBO } from '../ebo/tipomedicamentoebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TipoMedicamentoService {

  pathBase = '/medclin/tipo-medicamento';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( tipoMedicamento: TipoMedicamentoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, tipoMedicamento);
  }

  /**
   *
   */
  atualizar( tipoMedicamento: TipoMedicamentoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, tipoMedicamento);
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
