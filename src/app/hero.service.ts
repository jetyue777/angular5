import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';



/*
 Notice that the new service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.

 The @Injectable() decorator tells Angular that this service might itself have injected dependencies. It doesn't have dependencies now but it will soon. Whether it does or it doesn't, it's good practice to keep the decorator.
 */

/*
 The HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.

 Removing data access from components means you can change your mind about the implementation anytime, without touching any components. They don't know how the service works.
 */



@Injectable()
export class HeroService {

  constructor(private httpClient: HttpClient, private messageService: MessageService) {
    /*
     Modify the constructor with a parameter that declares a private messageService property. Angular will inject the singleton MessageService into that property when it creates the HeroService.

     This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
     */
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = 'api/heroes';  // URL to web api

  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  getHeroes(): Observable<Hero[]> {

    //All HttpClient methods return an RxJS Observable of something.
    //An Observable from HttpClient always emits a single value and then completes, never to emit again.
    //This particular HttpClient.get call returns an Observable<Hero[]>, literally "an observable of hero arrays". In practice, it will only return a single hero array.
    //HttpClient.get returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    return this.httpClient.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)), //The HeroService methods will tap into the flow of observable values and send a message (via log()) to the message area at the bottom of the page.

      //They'll do that with the RxJS tap operator, which looks at the observable values, does something with those values

      catchError(this.handleError('getHeroes', [])) //To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
      //The catchError() operator intercepts an Observable that failed. It passes the error an error handler that can do what it wants with the error.
    );
  }


  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  //The overall structure of the updateHero() method is similar to that of getHeroes(), but it uses http.put() to persist the changed hero on the server.

  /*

   The HttpClient.put() method takes three parameters

   the URL
   the data to update (the modified hero in this case)
   options

   The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions constant defined in the HeroService.



   */

  /** PUT: update the hero on the server */
  updateHero (hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    //HttpClient.post returns the body of the response as an untyped JSON object by default. Applying the optional type specifier, <Hero> , gives you a typed result object.
    return this.httpClient.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(
        (resHero: Hero) => this.log(`added hero with id=${resHero.id}`)
      ),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  ////you can accept multiple specific types by separating them with a |
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Hero>(url, this.httpOptions).pipe(
      tap(
        //_ is a convention used when you don't care about the parameter.
        _ => this.log(`deleted hero id=${id}`)
      ),
      catchError(this.handleError<Hero>('deleteHero'))
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


  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.httpClient.get<Hero[]>(`api/heroes/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}

/*
 You must provide the HeroService in the dependency injection system before Angular can inject it into the HeroesComponent, as you will do below.

 There are several ways to provide the HeroService: in the HeroesComponent, in the AppComponent, in the AppModule. Each option has pros and cons.
 */

/*
 In real app, The HeroService must wait for the server to respond, getHeroes() cannot return immediately with hero data, and the browser will not block while the service waits.

 HeroService.getHeroes() must have an asynchronous signature of some kind.

 It can take a callback. It could return a Promise. It could return an Observable.

 In this tutorial, HeroService.getHeroes() will return an Observable in part because it will eventually use the Angular HttpClient.get method to fetch the heroes and HttpClient.get() returns an Observable.

 Observable is one of the key classes in the RxJS library.




 */
