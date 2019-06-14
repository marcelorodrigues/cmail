import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate{
    
    canActivate(): boolean {
        if(localStorage.getItem('TOKEN')){
            return true;
        }
        else{
            this.roteador.navigate([''])
            return false;
        }
    }

    constructor(private roteador: Router){}
}