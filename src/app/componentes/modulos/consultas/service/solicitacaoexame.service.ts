import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoExameService {

  pathBase = '/medclin/solicitacao-exame';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  // salvar( solicitacaoExame: SolicitacaoExameEBO ) {
  //   const endereco = this.enderecoBase + this.pathBase;
  //   return this.http.post(endereco, solicitacaoExame);
  // }

  /**
   *
   */
  // atualizar( solicitacaoExame: SolicitacaoExameEBO ) {
  //   const endereco = this.enderecoBase + this.pathBase;
  //   return this.http.put(endereco, solicitacaoExame);
  // }

  /**
   *
   */
  // buscar( pagina: number, total: number, nome: string , dataConsulta: string, mesConsulta: string, codigoPaciente: number) {
  //   let endereco = this.enderecoBase + this.pathBase + '/buscarConsulta' + '/' + pagina + '/' + total + '?';

  //   if (nome) {
  //     endereco = endereco + '&nomePaciente=' + nome;
  //   }

  //   if (dataConsulta) {
  //     endereco = endereco + '&dataConsulta=' + dataConsulta;
  //   }

  //   if (mesConsulta) {
  //     endereco = endereco + '&mesConsulta=' + mesConsulta;
  //   }

  //   if (codigoPaciente) {
  //     endereco = endereco + '&codigoPaciente=' + codigoPaciente;
  //   }

  //   return this.http.get(endereco);
  // }

  /**
   *
   */
  // buscarPorCodigo( codigo: number ) {
  //   const endereco = this.enderecoBase + this.pathBase + '/' + codigo;
  //   return this.http.get(endereco);
  // }

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
