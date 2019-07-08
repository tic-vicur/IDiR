import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Servicios de firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';

//Angular Material
import { MatInputModule,
          MatButtonModule,
          MatSelectModule,
          MatIconModule,
          MatGridListModule,
          MatCardModule,
          MatMenuModule,
          MatToolbarModule,
          MatSidenavModule,
          MatListModule,
          MatRadioModule,
          MatNativeDateModule,
          MatExpansionModule,
          MatDatepickerModule,
          MatTableModule,
          MatPaginatorModule,
          MatSortModule,
          MatDividerModule,
          } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuGeneralComponent } from './componentes/menu/menu-general/menu-general.component';
import { MenuAdmonComponent } from './componentes/menu/menu-admon/menu-admon.component';
import { LoginComponent } from './componentes/ingreso/login/login.component';
import { HomeComponent } from './componentes/general/home/home.component';
import { AuthService } from './compartir/servicios/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    MenuGeneralComponent,
    MenuAdmonComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //Material
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,

    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    { provide: FirestoreSettingsToken, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
