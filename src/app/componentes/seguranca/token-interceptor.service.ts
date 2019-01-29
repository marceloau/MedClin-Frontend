import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const usuarioLogado = this.authService.user();

    if (usuarioLogado && usuarioLogado.token) {
      request = request.clone({
        setHeaders: {
            Authorization: usuarioLogado.token
        }
      });
    } else {
      this.router.navigate(['/login']);
    }

    return next.handle(request);
  }
}
