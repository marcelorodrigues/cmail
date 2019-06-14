import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensagemErro = '';

  login = {
    email: '',
    password: ''
  }

  //constructor( private httpClient: HttpClient) {}
  constructor( private loginService: LoginService, private roteador: Router) {}

  ngOnInit() {
  }

  handleLogin(formLogin : NgForm){
    if(formLogin.valid){
      this.loginService
        .logar(this.login)
        .subscribe(
          () => this.roteador.navigate(['/inbox'])
          , (responseError: HttpErrorResponse) => this.mensagemErro = responseError.error
        )

      /*console.log(this.login)
      this.httpClient
        .post('http://localhost:3200/login', this.login)
        .subscribe(
          (response:any) => {
            localStorage.setItem('TOKEN', response.token);
          },
          (responseError: HttpErrorResponse) => {
            this.mensagemErro = responseError.error;
          }
        )*/

    }
  }

}
