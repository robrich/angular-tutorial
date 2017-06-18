## Bonus: Additional Login Features


### Goals

* Understand how to create a cookie with user information in it
* Understand how to logout the user 

### Caching User

Right now when you refresh the page the current user information in the AuthService is lost.  We can cache the data using cookies.  To implement the cookie storage we are going to use the ngx-cookie library.

<h4 class="exercise-start">
  <b>Exercise</b>: Install ngx-cookie
</h4>

1. Open terminal and add/install the ngx-cookie library

  ```bash
  npm install --save ngx-cookie
  ```

1. Open src\app\app.module.ts
1. Import the ngx-cookie library

    ```TypeScript
    import { CookieModule } from 'ngx-cookie';
    ```

1. Add the ngx-cookie library to the @Ngmodule imports sections

    ```TypeScript
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule,
        CookieModule.forRoot()
    ],
    ```
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Cookie Get/Set Functions 
</h4>

1. Open the auth.service.ts file
1. Add the following functions to get/set the cookie

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


1. In the login and signup functions, inside the do statement remove the existing code that is setting the this.currentUser variable and replace it with the following.  

    ```TypeScript
    if (res) {
          this.setUser(<User>res.json());
    }
    ```

1. In the login and isAuthenticated functions, in the catch section, add a call to clearUser 

    ```TypeScript
    this.clearUser();
    ```

1. In the isAuthenticated function, in the map section, if res is false call clearUser

    ```TypeScript
    this.clearUser();
    ```

1. You can remote the class variable currentUser as it will no longer be used.
    
<div class="exercise-end"></div>

### Logout User

Before being able to signup for an account, we need the user to be logged out first.

There are a number of ways that you could implement this such as giving a logout button in the header or showing user info in header with link to profile page with a logout button.

We are going to implement the logout button in the header.  

<h4 class="exercise-start">
    <b>Exercise</b>: Create AuthService Logout 
</h4>

1. open the auth.service.ts file
1. Add the logout function below that will call the API logout function and clear out the cookie

  ```TypeScript
    logout(): Observable<boolean> {
        return this.http.get(`${this.url}/logout`, this.options)
        .map((res: Response) => {
          if (res.ok) {
            this.clearUser();
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
1. Inside of the `<div class="collapse navbar-collapse"....` tag add the following after the closing `</ul>`

    ```html
    <ul class="nav navbar-nav">
        <li class="nav-item">
            <span class="nav-link">Welcome {{(authService.getUser())?.email}}  <a [hidden]="!authService.getUser()" (click)="logout()"> | Logout</a></span>
        </li>
    </ul>
    ```

    * This code will display a Welcome along with the email if it is populated.  

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Compoment Logging Out Function
</h4>

1. Open header.component.ts
1. Import the AuthService and Router

    ```TypeScript
    import { Router } from '@angular/router';
    import { AuthService } from '../services/auth.service';
    ````

1. Add the AuthService and Router to the constructor

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

