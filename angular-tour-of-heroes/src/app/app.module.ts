import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // El array providers le indica a Angular que tiene que crear una única y compartida 
  // instancia de HeroService e inyectarla en cualquier clase que lo solicite.
  providers: [
    HeroService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }