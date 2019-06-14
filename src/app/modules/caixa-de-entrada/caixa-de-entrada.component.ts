import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'cmail-caixa-de-entrada',
  templateUrl: './caixa-de-entrada.component.html',
  styles: [`
    ul,li{
      margin:0;
      padding:0;
      list-style-type: none;
    }
  `]
})
export class CaixaDeEntradaComponent {

  private _isNewEmailFormOpen = false;

  emailList = [];
  email = {
    destinatario: '',
    assunto: '',
    conteudo: ''
  }

  mensagemErroLista = '';

  constructor(private emailService: EmailService){}

  ngOnInit(){
    this.emailService.listar()
                      .subscribe(
                        lista => {
                          this.emailList = lista;
                        }
                        , (responseError: HttpErrorResponse) => {
                          console.dir(responseError)
                          this.mensagemErroLista = responseError.error
                        }
                      )
  }
  

  get isNewEmailFormOpen() {
    return this._isNewEmailFormOpen;
  }

  toggleNewEmailForm() {
    this._isNewEmailFormOpen = !this.isNewEmailFormOpen
  }

  handleNewEmail(formEmail: NgForm) {

    if (formEmail.invalid) return;

    this.emailService
      .enviar(this.email)
      .subscribe(
        emailApi => {
          this.emailList.push(emailApi)
          this.email = {destinatario:'',assunto:'',conteudo:''}
          formEmail.reset();
        }
        ,erro => console.error(erro)
      )
  }

}
