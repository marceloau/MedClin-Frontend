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
