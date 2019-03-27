import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImpressaoService {

  pathBase = '/medclin/impressao';
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
   * Imprimir solicitações de medicamento.
   */
  imprimirSolicitacaoMedicamento(codigoConsulta: number, solExames: string) {
    const endereco = this.enderecoBase + this.pathBase + '/medicamento' + '/?listaMedicamento='
    + solExames + '&codigoConsulta=' + codigoConsulta;
    return this.http.get(endereco);
  }
}
