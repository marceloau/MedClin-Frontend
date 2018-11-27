import { environment } from '../../../../../../environments/environment';
import { MedicamentoEBO } from '../ebo/medicamentoebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  pathBase = '/medclin/medicamento';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( medicamento: MedicamentoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, medicamento);
  }

  /**
   *
   */
  atualizar( medicamento: MedicamentoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, medicamento);
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
