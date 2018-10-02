import { MedicoEBO } from './../ebo/medicoebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  pathBase = '/medclin/medico';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( medico: MedicoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, medico);
  }

  /**
   *
   */
  atualizar( medico: MedicoEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, medico);
  }

  /**
   *
   */
  buscar( pagina: number, total: number, nome: string, numeroRg: string,
    numeroCpf: string, textoContato: string ) {
    const endereco = this.enderecoBase + this.pathBase + '/buscarPaciente/' + pagina + '/' + total;
    let params: any;
    params = {};
    if (nome) {
      params.nomePaciente = nome;
    }
    if (numeroRg) {
      params.numeroRg = numeroRg;
    }
    if (numeroCpf) {
      params.numeroCpf = numeroCpf;
    }
    if (textoContato) {
      params.textoContato = textoContato;
    }
    return this.http.get(endereco, {params});
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
