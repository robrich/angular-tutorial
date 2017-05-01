## Template Based Forms

NOT DONE!!!

### Create Login Component

<h4 class="exercise-start">
    <b>Exercise</b>: Create Login  Component 
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the login component

    ```bash
    ng generate component login
    ```

1. The generate command will create 4 files: 

    ![output of generate](images/login-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * add reference to the component in the app.module.ts file.

<div class="exercise-end"></div>

### Add Route

<h4 class="exercise-start">
    <b>Exercise</b>: Login Routing 
</h4>

Before we can view our Login component, we need to tell Angular how to route to the component


1. Open the src\app\app-routing.module.ts file
1. Add the Import statement for the login component on line 3

    ```TypeScript
    import { LoginComponent } from './login/login.component';
    ```

1. Add the LoginComponent route to the list of routes+

    ```TypeScript
    { path: 'login', children: [], component: LoginComponent }   
    ```

    <div class="alert alert-info" role="alert">**Note:** This will cause the LoginComponent to load into the `<router-outlet></router-outlet>` in the src\app\app.component.html when navigate to http://localhost:4200/login .  The router-outlet tag is how Angular knows where to put the rendered content of the routed componente.</div>


1. The Login page should be able to be displayed if you navigate to [http://localhost:4200/login](http://localhost:4200/login)

    ![login initial view](images/login-initial-view.png)

<div class="exercise-end"></div>


### Create Form

<h4 class="exercise-start">
    <b>Exercise</b>:  Creating the Form
</h4>

1. Open src\app\login\login.component.html
1. Replace the existing html with the following

    ```html
    <h1>Login</h1>
    <hr>
    <div>
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm.value)" autocomplete="off" novalidate>
            <div class="form-group">
                <label for="userName">Email:</label>
                <em *ngIf="email?.invalid && (email?.touched  || mouseoverLogin)">Required</em>
                <input #email="ngModel" (ngModel)="email" minlength="6" name="email" id="email" required email type="text" class="form-control" placeholder="Email..." />
                <div *ngIf="email.errors && (email.dirty || email.touched)" class="alert alert-danger">
                    <div [hidden]="!email.errors.required">
                        Email is required
                    </div>
                    <div [hidden]="!email.errors.email">
                        Must be an email address
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <em *ngIf="password?.invalid && (password?.touched || mouseoverLogin)">Required</em>
                <input #password="ngModel" (ngModel)="password" name="password" id="password" required id="password" type="password" class="form-control" placeholder="Password..." />
                <div *ngIf="minLengthError || (password.errors && (password.dirty || password.touched))" class="alert alert-danger">
                    <div [hidden]="minLengthError || !password.errors.required">
                        Password is required
                    </div>
                    <div [hidden]="!minLengthError">
                        Password must be at least 6 characters long.
                    </div>
                </div>
            </div>
            <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
                <button type="submit" [disabled]="loginForm.invalid" class="btn btn-primary">Login</button>
            </span>
            <button type="button" (click)="cancel()" class="btn btn-default">Cancel</button>
            <span><a [routerLink]="['/signup']">create account</a></span>
        </form>
        <br />
        <div *ngIf="loginInvalid" class="alert alert-danger">
            Invalid Login Info
        </div>
    </div>
    ```

1. Open the src\app\login\login.component.scss file
1. Add the following to style the em tags

    ```scss
    em {float:right; color:#E05C65; padding-left:10px;}
    ```

1. Open the src\app\login\login.component.ts file
1. Add the login function

    ```TypeScript
    login(formValues) {
    let password: string = formValues.password;
    
    if (password.length < this.minLength){
      this.minLengthError = true;
      this.loginInvalid = false;
      return;
    }

    this.minLengthError = false;
    this.authService.login(formValues.email, formValues.password)
      .subscribe(result => {
        if (!result) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
  ```

<div class="exercise-end"></div>

### Adding Validation

<h4 class="exercise-start">
    <b>Exercise</b>: Add Required Validation
</h4>

Something here!

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Add Email Validation
</h4>

Something here!

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Password Min Length Validation
</h4>

Something here!

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Disable Login Button Until Valid
</h4>

Something here!

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Show Validation on MouseOver
</h4>

Something here!

<div class="exercise-end"></div>

### Submitting Form

<h4 class="exercise-start">
    <b>Exercise</b>: Submitting Form
</h4>

Something here!

<div class="exercise-end"></div>



