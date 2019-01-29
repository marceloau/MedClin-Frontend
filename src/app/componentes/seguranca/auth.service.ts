import { environment } from './../../../environments/environment.prod';
import { Injectable, EventEmitter } from '@angular/core';
import { SessionStorageService } from "./session-storage.service";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  mostrarMenuEmitter = new EventEmitter<boolean>();

  enderecoBase = environment.enderecoBase;

  constructor(
    private storage: SessionStorageService,
    private http: HttpClient,
    private router: Router
  ) {}
  public isAuth(){
    return this.http.post(this.enderecoBase + '/seguranca/atualizar_token', {
      observe: 'response',
      responseType: 'text'
    }).subscribe(data => {
      // const logged: any = {
      //   email: this.jwtHelper.decodeToken(data.headers.get('Authorization')).sub,
      //   token: data.headers.get('Authorization')
      // };
      // this.startSession(logged);
    },
      error => {
        console.log(error);
    });
  }

  public user() {
    return this.storage.get("logged");
  }

  public login(params: { email: string; senha: string }) {
    const param = {
      email: params.email,
      senha: params.senha
    };
    return this.http.post(this.enderecoBase + '/login',
      param,
      {
        observe: 'response',
        responseType: 'text'
      }).subscribe(data => {
        const logged: any = {
          email: this.jwtHelper.decodeToken(data.headers.get('Authorization')).sub,
          token: data.headers.get('Authorization')
        };
        this.startSession(logged);
        this.mostrarMenuEmitter.emit(true);
        this.router.navigate(['/']);
      },
        error => {
          console.log(error);
      });
  }

  public logout() {
    this.storage.set("logged", null);
    this.router.navigate(['/login']);
    this.mostrarMenuEmitter.emit(false);
  }

  private startSession(data: any) {
    this.storage.set("logged", data);
  }
}
