## Locking Down Routes

### Overview

Right now in order to use our Todo list, we have to manually go to the login page first.  This is a terrible user experience.  Luckily, Angular has the ability to do checks before allowing a user into a route by implementing a guard on a route.  

Guards allow you to authentication or authorization check before allowing a user to perform an action.  Common usage cases are: 

* Role checks such as admin before allowing the user into the admin section of the application
* Is the user logged in check before allowing them into the page the pulls or updates data 
* Is the user logged out before allowing them to create an account

In this chapter we are going to implement a check for if the user is logged in before allowing them to view the home page and interact with the Todo list.

### Goals

* Understand how to protect a route
* Understand how to use a guard

### Code from Previous Chapter

<div class="alert alert-danger" role="alert">Skip this section if you completed the previous chapter</div>

If you have not completed the previous chapter you can get the completed code by downloading the code from Github.

<h4 class="exercise-start">
    <b>Exercise</b>: Downloading Code 
</h4>

1. Downloading and extracting the zip file into your projects folder (c:\projects or ~/projects) at [https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-reactvive-forms.zip](https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-reactive-forms.zip) 
1. After you get the code, run npm install to get all of the NPM dependencies.

    ```bash
    npm install
    ```

1. Open Visual Studio Code
1. In Visual Studio Code, go under the File menu, select Open folder and navigate to the folder that you unzipped the files into
1. If you have ng serve running in a different editor, make sure to stop it from running.
1. Open the Integrated Terminal in Visual Studio Code (ctrl + `)  and run ng serve

    ```bash
    ng serve
    ```

<div class="exercise-end"></div>

### Create Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Check If User Is Logged In
</h4>

1. Open terminal and generate the guard 

  ```bash
  ng generate guard shared/guards/IsLoggedIn --module App
  ```

  ![generate output](images/isloggedin-generate.png)

<div class="exercise-end"></div>

### Add Logic to Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Check If User Is Authenticated
</h4>

We need to make a call to the API to check if the user is logged into the API or not.  Since the login happens in the API, we need to check there and not just verify that we have the user info in the UI.

1. Open the src\app\shared\services\auth.service.ts file

  ```bash
  auth.service.ts
  ```

1. Add an isAuthenticated function to the AuthService that checks the API to make sure that the user is still logged in

  ```TypeScript
  isAuthenticated(): Observable<boolean> {
    return this.http.get("https://dj-sails-todo.azurewebsites.net/user/identity", this.options)
      .map((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error);
        }

        return Observable.of(false);
      });
  }
  ```

Next we need to add logic to the guard's canActivate function to call the AuthService.isAuthenticated function 

1. Open src\app\shared\guards\is-logged-in.guard.ts 

  ```bash
  is-logged-in.guard.ts
  ```

1. Import the AuthService

  ```TypeScript
  import { AuthService } from '../services/auth.service';
  ```

1. We are going to redirect our user to the home page if they are logged.  In order to do this we need to add the Router to the @angular/route import statement like so

  ```TypeScript
  import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router} from '@angular/router';
  ```

1. Before we can use the AuthService and router we need to create a constructor and inject them into it 
    
  ```TypeScript
  constructor(private authService: AuthService, private router: Router) { }
  ```

1. In the canActivate function we need to replace the return true with the following logic that will call the AuthService.isAuthenticated function and  return if the user is logged in or not.  If the user is not logged in or there is an error validating if they are logged in then we will navigate them to the login route else we will let them into the route

  ```TypeScript
    let isLoggedIn = new Observable<boolean>(observer => {
    this.authService.isAuthenticated()
      .subscribe((res: boolean) => {
      if (res) {
        observer.next(true);
        observer.complete();
      } else {
        this.router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      }
      }, error => {
        this.router.navigate(['/login']);
        observer.next(false);
        observer.complete();
      });
    });

    return isLoggedIn;
  ```

<div class="exercise-end"></div>


### Add Guard to Route

In order to use the Guard we need to add it to the route.  Each route has a canActivate attribute that takes an array of guards as the 3rd parameter.

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Route
</h4>

1. Open the app-routing.module.ts file

  ```bash
  app-routing.module.ts
  ```

1. Import the IsLoggedInGuard

  ```TypeScript
  import { IsLoggedInGuard} from './shared/guards/is-logged-in.guard'
  ```

1. To the default route, add the canActivate attribute with the value being an array that contains the IsLoggedInGuard

  ```TypeScript
  , 
  canActivate: [IsLoggedInGuard]
  ```  

1. You route should look like

  ```TypeScript
  {
    path: '',
    children: [],
    component: TodoComponent,
    canActivate: [IsLoggedInGuard]
  },
  ```

1. When you try to go to http://localhost:4200 if you are not already logged in it will redirect you to the login page.  

<div class="exercise-end"></div>

 
