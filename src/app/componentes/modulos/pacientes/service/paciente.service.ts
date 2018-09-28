import { PacienteEBO } from '../ebo/pacienteebo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pathBase = '/medclin/paciente';
  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) {
   }

  /**
   *
   */
  salvar( paciente: PacienteEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.post(endereco, paciente);
  }

  /**
   *
   */
  atualizar( paciente: PacienteEBO ) {
    const endereco = this.enderecoBase + this.pathBase;
    return this.http.put(endereco, paciente);
  }

  /**
   *
   */
  buscar( pagina: number, total: number, nome: string, nomeMae: string, numeroRg: string,
    numeroCpf: string, numeroCartaoSUS: string, codigoTipoPlano: string, textoContato: string ) {
    const endereco = this.enderecoBase + this.pathBase + '/buscarPaciente/' + pagina + '/' + total;
    let params: any;
    params = {};
    if (nome) {
      params.nomePaciente = nome;
    }
    if (nomeMae) {
      params.nomeMae = nomeMae;
    }
    if (numeroRg) {
      params.numeroRg = numeroRg;
    }
    if (numeroCpf) {
      params.numeroCpf = numeroCpf;
    }
    if (numeroCartaoSUS) {
      params.numeroCartaoSUS = numeroCartaoSUS;
    }
    if (codigoTipoPlano) {
      params.codigoTipoPlano = codigoTipoPlano;
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
