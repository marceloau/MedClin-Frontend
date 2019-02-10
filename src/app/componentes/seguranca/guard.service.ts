import { SessionStorageService } from './session-storage.service';
import { Injectable } from "@angular/core";
import {
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router
} from "@angular/router";
import { AuthService } from "./auth.service";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: "root"
})
export class GuardService implements CanLoad, CanActivate {
  constructor(private router: Router, private authService: AuthService, private storage: SessionStorageService) {}

  jwtHelper = new JwtHelperService();

  public async canLoad(route: Route): Promise<boolean> {
    const isLogged = this.isLogged();

    if (!isLogged) this.router.navigate(["/login"]);

    return isLogged;
  }

  public async canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.isLogged()) {
      this.authService.mostrarMenuEmitter.emit(true);
      return true;
    } else {
      this.authService.mostrarMenuEmitter.emit(false);
      this.router.navigate(["/login"]);
      return false;
    }
  }

  private isLogged(): boolean {
    const usuario = this.storage.get('logged');
    let retorno = false;
    if (usuario && usuario.token && !this.jwtHelper.isTokenExpired(usuario.token)) {
      retorno = true;
    }else if (usuario && usuario.token && this.jwtHelper.isTokenExpired(usuario.token)) {
      //this.authService.isAuth();
    }
    return retorno;
  }
}
