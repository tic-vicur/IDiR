import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { AuthService } from '../../../compartir/servicios/auth.service';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.scss']
})
export class MenuGeneralComponent {

  constructor(
    public authService: AuthService,
    public router: Router
    ) {}

  irAbout(){
    this.router.navigate(['/about']);
  }

  irNuevoPaciente(){
    this.router.navigate(['/nuevopaciente']);
  }

  irListaPacientes(){
    this.router.navigate(['/listapaciente']);
  }

}
