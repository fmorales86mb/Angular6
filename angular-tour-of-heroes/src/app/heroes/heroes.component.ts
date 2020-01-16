/* Cada componente debe declararse en sólo un NgModule. */

import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

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

  heroes: Hero[];

  // selectedHero: Hero;

  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  // }  

  // Aunque podrías llamar a getHeroes() en el constructor, eso no es una buena práctica.
  // Reserva el constructor para inicializaciones simples, como asignar los parámetros del constructor a la propiedades. 
  // El constructor no debería hacer nada.
  getHeroes(): void{
    // La nueva versión espera que un Observable emita un array de héroes – lo cual puede suceder ahora o dentro de varios 
    // minutos. Entonces, suscribe para el array emitido a la retrollamada, la cual establece la propiedad heroes del 
    // componente. Este enfoque asíncrono funcionará cuando HeroService solicite héroes al servidor.
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  // Cuando el nombre no está vacío, el manejador crea un objeto Hero a partir del nombre (tan sólo le falta el id) y se 
  // lo pasa al método addHero() del servicio. Cuando addHero guarda con éxito, la retrollamada subscribe recibe el 
  // nuevo héroe y lo inserta en la lista de heroes a mostrar.
  add(name:string):void{
    name = name.trim();
    if(!name) return;

    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

    // El parámetro define simultáneamente una propiedad privada heroService y lo identifica como una inyección HeroService.
  // Cuando Angular crea un HeroComponent, el sistema de Inyección de Dependencias establece el parámetro heroService 
  // como la instancia única (singleton) de HeroService.
  constructor(private heroService : HeroService) { }

  // El ngOnInit es un ‘enganche del ciclo de vida’ (lifecycle hook). 
  // Angular llama a ngOnInit justo después de crear un componente. 
  // Es un buen lugar para colocar la lógica de inicialización.
  ngOnInit() {
    this.getHeroes();
  }
  
}
