import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PageDataService{
    titulo = new Subject<string>();

    defineTitulo(novoTitulo: string){
        document.querySelector('title').textContent = novoTitulo;
        this.titulo.next(novoTitulo);
    }
}