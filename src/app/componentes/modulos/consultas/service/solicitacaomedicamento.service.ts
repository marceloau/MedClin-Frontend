import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoMedicamentoService {

  pathBase = '/medclin/solicitacao-medicamento';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   * Listagem total dos registros.
   */
  listarRegistros(pagina: number, total: number) {
    const endereco = this.enderecoBase + this.pathBase + '/' + pagina + '/' + total;
    return this.http.get(endereco);
  }

  /**
   * Busca realizada pelo código do paciente.
   */
  listarRegistrosCodigoPaciente(pagina: number, total: number, codigoPaciente: number) {
    const endereco = this.enderecoBase + this.pathBase + '/' + pagina + '/' + total + '/' + codigoPaciente;
    return this.http.get(endereco);
  }
}
