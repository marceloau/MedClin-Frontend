import { ConsultaEBO } from './../ebo/consultaebo';
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  pathBase = '/medclin/consulta';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( consulta: ConsultaEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, consulta);
  }

  /**
   *
   */
  atualizar( consulta: ConsultaEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, consulta);
  }

  /**
   *
   */
  buscar( pagina: number, total: number, nome: string , dataConsulta: string, mesConsulta: string, codigoPaciente: number, codigoStatusConsulta: number) {
    let endereco = this.enderecoBase + this.pathBase + '/buscarConsulta' + '/' + pagina + '/' + total + '?';

    if (nome) {
      endereco = endereco + '&nomePaciente=' + nome;
    }

    if (dataConsulta) {
      endereco = endereco + '&dataConsulta=' + dataConsulta;
    }

    if (mesConsulta) {
      endereco = endereco + '&mesConsulta=' + mesConsulta;
    }

    if (codigoPaciente) {
      endereco = endereco + '&codigoPaciente=' + codigoPaciente;
    }

    if (codigoStatusConsulta) {
      endereco = endereco + '&codigoStatusConsulta=' + codigoStatusConsulta;
    }

    return this.http.get(endereco);
  }

  /**
   *
   */
  listarConsultasAtendimento( pagina: number, total: number, dataConsulta: string) {
    let endereco = this.enderecoBase + this.pathBase + '/listarConsultasAtendimento' + '/' + pagina + '/' + total + '?' + '&dataConsulta=' + dataConsulta;
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
  confirmarConsulta( codigo: number ) {
    const endereco = this.enderecoBase + this.pathBase + '/confirmar/' + codigo;
    return this.http.get(endereco);
  }

  /**
   *
   */
  atualizarOrdemChegada(codigoConsulta, numeroOrdemChegada) {
    const endereco = this.enderecoBase + this.pathBase + '/ordem-chegada/' + codigoConsulta + '/' + numeroOrdemChegada;
    return this.http.get(endereco);
  }

  /**
   *
   */
  listarRegistros(pagina: number, total: number) {
    const endereco = this.enderecoBase + this.pathBase + '/' + pagina + '/' + total;
    return this.http.get(endereco);
  }

  /**
   *
   */
  totalConsultas() {
    const endereco = this.enderecoBase + this.pathBase + '/total-consultas';
    return this.http.get(endereco);
  }
}
