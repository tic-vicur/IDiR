import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//seguridad
import { AuthGuard } from '../app/compartir/guard/auth.guard';
import { SecureInnerPagesGuard } from '../app/compartir/guard/secure-inner-pages.guard';

//Ingreso
import { HomeComponent } from '../app/componentes/general/home/home.component'
import { LoginComponent } from '../app/componentes/ingreso/login/login.component';

const routes: Routes = [
  //ingreso
  { path: '', redirectTo: '/iniciar-sesion', pathMatch: 'full'},
  { path: 'iniciar-sesion', component: LoginComponent, canActivate: [SecureInnerPagesGuard]},
  
  //home
  { path: 'main', component: HomeComponent },
  //{ path: 'main', component: HomeComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
