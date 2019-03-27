import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GerenciadorArquivosImpressaoS3Service {

  enderecoBase = environment.enderecoS3Impressao;

  constructor(private http: HttpClient) {
   }

  /**
   * Imprimir solicitações de medicamento.
   */
  baixarImpressao(nomeArquivo: string) {
    const endereco = this.enderecoBase + nomeArquivo;
    return window.open(endereco, '_blank');
  }
}
