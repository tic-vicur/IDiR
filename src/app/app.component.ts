import { Component, NgZone } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../app/compartir/servicios/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'IDiR-v3';
  description = 'Sistema de gestión para la evidencia de investigación Uniremington';
  logoMarca = 'assets/marca/bee30b.png';
  nombreMarca = 'CRUD Angular+Firebase';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    public authService: AuthService,
    public ngZone: NgZone,
    private breakpointObserver: BreakpointObserver) {
      console.log("En el constructor de app.components.ts " + this.isHandset$.source);
    }

}
