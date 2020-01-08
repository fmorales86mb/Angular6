/* Cada componente debe declararse en sólo un NgModule. */

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

@Component({
  // El elemento selector, 'app-heroes', es el nombre del elemento HTML que identifica este componente 
  // dentro de la plantilla del componente padre.
  selector: 'app-heroes', 
  templateUrl: './heroes.component.html', 
  styleUrls: ['./heroes.component.css'] 
})

// Exporta (export) siempre la clase del componente de modo que se pueda importar (import) desde otro punto.
export class HeroesComponent implements OnInit {

  // hero: Hero ={
  //   id : 1,
  //   name: 'Batman'
  // };

  heroes = HEROES;

  selectedHero: Hero;

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }  

  constructor() { }

  // El ngOnInit es un ‘enganche del ciclo de vida’ (lifecycle hook). 
  // Angular llama a ngOnInit justo después de crear un componente. 
  // Es un buen lugar para colocar la lógica de inicialización.
  ngOnInit() {
  }

}
