## Template Based Forms

### Overview

There are 2 options for creating forms within Angular: Template based and Model based.  This chapter will cover template based forms.

Template based forms are simple and easy to use.  They are great for simple use cases.  However, there are some limitations with template  based forms: 1.) You end up with a lot of logic in your html code 2.) Cross field validation is more difficult 3.) You can not unit test your form and validation logic.

To demonstrate template based forms, we are going to be build a login component.

### Goals

* Understand template based forms
* Create template based form
* Implement input validation
* Submit form values to a service

### Code from Previous Chapter

<div class="alert alert-danger" role="alert">Skip this section if you completed the previous chapter</div>

If you have not completed the previous chapter you can get the completed code by downloading the code from Github.

<h4 class="exercise-start">
    <b>Exercise</b>: Downloading Code 
</h4>

1. Downloading and extracting the zip file into your projects folder (c:\projects or ~/projects) at [https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-bootstrap.zip](https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-bootstrap.zip) 
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

### Create Login Component

The first thing we need to do is to create our login component using the Angular CLI.  We will use the `ng generate component` command to do this.  


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

In order to view our Login component we need to tell Angular how to route to it.  We are going to add a route at '/login' to the LoginComponent.

<h4 class="exercise-start">
    <b>Exercise</b>: Login Routing 
</h4>

Before we can view our Login component, we need to tell Angular how to route to the component

1. Open the src\app\app-routing.module.ts file

    ```bash
    app-routing.module.ts
    ```

1. You need to import the LoginComponent before we can reference it.  On line 3, add the following statement

    ```TypeScript
    import { LoginComponent } from './login/login.component';
    ```

1. In the routes array, we need to add another array item to be able to route to the LoginComponent. Add the following at the end of line 9

    ```TypeScript
    ,
    { path: 'login', children: [], component: LoginComponent }   
    ```

1. Your routes should look like the following

    ```TypeScript
    const routes: Routes = [
        {
            path: '',
            children: []
        },
        { path: 'login', children: [], component: LoginComponent }
    ];
    ```

1. The Login page should display when you navigate to [http://localhost:4200/login](http://localhost:4200/login)

    ![login initial view](images/login-initial-view.png)

    <div class="alert alert-info" role="alert">**Note:** When you navigate to the login route, the LoginComponent is loaded into the `<router-outlet></router-outlet>` in the html in  src\app\app.component.html.  The router-outlet tag is how Angular knows where to put the rendered content for the route.</div>

<div class="exercise-end"></div>


### Create Form

Next we are going to create the form without any validation logic at all.  Our form will have 2 input fields:  email and password and 2 buttons: submit and cancel.  We will use Bootstrap for the styling and Angular for the validation.

<h4 class="exercise-start">
    <b>Exercise</b>:  Creating the Form
</h4>

1. Open src\app\login\login.component.html

    ```bash
    login.component.html
    ```

1. Replace the existing html with the following

    ```html
    <h1>Login</h1>
    <hr>
    <div>
        <form autocomplete="off" novalidate>
            <div class="form-group">
                <label for="email">Email:</label>
                <input name="email" id="email" type="text" class="form-control" placeholder="Email..." />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input name="password" id="password" id="password" type="password" class="form-control" placeholder="Password..." />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" class="btn btn-default">Cancel</button>
        </form>
    </div>
    ```

    * This form is using Bootstrap for the styling with the form-group, form-control btn, and btn-* css classes.
    * The autocomplete="off" and novalidate directives for the form tag tell the browser to turn off that built-in functionality so that we can do our validation with Angular.

<div class="exercise-end"></div>

### Handle Form Submission

In order to submit the form we need to tell Angular that that login form is an ngForm and use the ngSubmit event to tell Angular what to do when the form submit button is clicked.

<h4 class="exercise-start">
    <b>Exercise</b>:  Import Angular FormsModule
</h4>

Before we can interact with our form using Angular, we need to import the FormsModule into our application.

1. Open src\app\app.module.ts

    ```bash
    app.module.ts
    ```

1. Add an import statement for FormsModule from @angular/forms

    ```TypeScript
    import { FormsModule } from '@angular/forms';
    ```

1. Before we can use the imported module, we need to add it to the @NgModule declaration in the imports array.  We are going to add it between the BrowserModule and AppRoutingModule.

    ```TypeScript
    FormsModule,
    ```

1. Your @NgModule imports section should now look like:

    ```TypeScript
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule
    ],

    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Add login function
</h4>

1. Go back to the login.component.html file

    ```bash
    login.component.html
    ```

1. On the `<form>` tag we need to add 2 additional attributes to create a reference variable to the form and handle the form submit.  

    ```html
    #loginForm="ngForm" (ngSubmit)="login(loginForm.value)"
    ```

    * The #loginForm creates a variable called loginForm that reference ngForm.  This will allow us to reference the loginForm in the login.component.ts file. 
    * The ngSubmit upon form submit event will call the login function in the login.component.ts file and pass the loginForm.value into it.  The loginForm.value holds the values for the form fields.

In order to be able to access all of the form field values by using `loginForm.value` we need tdo add an `(ngModel)="NAME"` attribute onto each field, replacing "NAME" with the name that we want to refer to the field as.

1. On the email input field we need to add an attribute to tell Angular to implement 1 way binding on the field by using the `(ngModel)` attribute

    ```html
    (ngModel)="email"
    ```

1. On the password field we are going to do the same thing that we just did to the email field.  

    ```html
    (ngModel)="password"
    ```

Now that the basics of the form have been created, we are ready handle the form submit event and implement the login function that `(ngSubmit)` is calling.  

1. Open the login.component.ts file

    ```bash
    login.component.ts
    ```

1. Inside of the LoginComponent class after the ngOnInit, add the following function.  For now we are just going to output the form values to the Developer Tools console in the browser. 

    ```TypeScript
    login(formValues) {
        console.log(formValues);
    }
    ```

1. In your browser, while viewing the login form at http://localhost:4200/login open the developer tools and click the console tab so that you can see the console output.    
1. Now enter a value into the email and password fields and click the submit button.  You will see output similar to the below image where I entered the email of email@gmail.com and password of 123456

    ![login console output](images/login-submit-console.png)


<div class="exercise-end"></div>


### Implement Login Service

Now that we have our form done, we are going to implement our login service.

<h4 class="exercise-start">
    <b>Exercise</b>:  Generate Service
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the Authorization service.  I like to store my services under a shared\services folder.

    ```bash
    ng generate service shared/services/auth --module App
    ```

1. The generate command will create 2 files and update app.module.ts: 

    ![output of generate](images/login-service-generate.png)

    * spec file (test)
    * typescript (service)
    * updated app.module.ts to add LoginService as a provider

Before we can make HTTP calls in our AuthService, we need to import the HttpModule into your AppModule

1. Open the app.module.ts file

    ```bash
    app.module.ts
    ```

1. Add an import statement for the HttpModule that comes from @angular/http

    ```TypeScript
    import { HttpModule } from '@angular/http';
    ```

1. In the @NgModule imports array add the HttpModule

    ```TypeScript
    HttpModule,
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Implement Auth Service Login Function
</h4>

For this tutorial, I have created an API for us to use.  

The first thing we are going to do is create our login function

1. Open the src\shared\services\auth.service.ts file

    ```bash
    auth.service.ts
    ```

1. Import the following so that we can make our HTTP calls and get a response back.  

    ```TypeScript
    import { Http, Response, RequestOptions } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
    ```


1. In order to use the HTTP module, we need to inject it into our constructor

    ```TypeScript
    constructor(private http: Http) {
    }
    ```


1. For the API that we are using (SailsJS based), it requires that we set the HTTP option to allow credentials so that the session cookie can be passed back and forth, else it will always think you haven't logged in.  

    ```TypeScript
    private options = new RequestOptions({ withCredentials: true });
    ```

1. Next we need to create our login function within the AuthService class that will call our API.  Place the login function after the constructor.

    <div class="alert alert-warning" role="alert">For now we are hard coding the API url into the service.  In the "Environment Configuration" chapter we will change this to pull from a configuration file</div>

    ```TypeScript
    login(email: string, password: string): Observable<boolean> {
        let loginInfo = { "email": email, "password": password };
        return this.http.put("https://dj-sails-todo.azurewebsites.net/user/login", loginInfo, this.options)
            .do((res: Response) => {
                if (res){
                    return Observable.of(true);
                }

                return Observable.of(false);
            })
            .catch(error => {
                console.log('login error', error);
                return Observable.of(false);
            });
    }
    ```

    * This code setups the call to the login API and and returns back an Observable.  
    * Note that this code is not called until someone subscribes to the login function which we will be doing next.

    <div class="alert alert-danger" role="alert">The API is setup for username/password validation.  Make sure you do not use your real passwords as this is just a test API and not production secured.</div>

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Call AuthService from LoginComponent
</h4>

Now that we have our AuthService completed, we need to call it from our LoginComponent.  If we get a user back we will redirect the user to the home page

1. Open the src\login\login.component.ts file

    ```bash
    login.component.ts
    ```

1. Import the AuthService and Router so that we can make call our LoginService and redirect upon successful login.  

    ```TypeScript
    import { AuthService } from '../shared/services/auth.service';
    import { Router } from '@angular/router';
    ```

1. In order to use the AuthService and Router, we need to inject it into our constructor

    ```TypeScript
   constructor(private authService: AuthService, private router: Router) { }
    ```

1. Next we need to update our login function to call the AuthService and redirect if it finds the user.

    ```TypeScript
    login(formValues) {
        this.authService.login(formValues.email, formValues.password)
            .subscribe(result => {
                if (!result) {
                    console.log('user not found');
                } else {
                    this.router.navigate(['/']);
                }
        });
    }
    ```

1. Navigate to http://localhost:4200/login .

    * If you enter an email of foo@foo.com with a password 123456 you should be redirected to the home page
    * If you enter a bogus email or password, you will see a "user not found" message in the browser developer tools console.
    
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Show Invalid Login Message
</h4>

Up to this point, we have been using the console to output when the login failed but we can not expect the user to have the dev tools console open.  Instead we need to show to the user when there is an error.

1. Open the login.component.ts file

    ```bash
    login.component.ts
    ```

1. Create a new variable inside of the LoginComponent class called invalidLogin, is of type boolean and the default value is false.

    ```TypeScript
    invalidLogin: boolean = false;
    ```

1. Now in the login method replace the console.log line and set the invalidLogin variable to true.  Make sure in the else statement that you set the invalidLogin to false.

    ```TypeScript
    this.invalidLogin = true;
    ```

    * We have to use this. to access the variable due to scoping.  

Now we are ready to implement the UI to show the error message.  

1. Open the login.component.html file

    ```bash
    login.component.html
    ```

1. We want to put our message after the cancel button but inside the `</form>` tag
1. Add the following alert message

    ```html
    <div *ngIf="invalidLogin" class="alert alert-danger">
        Invalid Login
    </div>
    ```
<div class="exercise-end"></div>

### Required Validation

<h4 class="exercise-start">
    <b>Exercise</b>: Add Required Validation
</h4>

A standard requirement for html forms is to have client side validation.  In this section we are going to implement the required field validation for both email and password.  

Adding required validation is as easy as adding a required attribute to the input field

1. Open the login.component.html

    ```bash
    login.component.html
    ```

1. On the email and password fields add the `required` attribute

    ```html
    required
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Display Validation Errors
</h4>

Next we want to display a message to the user when they have invalid entries in the form fields.

1. In order to refer to the email field by name when checking errors, we need to add the `#email="ngModel"` attribute to the email input field to tell Angular to create a variable for the control and make the value the ngModel value for the email field.  

    ```html
    #email="ngModel"
    ```

1. For the email field, inside of the form-group div tag and after the input field add the following code.  This code will show when the required errors triggers.  To trigger the error message, click on the email field and then click on the password field.

    ```TypeScript
    <div *ngIf="email.errors && (email.dirty || email.touched)" class="alert alert-danger">
        <div [hidden]="!email.errors.required">
        Email is required
        </div>
    </div>
    ```

1. Just like the email field, we need to add the `#password="ngModel"` attribute to the input control to name the field

    ```html
    #password="ngModel"
    ```

1. For the password field, inside of the form-group div tag and after the input field add the following code.  This code will show when the required errors triggers.  To trigger the error message, click on the password field and then click on the email field.

    ```TypeScript
    <div *ngIf="password.errors && (password.dirty || password.touched)" class="alert alert-danger">
        <div [hidden]="!password.errors.required">
        Password is required
        </div>
    </div>
    ```

<div class="exercise-end"></div>

### Email  Validation

<h4 class="exercise-start">
    <b>Exercise</b>: Add Email Validation
</h4>

With the Angular 4 release, they added an email validator.  To add the validator to our email field, we just need to add an `email` attribute like we did for the `required` attribute.

```html
email
``` 

Next we need to add a message like we did for the required validator for when the email validation triggers on an invalid email.  Add the following code below the required message but within the `<div>` that checks if there are errors.

```html
<div [hidden]="email.errors.required || !email.errors.email">
    Must be an email address
</div>
```

Now we are ready to test the email validation.  

* The validation will trigger if you input text into the email field that is not a valid email address.

    ![email validation](images/login-email-validation.png)

<div class="exercise-end"></div>

### Disable Login Button

<h4 class="exercise-start">
    <b>Exercise</b>: Disable Login Button Until Valid
</h4>

The last thing we want to do is to disable the login button until the form is valid.

1. Find the submit button and add the disabled attribute that makes sure that the loginForm is valid before enabling the button

    ```html
    [disabled]="loginForm.invalid"
    ```

1. Now when either field is invalid the login button will be disabled and a lighter share of blue

    ![required validation](images/login-submit-disabled.png)


<div class="exercise-end"></div>


### Create Create Account Component

Up to this point, we have only been able to login to an existing account.  Now we are going to create the signup page.  

Creating the signup component is just like the rest of the component that we have created.  We will have an html, scss, spec, and ts file.  We will have a form that calls to a function in the component that calls to a service to process the data.

<div class="alert alert-danger" role="alert">Since the signup component creation is exactly like the login component we are just going a quick here is the code walk through</div>

<h4 class="exercise-start">
    <b>Exercise</b>: AuthService Signup Function 
</h4>

We are first going to create the signup function in the AuthService.

1. Open the src\app\shared\services\auth.service.ts

    ```bash
    auth.service.ts
    ```

1. Add the following method to allow an account to be created

  ```TypeScript
  signup(email: string, password: string): Observable<boolean> {
    let loginInfo = { "email": email, "password": password };
    return this.http.post("https://dj-sails-todo.azurewebsites.net/user/", loginInfo, this.options)
      .do((res: Response) => {
        if (res) {
          return Observable.of(true);
        }

        return Observable.of(false);
      })
      .catch(error => {
        console.log('signup error', error);
        return Observable.of(false);
      });
  }
  ```

  <div class="alert alert-danger" role="alert">REMINDER: Since we have to pass the password to the API in order to create the account and we are communicating over a non-secure channel, make sure you do not use your real passwords.</div>

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Create Signup Component
</h4>
  
1. Open terminal and run the ng generate to create the signup component

  ```TypeScript
  ng generate component signup
  ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Signup Route
</h4>

1. Open the src\app\app-routing.module.ts file

  ```bash
  app-routing.module.ts
  ```

1. Import the signup component

    ```TypeScript
    import { SignupComponent } from './signup/signup.component';
    ```

1. Add a new route to get to the signup page

  ```TypeScript
  { path: 'signup', component: SignupComponent},
  ```

1. You routes should look like

    ```TypeScript
    const routes: Routes = [
        {
            path: '',
            children: [],
        },
        { path: 'login', children: [], component: LoginComponent },
        { path: 'signup', component: SignupComponent},
    ];
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Create Signup UI
</h4>

1. Open the src\app\signup\signup.html file

  ```bash
  signup.html
  ```

1. Replace the contents with the following UI and template based form to allow a user to create an account

  ```html
    <h1>Sign Up</h1>
    <hr>
    <div>
    <form #signupForm="ngForm" (ngSubmit)="signup(signupForm.value)" autocomplete="off" novalidate>
        <div class="form-group">
        <label for="userName">Email:</label>
        <input #email="ngModel" (ngModel)="email" name="email" id="email" required email id="email" type="text" class="form-control" placeholder="Email..." />
        <div *ngIf="email.errors && (email.dirty || email.touched)" class="alert alert-danger">
            <div [hidden]="!email.errors.required">
                Email is required
            </div>
            <div [hidden]="email.errors.required || !email.errors.email">
                Must be an email address
            </div>
        </div>
        </div>
        <div class="form-group">
        <label for="password">Password:</label>
        <input #password="ngModel" (ngModel)="password" name="password" id="password" required minlength="6" id="password" type="password" class="form-control" placeholder="Password..." />
        <div *ngIf="password.errors && (password.dirty || password.touched)" class="alert alert-danger">
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

  ```bash
  signup.component.ts
  ```

1. Replace the contents of the file with the following

  ```TypeScript
    import { Component, OnInit } from '@angular/core';
    import { AuthService } from '../shared/services/auth.service';
    import { Router } from '@angular/router';

    @Component({
        selector: 'app-signup',
        templateUrl: './signup.component.html',
        styleUrls: ['./signup.component.scss']
    })
    export class SignupComponent implements OnInit {
        loginInvalid: boolean = false;
        constructor(private authService: AuthService, private router: Router) { }

        ngOnInit() {
        }

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
    }
    ```  

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Link Between Login and Signup
</h4>

1. Open the login.component.html file

    ```bash
    login.component.html
    ```

1. Next to the cancel button add the following HTML to give a link to the create page

  ```html
  <span><a [routerLink]="['/signup']">create account</a></span>
  ```

1. If you go to [http://localhost:4200/signup](http://localhost:4200/signup) you should now to be able to signup and navigate between the signup and login pages.  Once signed up,  you will be redirected to the home page and shown the todo items.


<div class="exercise-end"></div>

