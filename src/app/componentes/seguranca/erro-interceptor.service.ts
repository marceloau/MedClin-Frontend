import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
        .pipe(
          catchError(err => {
            let retorno = null;
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload(true);
            } else {
              if (err.error instanceof ErrorEvent) {
                // client-side error
                retorno = `Error: ${err.error.message}`;
              } else {
                // server-side error
                retorno = {
                  error: {
                    codigo: err.status,
                    mensagem: err.error.msg,
                    data: err.error.timeStamp,
                    erros: err.error.erros
                  }
                };
                // `Error Code: ${err.status}\nMessage: ${err.message}`;
              }
            }
            return throwError(retorno);
          })
        )
    }
}
