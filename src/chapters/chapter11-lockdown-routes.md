## Locking Down Routes

### Overview

A very common requirement with applications is to do authentication or authorization check before allowing a user to perform action.  Common usage cases are: 

* Role checks such as admin before allowing the user into the admin section of the application
* Is the user logged in check before allowing them into the page the pulls or updates data 
* Is the user logged out before allowing them to create an account

In this chapter we are going to implement a check for if the user is logged in.

### Goals

* Understand how to protect a route
* Understand how to use a guard

### Create Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Check If User Is Logged In
</h4>

1. Open terminal and generate the guard 

  ```bash
  ng generate guard shared/guards/IsLoggedIn
  ```

  ![generate output](images/isloggedin-generate.png)

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Module
</h4>

Before you can use the guard, you need to add it to the providers list in the module

1. Open the app.module.ts 
1. Import the AdminGuard

  ```TypeScript
 import { IsLoggedInGuard } from './shared/guards/is-logged-in.guard';
  ```

1. Add the AdminGuard to the providers list

  ```TypeScript
 providers: [AuthService, TodoService, IsLoggedInGuard],
  ```

<div class="exercise-end"></div>

### Add Logic to Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Add Logic
</h4>

We need to do add logic in the AuthService to verify that the currentUser variable has a value.  

1. Open the src\app\shared\services\auth.service.ts file
1. Add an isAuthenticated function to the AuthService that checks the API to make sure that the user is still logged in

  ```TypeScript
  isAuthenticated(): Observable<boolean> {
    return this.http.get(this.url + '/identity', this.options)
      .map((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch((error: Response) => {
        if (error.status !== 403) {
          console.log('isAuthenticated error', error)
          this.clearUser();
        }

        return Observable.of(false);
      });
  }
  ```

Next we need to add logic to the guard's canActivate function to call the AuthService.isAuthenticated function 

1. Open src\app\shared\guards\is-logged-in.guard.ts 
1. Import the AuthService

  ```TypeScript
  import { AuthService } from '../services/auth.service';
  ```

1. Import the Router as part of the @angular/route import statement


1. create a constructor and inject the AuthService and Router 
    
  ```TypeScript
  constructor(private authService: AuthService, private router: Router) { }
  ```

1. In the canActivate function we want to add the following logic instead of just returning true.  This code will call the AuthService.isAuthenticated function and then return true or false depending on if the user is logged in or not.  If the user is not logged in or there is an error validating if they are logged in then we will navigate them to the login route

  ```TypeScript
  canActivate(  next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
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
        observer.next(false);
        observer.complete();
      });
    });

    return isLoggedIn;
  }
  ```

<div class="exercise-end"></div>


### Add Guard to Route

In order to use the Guard we need to add it to the route.  Each route has a canActivate attribute that takes an array of guards as the 3rd parameter.

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Route
</h4>

1. Open the app-routing.module.ts file
1. Import the IsLoggedInGuard

  ```TypeScript
  import { IsLoggedInGuard} from './shared/guards/is-logged-in.guard'
  ```

1. To the default route, add the canActivate attribute with the value being an array that contains the IsLoggedInGuard

  ```TypeScript
  , canActivate: [IsLoggedInGuard]
  ```  

1. Now stop ng serve and restart it.  When you try to go to http://localhost:4200 it will redirect you to the login page since you are not logged in yet.  

<div class="exercise-end"></div>

 
