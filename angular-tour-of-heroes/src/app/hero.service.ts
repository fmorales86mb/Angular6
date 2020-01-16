// Comando para generar un servicio de Angular: ng generate service hero
// Comando para generar el servicio e inyectarlo en App.Module: ng generate service hero --module=app

// El servicio HeroService puede obtener los datos de cualquier parte – un servicio web, 
// almacenamiento local o un origen de datos simulado (mock).

// Otras APIs pueden ‘enterrar’ los datos necesarios dentro de un objeto. Es posible que tengamos que ‘cavar’ en esos datos procesando el Observable de respuesta con el operador map de RxJS.
// Para capturar el error, haremos «pipe» sobre el observable resultante de http.get(), mediante el operador de RxJS catchError().

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { MessageService } from './message.service';

// El decorador @Injectable() le indica a Angular que este servicio puede tener dependencias inyectadas.
@Injectable({
  providedIn: 'root'
})

export class HeroService {

  private heroesUrl: string = 'api/heroes';

  // La API web de héroes espera una cabecera HTTP concreta en las peticiones de guardado.
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getHeroes(): Observable<Hero[]>{
    //this.messageService.add('Hero Service: funca');
    //return of(HEROES);
    // El operador catchError() intercepta un Observable que haya fallado. Le pasa el error a un manejador de errores que puede hacer lo que considere con el error.
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      ); // Todos los métodos HttpClient devuelven un Observable de RxJS de algo.
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any>{
    // La URL no ha cambiado. La API web de héroes conoce cual es el héroe a actualizar observando el id del héroe
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // espera a que el servidor genere un id para el nuevo héroe, el cual devuelve en Observable<Hero> al invocador.
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((hero:Hero) => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<Hero>('add hero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<any>{
    const id = typeof hero === 'number'? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ =>this.log(`delete id ${id}`)),
      catchError(this.handleError<Hero>('delteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()) return of([]); // El método devuelve inmediatamente un array vacío si no hay un término a buscar.
    
    // La URL incluye una cadena de consulta con el termino a buscar.
    return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
	
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getHero(id: number): Observable<Hero>{
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero=> hero.id === id));
  // } 

  private log(message: string):void{
    this.messageService.add('HeroService: ' + message);
  }

  // Este es un típico escenario ‘servicio-en-servicio’ : inyectamos MessageService en HeroService el cual está 
  // inyectado en HeroesComponent.
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
}
