import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';

const rotaLogin : Routes = [
    {path:'', component: LoginComponent}
]

@NgModule({
    imports:[
        RouterModule.forChild(rotaLogin)
    ],
    exports:[
        RouterModule
    ]
})
export class LoginRoutingModule {}