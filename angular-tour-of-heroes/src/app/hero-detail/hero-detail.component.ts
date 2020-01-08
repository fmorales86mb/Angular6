import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // La propiedad hero tiene que ser una propiedad de entrada (Input), anotada con el decorador @Input(), 
  // porque el componente externo HeroesComponent se vinculará a ella de este modo.
  @Input() hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
