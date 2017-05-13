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


  
<div class="exercise-end"></div>
 
### Create Create Account Component

Up to this point, we have only been able to login to an existing account.  Now we are going to quickly create the signup page.  It is a template based form, just like the login form that was completed in a previous chapter.

1. Open src\app\shared\services\auth.service.ts
1. Add RequestOptions to the @angular/http import
1. 
1. Add the following method to allow an account to be created

  ```TypeScript
  signup(email: string, password: string) {
    let loginInfo = { "email": email, "password": password };
    return this.http.post(this.url, loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          let currentUser: User = <User>res.json();
          this.setUser(new User(currentUser.email, currentUser.id));
        }
      })
      .catch(error => {
        console.log('signup error', error)
        return Observable.of(false);
      });
  }
  ```

  <div class="alert alert-info" role="alert">REMINDER: Since we have to pass the password to the API in order to create the account and we are communicating over a non-secure channel, make sure you do not use your real passwords.  With the non-secure connection anyone can easily capture your email and password combo for the todo API.  In production, you would want use an SSL certificate.  As well for development, typically you would have the API locally but since this is an Angular workshop and not an API workshop, a remote API was provided for you.</div>


1. Open terminal and run

  ```TypeScript
  ng generate component signup
  ```

1. Open the app-routing.module.ts file
1. Add a new route to get to the signup page

  ```TypeScript
  { path: 'signup', component: SignupComponent},
  ```

1. Open the src\app\signup\signup.html file
1. Replace the contents with the following UI and template based form to allow a user to create an account

  ```html
  <h1>Sign Up</h1>
  <hr>
  <div>
    <form #signupForm="ngForm" (ngSubmit)="signup(signupForm.value)" autocomplete="off" novalidate>
      <div class="form-group" >
        <label for="userName">Email:</label>
        <em *ngIf="email?.invalid && (email?.touched  || mouseoverLogin)">Required</em>
        
        <input #email="ngModel"  (ngModel)="email" name="email" id="email" required email id="email" type="text" class="form-control" placeholder="Email..." />
        <div *ngIf="email.invalid && (email.dirty || email.touched)"
              class="alert alert-danger">
              <div [hidden]="!email.errors.required">
                Email is required
              </div>
          </div>
      
      </div>
      <div class="form-group" >
        <label for="password">Password:</label>
        <em *ngIf="password?.invalid && (password?.touched || mouseoverLogin)">Required</em>
        <input #password="ngModel" (ngModel)="password" name="password" id="password" required minlength="6" id="password" type="password" class="form-control"placeholder="Password..." />
          <div *ngIf="password.invalid && (password.dirty || password.touched)"
              class="alert alert-danger">
              <div [hidden]="!password.errors.required">
                Password is required
              </div>
              <div [hidden]="!password.errors.minlength">
                Password must be at least 6 characters long.
              </div>
          </div>
      </div>
      
      <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
        <button type="submit" [disabled]="signupForm.invalid" class="btn btn-primary">Sign Up</button>
      </span>
      <button type="button" (click)="cancel()" class="btn btn-default">Cancel</button>
          <span><a [routerLink]="['/login']">login to existing account</a></span>

    </form>
    <br />
    <div *ngIf="loginInvalid" class="alert alert-danger">Invalid Login Info</div>
  </div>

  ```

1. Open the src\app\signup\signup.component.ts file
1. Add the following import statements

  ```TypeScript
  import { AuthService } from '../shared/services/auth.service';
  import { Router } from '@angular/router';
  ```

1. Add a constructor and inject the AuthService and Router

  ```TypeScript
  constructor(private authService: AuthService, private router: Router) { }
  ```

1. Create a variable in the SignupComponent class called loginInvalid that is of type string

  ```TypeScript
  loginInvalid: boolean = false;
  ```  

1. Create the signup function with the following code

  ```TypeScript
  signup(formValues) {
    this.authService.signup(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
  ```  

1. Open the login.component.html file
1. Next to the cancel button add the following HTML to give a link to the create page

  ```html
  <span><a [routerLink]="['/signup']">create account</a></span>
  ```

1. You should now to be able to create accounts and navigate between the signup and login pages.  Once logged in or account created, you will be redirected to the home page and shown the todo items.
