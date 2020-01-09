// Comando para generar un servicio de Angular: ng generate service hero
// Comando para generar el servicio e inyectarlo en App.Module: ng generate service hero --module=app

// El servicio HeroService puede obtener los datos de cualquier parte – un servicio web, 
// almacenamiento local o un origen de datos simulado (mock).

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

// El decorador @Injectable() le indica a Angular que este servicio puede tener dependencias inyectadas.
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  getHeroes(): Observable<Hero[]>{
    return of(HEROES);
  }

  constructor() { }
}
