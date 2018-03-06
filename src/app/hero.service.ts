import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';

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

  constructor(private messageService: MessageService) {
    /*
     Modify the constructor with a parameter that declares a private messageService property. Angular will inject the singleton MessageService into that property when it creates the HeroService.

     This is a typical "service-in-service" scenario: you inject the MessageService into the HeroService which is injected into the HeroesComponent.
     */
  }

  // of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  getHeroes(): Observable<Hero[]> {

    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    // Todo: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
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
