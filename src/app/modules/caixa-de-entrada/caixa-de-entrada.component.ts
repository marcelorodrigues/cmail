import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PageDataService } from '../../services/page.service';
import { HeaderDataService } from '../../services/header.service';

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

  termoParaFiltro = '';

  mensagemErroLista = '';

  constructor(private emailService: EmailService, private pageDataService: PageDataService
              ,private headerService:HeaderDataService ){}

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
    this.pageDataService.defineTitulo('CMail - Caixa de entrada')
    this.headerService.valorDoFiltro.subscribe(novoValor => this.termoParaFiltro = novoValor);
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

  handleRemoveEmail(eventoVaiRemover, emailId){
    console.log('cliqcou');
    if(eventoVaiRemover.status === 'removing'){
      this.emailService
          .deletar(emailId)
          .subscribe(
            res => {
              console.log(res);
              this.emailList = this.emailList.filter(email=>email.id != emailId);
            }
            ,err => console.error(err)
          )
    }
  }

  filtrarEmailsPorAssunto(){
    const termoParaFiltroMinusculo = this.termoParaFiltro.toLowerCase();

    return this.emailList.filter( email => {
      const assunto = email.assunto.toLowerCase()
      return assunto.includes(termoParaFiltroMinusculo)
    })
  }

}
