import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
// automatically added by angular cli create component
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // <-- NgModel lives here


/*
 Angular needs to know how the pieces of your application fit together and what other files and libraries the app requires. This information is called metadata

 Some of the metadata is in the @Component decorators that you added to your component classes. Other critical metadata is in @NgModule decorators.

 The most important @NgModuledecorator annotates the top-level AppModule class.

 The Angular CLI generated an AppModule class in src/app/app.module.ts when it created the project. This is where you opt-in to the FormsModule.
 */
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent // Every component must be declared in exactly one NgModule.
  ],
  imports: [
    BrowserModule,
    FormsModule // Then add FormsModule to the @NgModule metadata's imports array, which contains a list of external modules that the app needs.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
