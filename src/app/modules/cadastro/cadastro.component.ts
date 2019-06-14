import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  mensagensErro = []; 

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required]),
    telefone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{4}-?[0-9]{4}[0-9]?')]),
    avatar: new FormControl('', [Validators.required], this.validaImagem.bind(this)),
  })

  validaImagem(campoDoFormulario:FormControl){
    return this.httpClient
      .head(campoDoFormulario.value, {
        observe: 'response'
      })
      .pipe(
          map((response: HttpResponseBase)=>{
            return response.ok ? null : { urlInvalida : true}
          }),
          catchError((error)=>{
            return [{urlInvalida:true}]
          })
      )
  }

  /*handleCadastrarUsuario(){
    if(this.formCadastro.valid){
      console.log(this.formCadastro.value);
      this.formCadastro.reset();
    }
    else{
      console.log('Campos precisam ser preenchidos');
      this.validarTodosOsCamposDoFormulario(this.formCadastro);
    }
  }*/

  handleCadastrarUsuario(){
    if(this.formCadastro.valid){
      const userData = new User(this.formCadastro.value);

      this.httpClient
        .post('http://localhost:3200/users', userData)
        .subscribe(
          (response) => {
            console.log(`Cadastrado com sucesso`);
            this.formCadastro.reset()

            setTimeout(() => {
              this.roteador.navigate([''])
            },1000);
          }
          , (responseError : HttpErrorResponse) => {
            this.mensagensErro = responseError.error.body
            //console.log(this.mensagensErro);
          }
        )
    }
    else{
      this.validarTodosOsCamposDoFormulario(this.formCadastro);
    }
  }

  validarTodosOsCamposDoFormulario(form : FormGroup){
    form.markAllAsTouched();
    /*ou
   Object.keys(form.controls).forEach(field => {
     const control = form.get(field);
     control.markAsTouched({onlySelf:true});
   })*/
  }

  constructor(private httpClient : HttpClient
              , private roteador: Router) {}

  ngOnInit() {}

}
