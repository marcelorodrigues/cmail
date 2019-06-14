import { Routes, RouterModule } from "@angular/router";
//import { LoginComponent } from './modules/login/login.component';
import { CaixaDeEntradaComponent } from './modules/caixa-de-entrada/caixa-de-entrada.component';
//import { CadastroComponent } from './modules/cadastro/cadastro.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';

const rotas: Routes = [
    //{path: '', component: LoginComponent},
    {path: '', loadChildren: 'src/app/modules/login/login.module#LoginModule'},
    {path: 'inbox', component: CaixaDeEntradaComponent, canActivate: [AuthGuard]},
    //{path: 'cadastro', component: CadastroComponent},
    {path: 'cadastro', loadChildren: 'src/app/modules/cadastro/cadastro.module#CadastroModule'},
    {path: '**', redirectTo: 'inbox'}
]

//export const ModuloRoteamento = RouterModule.forRoot(rotas);
@NgModule({
    imports: [RouterModule.forRoot(rotas)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class ModuloRoteamento{}