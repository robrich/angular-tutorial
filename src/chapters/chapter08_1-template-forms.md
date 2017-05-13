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

Next we are going to create the form without any validation logic at all.  Our form will have 2 input fields:  email and password and 2 buttons: submit and cancel.  

<h4 class="exercise-start">
    <b>Exercise</b>:  Creating the Form
</h4>

1. Open src\app\login\login.component.html
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

### Add Submit Method

In order to submit the form we need to tell Angular that that login form is an ngForm and use the ngSubmit event to tell Angular what to do when the form submit button is clicked.


<h4 class="exercise-start">
    <b>Exercise</b>:  Add login function
</h4>

1. In the login.component.html file on the `<form>` tag add the following attributes.  

    ```html
    #loginForm="ngForm" (ngSubmit)="login(loginForm.value)"
    ```

1. On the email field we need to add an attribute tell Angular to implement a 1 way binding of the field.  We use the `(ngModel)` attribute to tell Angular what field in the form values we want to the data to be bound to.

    ```html
    (ngModel)="email"
    ```

1. On the password field we are going to do the same thing that we just did to the email field.  

    ```html
    (ngModel)="password"
    ```

Next we need to implement the login function in the component.

1. Open the login.component.ts file
1. Inside of the LoginComponent class, add the login function below.  For now we are just going to output the form values to the console. 

    ```TypeScript
    login(formValues) {
        console.log(formValues);
    }
    ```

1. In your browser, while viewing the login form at http://localhost:4200/login open the developer tools and click the console tab so that you can see the console output.    
1. Now enter a value into the email and password fields and click the submit button.  You will see output similar to the below image where I entered the email of email@gmail.com and password of 123456

    ![login console output](images/login-submit-console.png)

At this point we are ready to wire up the login form to actually 

<div class="exercise-end"></div>


### Required Validation

<h4 class="exercise-start">
    <b>Exercise</b>: Add Required Validation
</h4>


For both the email and password fields they are required.  While we could check them in the component TypeScript code, Angular has built in validation by adding the `required` attribute to each of the inputs.

1. Open the login.component.html
1. Add the `required` attribute to the email input field like so

    ```html
    <input required (ngModel)="email" name="email" id="email"  type="text" class="form-control" placeholder="Email..." />
    ```
    
1. Add the `required` attribute to the password input field

    ```html
    <input required (ngModel)="password" name="password" id="password" id="password" type="password" class="form-control" placeholder="Password..." />
    ```

Next we want to display a message to the user when they have invalid entries in the form fields

1. For the email field, inside of the form-group div tag and after the input field add the following code.  This code will show when the required errors triggers.  To trigger the error message, click on the email field and then click on the password field.

    ```TypeScript
    <div *ngIf="email.errors && (email.dirty || email.touched)" class="alert alert-danger">
        <div [hidden]="!email.errors.required">
        Email is required
        </div>
    </div>
    ```

1. In order to refer to the email field by name when checking errors, we need to add the `#email="ngModel"` attribute to the email input field to tell Angular to create a variable for the control and make the value the ngModel value for the email field.  

    ```html
    <input #email="ngModel" required (ngModel)="email" name="email" id="email" type="text" class="form-control" placeholder="Email..." />
    ```

1. For the password field, inside of the form-group div tag and after the input field add the following code.  This code will show when the required errors triggers.  To trigger the error message, click on the password field and then click on the email field.

    ```TypeScript
    <div *ngIf="password.errors && (password.dirty || password.touched)" class="alert alert-danger">
        <div [hidden]="!password.errors.required">
        Password is required
        </div>
    </div>
    ```

1. Just like the email field, we need to add the `#password="ngModel"` attribute to the input control to name the field

    ```html
    <input #password="ngModel" required (ngModel)="password" name="password" id="password" id="password" type="password" class="form-control" placeholder="Password..." />
    ```

The last thing we want to do is to disable the login button until the form is valid.

1. Find the submit button and add the following attribute to it to disable the button when the login form is invalid

    ```html
    <button type="submit"  [disabled]="loginForm.invalid" class="btn btn-primary">Login</button>
    ```

1. Now we are ready to test our required validation.  
    * Trigger email by clicking on the field and then clicking off the field with it still being blank or type something in the field and then erase it
    * Trigger the password field the same way

    ![required validation](images/login-required-validation.png)

<div class="exercise-end"></div>

### Email  Validation

<h4 class="exercise-start">
    <b>Exercise</b>: Add Email Validation
</h4>

With the Angular 4 release, they added an email validator.  To add the validator to our email field, we just need to add an `email` attribute like we did for the `required` attribute.

```html
<input email #email="ngModel" required (ngModel)="email" name="email" id="email" type="text" class="form-control" placeholder="Email..." />
``` 

Next we need to add a message like we did for the required validator for when the email validation triggers on an invalid email.  Add the following code below the required message but within the `<div>` that checks if there are errors.

```html
<div [hidden]="!email.errors.email">
    Must be an email address
</div>
```

Now we are ready to test the email validation.  

* The validation will trigger if you input text into the email field that is not a valid email address.

    ![email validation](images/login-email-validation.png)

* The validation will also trigger at the same time as required 

    ![required validation](images/login-email-required-validation.png)

Test

<div class="exercise-end"></div>

### Disable Login Button

<h4 class="exercise-start">
    <b>Exercise</b>: Disable Login Button Until Valid
</h4>

The last thing we want to do is to disable the login button until the form is valid.

1. Find the submit button and add the following attribute to it to disable the button when the login form is invalid

    ```html
    <button type="submit"  [disabled]="loginForm.invalid" class="btn btn-primary">Login</button>
    ```

1. Now when either field is invalid the login button will be disabled and a lighter share of blue

    ![required validation](images/login-submit-disabled.png)


<div class="exercise-end"></div>

### Implement Login Service

Now that we have our form done, we are going to implement our login service.

<h4 class="exercise-start">
    <b>Exercise</b>:  Generate Service
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the Authorization service.  I like to store my services under a shared\services folder.

    ```bash
    ng generate service shared/service/auth
    ```

1. The generate command will create 2 files: 

    ![output of generate](images/login-service-generate.png)

    * spec file (test)
    * typescript (service)

You will also notice that there is a warning that the service has not been provided. This means that we need to open up the module that we want to use the service in and add it to the providers list.

1. Open src\app\app.module.ts
1. Import the AuthService

    ```TypeScript
    import { AuthService } from './shared/services/auth.service';
    ```

1. Find the @NgModule providers list and add the AuthService

    ```TypeScript
      providers: [AuthService],
    ```    

1. Now the AuthService is available to the AppModule and we can use it in our LoginComponent

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Create Class
</h4>

In the AuthService, In order to hold our user data and get type checking we need to create a TypeScript class with an email and id field.  We are going to leave the password field out of the class as we do not want to store this in memory at all.  

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the Authorization service.  I like to store my services under a shared\services folder.

    ```bash
    ng generate class shared/classes/User
    ```

1. The generate command will create 2 files: 

    ![output of generate](images/user-generate.png)

    * user.ts 

1. Open the src\app\shared\classes\User.ts file
1. Add email, id, createdAt, and updatedAt variables that of type script.  The createdAt and updatedAt are automatically added by the API.

    ```TypeScript
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ```

1. Add a constructor that requires an email and make an id field optional (hint: the `?` make the parameter optional)

    ```TypeScript
    constructor(email: string, id?: string, createdAt?: Date, updatedAt?: Date){
        this.email = email;
        this.id = id;
        if (createdAt) this.createdAt = createdAt;
        if (updatedAt) this.updatedAt = updatedAt;
    }
    ```

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Implement Auth Service Login Function
</h4>

Now that we have our API server up and running, it is time to create our Auth service login function that call the API.

1. Open the src\shared\services\auth.service.ts file
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

1. We also want to create a public variable within the AuthClass to hold the output from the API call 

    ```TypeScript
    public currentUser: User;
    ```

1. For the API that we are using (SailsJS based), it requires that we set the HTTP option to allow credentials so that the session cookie can be passed back and forth, else it will always think you haven't logged in.  

    ```TypeScript
    private options = new RequestOptions({ withCredentials: true });
    ```

    <div class="alert alert-info" role="alert">You will need to pass in this.options as the last parameter for all of our http calls.</div>

1. Next we need to create our login function within the AuthService class that will call our API

    ```TypeScript
    login(email: string, password: string): Observable<boolean | Response> {
        let loginInfo = { "email": email, "password": password };
        return this.http.put("https://dj-sails-todo.azurewebsites.net/user", loginInfo, this.options)
            .do((res: Response) => {
                if (res){
                    this.currentUser = <User>res.json();
                }
            })
            .catch(error => {
                console.log('login error', error)
                return Observable.of(false);
            });
    }
    ```

    <div class="alert alert-info" role="alert">Since we have to pass the password to the API to validate the login, make sure you do not use your real passwords as we are communicating in development over a non-secure http connection so anyone can easily capture your email and password combo for the todo API.  In production, you would want use an SSL certificate.  As well for development, typically you would have the API locally but since this is an Angular workshop and not an API workshop, a remote API was provided for you.</div>

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Call AuthService from LoginComponent
</h4>

Now that we have our AuthService completed, we need to call it from our LoginComponent.  If we get a user back we will redirect the user to the home page

1. Open the src\login\login.component.ts file
1. Import the AuthService so that we can make our HTTP calls and get a response back.  

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
        if (!this.authService.currentUser) {
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
1. We want to put our message after the cancel button but inside the `</form>` tag
1. Add the following alert message

    ```html
    <div *ngIf="loginInvalid" class="alert alert-danger">
        Invalid Login
    </div>
    ```
<div class="exercise-end"></div>
