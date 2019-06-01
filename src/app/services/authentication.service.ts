import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth
        .signInWithEmailAndPassword(email, password);
  }

  loginWithFacebook() {
    console.log('Login with Facebook');
    return this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  toRegisterWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.
      createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.angularFireAuth.authState;
  }

  logOut() {
    return this.angularFireAuth.auth.signOut();
  }
}
