## Angular Bootstrap Components

!!! CONVERT TO ng-bootstrap

In the Angular 1.x space, there is Angular UI Bootstrap for having reusable components that are bootstrap based but Angular UI Bootstrap does not work with Angular 2.  Instead of we need to use a different component suite.  If you have a need for Bootstrap 3, I would recommend  [ngx-bootstrap](https://valor-software.com/ngx-bootstrap/#/).  

If you are ok going to Bootstrap 4 which at this time is still in alpha, I would use [https://ng-bootstrap.github.io/](https://ng-bootstrap.github.io/). 

The ngx-bootstrap suite offers 

* Modals
* Datepickers
* Rating
* Alerts
* Typeahead
* Progressbar
* Dropdowns
* and more

<h4 class="exercise-start">
  <b>Exercise</b>: Install ngx-bootstrap
</h4>

1. Open the integrated terminal
1. Run

  ```bash
  npm install --save ngx-bootstrap
  ```

<div class="alert alert-info" role="alert">Before you can use one of the controls for ngx-bootstrap, you will need to import the librrary and add it to the modules list in the src\app\app.module.ts file.  The documentation for each of the components at [https://valor-software.com/ngx-bootstrap/#/](https://valor-software.com/ngx-bootstrap/#/) tells you how to add it to the module.
</div>

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Using the Collapse Component
</h4>

To demonstrate how you would use one of the controls, we are going to add a collapsable section onto the page using the collapse component.

1. Open the src\app\app.module.ts file
1. Import the CollapseModule from ngx-bootstrap/collapse 

  ```TypeScript
  import { CollapseModule } from 'ngx-bootstrap/collapse';
  ```

1. To the imports array for the module, add the CollapseModule

  ```TypeScript
  CollapseModule.forRoot()
  ```  

Now we are ready to use the CollapseModule in our Todo component

1. Open the src\app\todo\todo.component.ts file  
1. Add a variable to the TodoComponent class to hold the collapse state

  ```TypeScript
  public isCollapsed: boolean = false;
  ```

1. Open the src\app\todo\todo.component.html
1. Before the `<form>` tag, add a button for toggling the collapse  

  ```html
  <button type="button" class="btn btn-primary" (click)="isCollapsed = !isCollapsed">Toggle Form</button>
  ```

1. Around the `<form></form>` we need to add a div with the collapse property.

  ```html
  <div [collapse]="isCollapsed">
  </div>
  ```

1. If you view [http://localhost:4200](http://localhost:4200) and click on the toggle button the form should hide and unhide.

<div class="exercise-end"></div>
