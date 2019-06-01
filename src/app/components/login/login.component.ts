import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginData } from '../../models/login-data';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  data: LoginData = {
    email: '',
    password: '',
  };
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
              ) { }

  ngOnInit() {
  }

  login() {
    console.log('Login command');
    this.authenticationService.loginWithEmail(this.data.email, this.data.password).then(
      (data) => {
        console.log(data.operationType);
      }
    ).catch(
      (error) => {
        alert('Login error');
        console.log(error);
      }
    );
  }

  loginWithFacebook() {
    console.log('Autenticación con Facebook');
    this.authenticationService.loginWithFacebook().then((data) => {
      console.log(data.operationType);
      console.log(data);
    });
  }

  onRegisterClick() {
    this.authenticationService.toRegisterWithEmail(this.data.email, this.data.password).then(
      (data) => {
        const user = {
          uid: data.user.uid,
          email: this.data.email
        };
        this.userService.createUser(user).then((registerData) => {
          console.log(registerData);
        }).catch((registerError) => {
          console.log(registerError);
        });
        console.log(data);
      }
    ).catch(
      (error) => {
        alert('Registry error');
        console.log(error);
      }
    );
  }
}
