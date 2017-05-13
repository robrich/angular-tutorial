## Bonus: Additional Login Features

**CHAPTER IS NOT COMPLETE**

### Overview

### Goals

### Caching User

Right now when you refresh the page the current user information in the AuthService is lost.  We can cache the data using cookies.  To implement the cookie storage we are going to use the ngx-cookie library.

<h4 class="exercise-start">
  <b>Exercise</b>: Install ngx-cookie
</h4>

1. Open terminal and generate the guard 

  ```bash
  npm install --save ngx-cookie
  ```

1. Open src\app\app.module.ts
1. Import the ngx-cookie library

    ```TypeScript

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

1. Open the auth.service.ts file
1. Add the following functions to get/set the cookie

    ```TypeScript
    getUser(): User {
        return <User>this.cookieService.getObject(this.cookieKey)
    }

    private setUser(value: User) {
        this.cookieService.putObject(this.cookieKey, value);
    }

    private clearUser() {
        this.cookieService.remove(this.cookieKey);
    }
    ```

1. In the login function, change the do statement that is setting the currentUser value to

    ```TypeScript
    if (res) {
          let currentUser: User = <User>res.json();
          this.setUser(new User(currentUser.email, currentUser.id));
    }
    ```

1. You can remote the class variable currentUser as it will no longer be used.
    
### Is User Logged Out 

Before being able to signup for an account, we need the user to be logged out first.


### Logout User

1. open the auth.service.ts file
1. Add the logout function below that will call the API logout function and clear out the cookie

  ```TypeScript
    logout(): Observable<boolean> {
      return this.http.get(this.url + '/logout', this.options)
        .map((res: Response) => {
          if (res.ok) {
            this.clearUser();
            return Observable.of(true);
          }

          return Observable.of(false);
        })
        .catch(error => this.handleError(error));
    }
  ```

1. Open the     
