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

  delete(hero:Hero): void{
    // Aunque el componente delega el borrado del héroe en HeroService, sigue siendo responsable de actualizar su propio 
    // listado de héroes. El método delete() del componente borra inmediatamente el héroe a borrar de la lista, anticipando 
    // que HeroService.
    this.heroes = this.heroes.filter(h => h !== hero);
    // En realidad, no hay nada que el componente deba hacer con el Observable devuelto por heroService.delete(). 
    // Debe suscribirse de todas maneras.
    // Si dejáramos de usar susbscribe(), el servicio no enviaría la petición de borrado al servidor. 
    // Como norma general, un Observable no hace nada hasta que alguien se suscribe. 
    // Comprueba esto por ti mismo eliminando temporalmente subscribe(), haciendo clic en «Dashboard» (Cuadro de Mandos) y 
    // después haciendo clic en «Heroes». Verás la lista de héroes completa de nuevo.
    this.heroService.deleteHero(hero).subscribe();
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
