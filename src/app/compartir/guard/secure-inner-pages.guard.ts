import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from "../servicios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn) {
        //window.alert("Hay una cuenta abierta en este navegador por usar HCVet. Se trabajará con está cuenta. Si desea cambiar de usuario, presione {Aceptar} y cierre la sesión abierta para ingresar con otro usuario");
        this.router.navigate(['main'])
      }
      return true;
  }

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

}