import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // La propiedad hero tiene que ser una propiedad de entrada (Input), anotada con el decorador @Input(), 
  // porque el componente externo HeroesComponent se vinculará a ella de este modo.
  @Input() hero: Hero;

  getHero():void{
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save():void{
    // this.heroService.updateHero(this.hero)
    //   .subscribe(()=> this.goBack()); // esto hace que vuelva atrás. Ver el subscribe
  }

  constructor(
    private activatedRoute: ActivatedRoute, // Guarda información acerca de la ruta a esta instancia
    private location: Location, //  Es un servicio de Angular para interactuar con el navegador
    private heroService: HeroService
  ) { }

  ngOnInit() {
    this.getHero();
  }

}
