import { environment } from './../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  // path base do estado civil.
  pathBase = '/medclin/';

  enderecoBase = environment.enderecoBase;

  constructor(private http: HttpClient) { }

  /**
   *
   */
  listarDominio(dominio: string): any {
    const endereco = this.enderecoBase + this.pathBase + dominio;
    return this.http.get(endereco);
  }

}
