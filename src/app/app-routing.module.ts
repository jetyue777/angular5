import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';




/*
 An Angular best practice is to load and configure the router in a separate, top-level module that is dedicated to routing and imported by the root AppModule.

 By convention, the module class name is AppRoutingModule and it belongs in the app-routing.module.ts in the src/app folder.

 ng generate module app-routing --flat --module=app
 --flat puts the file in src/app instead of its own folder.
 --module=app tells the CLI to register it in the imports array of the AppModule.


 You'll configure the router with Routes in the RouterModule so import those two symbols from the @angular/router library.
 */


/*
 Routes tell the router which view to display when a user clicks a link or pastes a URL into the browser address bar.

 A typical Angular Route has two properties:

 path: a string that matches the URL in the browser address bar.
 component: the component that the router should create when navigating to this route.
 You intend to navigate to the HeroesComponent when the URL is something like localhost:4200/heroes.

 Import the HeroesComponent so you can reference it in a Route. Then define an array of routes with a single route to that component.
 */
const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  //To make the app navigate to the dashboard automatically, add the following route to the AppRoutingModule.Routes array.
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  /*
   You first must initialize the router and start it listening for browser location changes.

   Add RouterModule to the @NgModule.imports array and configure it with the routes in one step by calling RouterModule.forRoot() within the imports array, like this:
   */
  imports: [
    /*
     The method is called forRoot() because you configure the router at the application's root level. The forRoot() method supplies the service providers and directives needed for routing, and performs the initial navigation based on the current browser URL.
     */
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ] //Add an @NgModule.exports array with RouterModule in it. Exporting RouterModule makes router directives available for use in the AppModule components that will need them.

  //export in this module so root module can import
})


export class AppRoutingModule { }
