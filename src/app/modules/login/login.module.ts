import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { CmailFormModule } from '../../components/cmail-form-group/cmail-form-group.module';
import { LoginService } from '../../services/login.services';

console.log('carregou login')

@NgModule({
    declarations:[
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        CmailFormModule
    ],
    exports: [
        LoginComponent
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}