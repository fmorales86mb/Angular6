// Comando para el app-routing: ng generate module app-routing --flat --module=app

// En general, no se declaran componentes en un módulo de enrutamiento, así que 
// podemos borrar el array @NgModule.declarations y también CommonModule.

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  {path: '', redirectTo:'/dashboard', pathMatch:'full'}, //Esta ruta redirige una URL que coincide con el path vacío a la ruta del path '/dashboard'.
  {path: 'heroes', component: HeroesComponent}, //localhost:4200/heroes
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: HeroDetailComponent}, //~/detail/11
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
