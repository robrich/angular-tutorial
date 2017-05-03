## Template Based Forms

There are 2 options for creating forms within Angular: Template based and Model based.  This chapter will cover template based forms.

Template based forms are simple and easy to use.  They are great for simple use cases.  However, there are some limitations with template  based forms: 1.) You end up with a lot of logic in your html code 2.) Cross field validation is more difficult 3.) You can not unit test your form and validation logic.

To demonstrate template based forms, we are going to be build a login component.


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

    * This form is using Bootstrap for the styling with the form-group and form-control css classes.
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

You will also notice that thre is a warning that the service has not been provided. This means that we need to open up the module that we want to use the service in and add it to the providers list.

1. Open src\app.module.ts
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
    <b>Exercise</b>:  Starting JSON-Server
</h4>

We are going to use the JSON server that we installed early to create a mock api for our UI so that we can focused on Angular and not worry about creating a real API.  The calls that we will be making to the API are the same calls in Angular that we would make to a real API.

1. Right-click on the [db.json](files/db.json) and save the db.json file to under your Angular project directory
1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Click the + sign to create a new terminal tab
1. Run the following command to start up our json-server from the root directory of the Angular project 

    ```bash
    json-server db.json 
    ```

1. If everything worked correctly you should see the following output

    ![json-server start output](images/json-server-start.png)


1. You can now make REST calls to http://localhost:3000/user and http://localhost:3000/todo

<div class="alert alert-danger" role="alert">
In a real API, you would want to implement SSL to encrypt all of the traffic and protect the passwords by encrypting them in the data store.
</div>

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Implement Auth Service Login Function
</h4>

Now that we have our API server up and running, it is time to create our Auth service login function that call the API.

1. Open the src\shared\services\auth.service.ts file
1. Import the following so that we can make our HTTP calls and get a response back.  

    ```TypeScript
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
    ```

1. In order to use the HTTP module, we need to inject it into our constructor

    ```TypeScript
    constructor(private http: Http) {
    }
    ```

1. We also want to create a public variable within the AuthClass to hold the output from the API call 

    ```TypeScript
    public currentUser: any;
    ```
1. Next we need to create our login function within the AuthService class that will call our API

    ```TypeScript
    login(email: string, password: string): Observable<boolean | Response> {
        let url = `http://localhost:3000/user?email=${email}&password=${password}`;
        return this.http.get(url)
            .do((res: Response) => {
                let body = res.json();
                if (body && body.length === 1) {
                    this.currentUser = body[0];
                } else {
                    this.currentUser = null;
                }
            })
            .catch(error => {
                console.log('login error', error)
                return Observable.of(false);
            });
    }
    ```

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
