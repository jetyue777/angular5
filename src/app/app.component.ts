
//You always import the Component symbol from the Angular core library and annotate the component class with @Component.

import { Component } from '@angular/core';

//@Component is a decorator function that specifies the Angular metadata for the component.
//The CLI generated three metadata properties:
/*
   selector— the component's CSS element selector
   templateUrl— the location of the component's template file.
   styleUrls— the location of the component's private CSS styles.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Always export the component class so you can import it elsewhere ... like in the AppModule.
export class AppComponent {
  title = 'Tour of Heroes';
}
