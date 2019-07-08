import { Injectable, NgZone } from '@angular/core';
import { Usuario } from "../modelo/usuario";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any; // Varialbe que relaciona los datos de login

  constructor(
    public afs: AngularFirestore,   // Lanzar servicio de Firestore
    public afAuth: AngularFireAuth, // Lanzar servicios de Firebase auth
    public router: Router,
    public ngZone: NgZone // Servicio de NgZone para eliminar la advertencia de alcance externo
  ) {
    console.log("En el constructor de auth.services");

    /* Guardando datos de usuario en localstorage cuando
    Inicia sesión y configura nulo al cerrar sesión. */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Inicia sesión con correo electrónico / contraseña
  SignIn(email, password) {
    console.log("email:"+email);
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['main']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Registrarse con correo electrónico / contraseña
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Llame a la función SendVerificaitonMail () cuando el nuevo usuario se registre y devuelve la promesa
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verificar-email']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Correo electrónico de restablecimiento de contraseña enviado, compruebe su bandeja de entrada.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Restablecer la contraseña de si activa que no la recuerda
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.ngZone.run(() => {
          this.router.navigate(['main']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: Usuario = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      //perfil: user.perfil,
      //activo: user.activo,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['iniciar-sesion']);
    })
  }

  uidLogin(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Data del usuario: "+ user.uid);
    return user.uid;
  }

  nameLogin(){
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Data del usuario: "+ user.displayName);
    return user.displayName;
  }
}
