## Implementing Default Route

### Overview


We have not yet implemented a catch all route which will be the route that is used when Angular does not match any other configured routes.  .

![no route found](images/ng2/no-route-found.png)


There are 2 ways to fix this.  

1. Make the TodoComponent the default so that it will redirect the user to that page.  This is not as nice of a user experience since it does not alert the user that the url they were trying to go to does not exist.
1. Create a "Not Found" component and redirect the user to that component if none of the other routes match.  This is the preferred method.


### Goals

### Add Default Route

<h4 class="exercise-start">
    <b>Exercise</b>: Adding Default Route 
</h4>

<div class="alert alert-danger" role="alert">
**Note:** Not the preferred method.  
</div>

1. Open the app.routing.ts file
1. Add an additional route to the Routes list with a ** for the path and set the component to TodoComponent.  This will tell Angular to use the TodoComponent when it can not determine the route

    ```TypeScript
    , { path: '**', component: TodoComponent }
    ```

    <div class="alert alert-warning">
    Make sure that you make the default route the last route.  Any routes below the ** route will be ignored.
    </div>

<div class="exercise-end"></div>

### Create Not Found Component

<h4 class="exercise-start">
    <b>Exercise</b>: Redirecting User to "Not Found" component
</h4>

<div class="alert alert-success" role="alert">
**Note:** This is the preferred method.  
</div>

From a user experience perspective, it is a much experience to redirect the user to a "not found" page instead of redirecting them back to the home page.  Create the route not found page is just like we did with the todo component.    

1. Run the Angular Cli generate command to create the notFound component

    ```bash
    ng generate component notFound
    ```

1. 4 files are created just like when we created the TodoComponent earlier.  You will notice this time though that the Angular Cli put a dash between not and found.  It will automatically do that when it encounters an uppercase character.

    ![not found generated file list](images/ng2/notfound-generated.png)

1. In the src\app\app-routing.module.ts file, add an import statement for the NotFoundComponent 

    ```TypeScript
    import { NotFoundComponent } from './not-found/not-found.component';
    ```

1. In the app-routing.module.ts file, change the ** route to use the NotFoundComponent

    ```TypeScript
    , { path: '**', component: NotFoundComponent }
    ```

1. If you now try to navigate to [http://localhost:4200/unknown](http://localhost:4200/unknown) you will be shown the NotFoundComponent 

    ![Not Found View](images/view-route-unknown.png)
    