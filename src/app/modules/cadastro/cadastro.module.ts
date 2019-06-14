import { NgModule } from '@angular/core';
import { CmailFormGroupComponent } from '../../components/cmail-form-group/cmail-form-group.component';
import { CadastroComponent } from './cadastro.component';
import { CmailFormFieldDirective } from '../../components/cmail-form-group/cmail-form-field.directive';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { CmailFormModule } from '../../components/cmail-form-group/cmail-form-group.module';
import { CadastroRoutingModule } from './cadastro-routing.module';

console.log('carregou cadastro')

@NgModule({
    declarations:[
        CadastroComponent
        /*CmailFormGroupComponent,
        CmailFormFieldDirective*/
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedComponentsModule,
        CmailFormModule,
        CadastroRoutingModule
    ],
    exports: [
        CadastroComponent
    ]
})
export class CadastroModule{}