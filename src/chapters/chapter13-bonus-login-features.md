## Bonus: Additional Login Features


### Goals

* Understand how to create a cookie with user information in it
* Understand how to logout the user 

### Code from Previous Chapter

<div class="alert alert-danger" role="alert">Skip this section if you completed the previous chapter</div>

If you have not completed the previous chapter you can get the completed code by downloading the code from Github.

<h4 class="exercise-start">
    <b>Exercise</b>: Downloading Code 
</h4>

1. Downloading and extracting the zip file into your projects folder (c:\projects or ~/projects) at [https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-additional-todo.zip](https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-additional-todo.zip) 
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

### Caching User

Right now when you refresh the page the current user information in the AuthService is lost.  We can cache the data using cookies.  To implement the cookie storage we are going to use the ngx-cookie library.

<h4 class="exercise-start">
    <b>Exercise</b>: Create Class
</h4>

In the AuthService, in order to hold our user data and get type checking we need to create a TypeScript class with an email and id field.  We are going to leave the password field out of the class as we do not want to store this in memory at all.  

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the Authorization service.  I like to store my services under a shared\services folder.

    ```bash
    ng generate class shared/classes/User
    ```

1. The generate command will the user.ts file in the shared/classes folder: 

    ![output of generate](images/user-generate.png)


1. Open the src\app\shared\classes\User.ts file

    ```bash
    user.ts
    ```

1. Within the User class, add the following fields.  Note that the  createdAt and updatedAt are automatically added by the API.

    ```TypeScript
    email: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ```

1. Within the User class and before the fields we just added, create a constructor that requires an email and make an id field optional (hint: the `?` makes the parameter optional)

    ```TypeScript
    constructor(email: string, id?: string, createdAt?: Date, updatedAt?: Date){
        this.email = email;
        this.id = id;
        this.createdAt = createdAt ? createdAt: new Date();
        this.updatedAt = updatedAt ? updatedAt: new Date();
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Install ngx-cookie
</h4>

1. Open terminal and add/install the ngx-cookie library

  ```bash
  npm install --save ngx-cookie
  ```

1. Open src\app\app.module.ts

    ```bash
    app.module.ts
    ```

1. Import the ngx-cookie library

    ```TypeScript
    import { CookieModule } from 'ngx-cookie';
    ```

1. Add the ngx-cookie library to the @Ngmodule imports sections

    ```TypeScript
    CookieModule.forRoot()
    ```
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Cookie Get/Set Functions 
</h4>

1. Open the auth.service.ts file

    ```bash
    auth.service.ts
    ```

1. Import the User class that we created earlier

    ```TypeScript
    import { User } from '../classes/user';
    ```

1. Import the CookieService from ngx-cookie

    ```TypeScript
    import { CookieService } from 'ngx-cookie';
    ```

1. Update the constructor to inject the CookieService

    ```TypeScript
    constructor(private http: Http, private cookieService: CookieService) {}
    ```

1. Add a class level variable to store the name of the cookie and set it to currentUser

    ```TypeScript
    private cookieKey: string = "currentUser";
    ```

1. Add the following functions to get/set the cookie to the AuthService class

    ```TypeScript
    getUser(): User {
        return <User>this.cookieService.getObject(this.cookieKey)
    }

    private setUser(value: User): void {
        this.cookieService.putObject(this.cookieKey, value);
    }

    private clearUser() : void {
        this.cookieService.remove(this.cookieKey);
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Setting Cookie
</h4>

1. In the auth.service.ts file, in the login, signup, and isAuthenticated functions, add a call to setUser before the return Observable.of(true) statement

    ```TypeScript
    this.setUser(<User>res.json());
    ```

1. In the login and isAuthenticated functions, before the Observable.of(false) in both the result and catch section add to clearUser since the login was invalid and we want to clear out any existing user cookie

    ```TypeScript
    this.clearUser();
    ```
    
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Display logged in user
</h4>

1. Open header.component.ts

    ```bash
    header.component.ts
    ```
    
1. Import the AuthService so that we can call the getUser function

    ```TypeScript
    import { AuthService } from '../services/auth.service';
    ```

1. Add the AuthService to the constructor

    ```TypeScript
    constructor(private authService: AuthService) { }
    ```

1. Open the src\app\shared\header\header.component.html

    ```bash
    header.component.html
    ```

1. Inside of the `<div class="collapse navbar-collapse"....` tag add the following after the closing `</ul>`

    ```html
    <ul class="nav navbar-nav">
        <li class="nav-item">
            <span class="nav-link">Welcome {{(authService.getUser())?.email}}</span>
        </li>
    </ul>
    ```

    * This code will display a Welcome along with the email if it is populated.  

<div class="exercise-end"></div>


### Logout User

Before being able to signup for an account, we need the user to be logged out first.

There are a number of ways that you could implement this such as giving a logout button in the header or showing user info in header with link to profile page with a logout button.

We are going to implement the logout button in the header.  

<h4 class="exercise-start">
    <b>Exercise</b>: Create AuthService Logout 
</h4>

1. Open the auth.service.ts file

    ```bash
    auth.service.ts
    ```

1. Add the logout function below that will call the API logout function and clear out the cookie

  ```TypeScript
    logout(): Observable<boolean> {
        return this.http.get(`${this.url}/logout`, this.options)
        .map((res: Response) => {
          this.clearUser();

          if (res.ok) {
            return Observable.of(true);
          }

          return Observable.of(false);
        })
        .catch(error => {
            console.log('logout error', error)
            this.clearUser();
            return Observable.of(false);
         });
    }
  ```

<h4 class="exercise-start">
    <b>Exercise</b>: Add Logout Button
</h4>

1. Open the src\app\shared\header\header.component.html

    ```bash
    header.component.html
    ```

1. After the "Welcome" span tag add the following link tag to call the logout service.  Also, only show the button if the user is logged in.

    ```html
    <a [hidden]="!authService.getUser()" (click)="logout()"> | Logout</a>
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Component Logging Out Function
</h4>

1. Open header.component.ts

    ```bash
    header.component.ts
    ```
    
1. Import the AuthService and Router

    ```TypeScript
    import { Router } from '@angular/router';
    ```

1. Add the Router to the constructor

    ```TypeScript
    constructor(private authService: AuthService, private router: Router) { }
    ```

1. Add the logout function

    ```TypeScript
    logout() {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
    ```

1. You are now ready to test it.

<div class="exercise-end"></div>

