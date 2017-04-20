## Locking Down Routes

### Create Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Create Guard
</h4>

1. Create the file src\app\shared\guards\admin.guard.ts
1. Make the contents of the admin.guard.ts file.  Right now the canActivate return a true.  To block access set it to return false.  Normally the canActivate would call your authentication code to validate the user access.  

  ```TypeScript
  import { Injectable } from '@angular/core';
  import { AuthenticationService } from '../services/authentication.service';
  import { CanActivate } from '@angular/router';

  @Injectable()
  export class AdminGuard implements CanActivate {
    constructor(private authService: AuthenticationService) { }

    canActivate(): boolean {
      return true;
    }
  }
  ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Module
</h4>

1. Open the app.module.ts 
1. Import the AdminGuard

  ```TypeScript
  import { AdminGuard } from './shared/guards/admin.guard';
  ```

1. Add the AdminGuard to the providers list

  ```TypeScript
  providers: [TodoService, AdminGuard],
  ```

<div class="exercise-end"></div>

### Update Route With Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Route
</h4>

1. Generate the admin and NotAuthorized components

  ```TypeScript
  ng component admin
  ```

  ```TypeScript
  ng component NotAuthorized
  ```

1. Open the src\app\app-routing.module.ts
1. Import the AdminGuard

  ```TypeScript
  import { AdminGuard } from './shared/guards/admin.guard';
  ```

1. Add a new unauthorized route that loads the NotAuthorizedComponent

  ```TypeScript
  { path: 'unauthorized', component: NotAuthorizedComponent }, 
  ```
1. Add a new admin route that loads the AdminComponent and has a canActivate attribute that calls the AdminGuard.  Note that the canActive value is an array.

  ```TypeScript
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]  }, 
  ```

1. If you navigate to [http://localhost:4200/admin](http://localhost:4200/admin) you will be able to get into the route since canActivate is returning true.

  ![Admin View](images/admin-view.png)

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Test Unauthorized Access
</h4>

To test that the guard is working, we need to return a false from canActivate and redirect to the unauthorized route.  

1. In the admin.guard.ts file, change the canActivate route to the following

  ```TypeScript
    canActivate(): boolean {
    this.router.navigate(['/unauthorized']);
    return false;
  }
  ```

1. Import the router into the admin.guard.ts file

  ```TypeScript
  import { Router } from '@angular/router';
  ```

1. Inject the Router into the constructor

  ```TypeScript
  constructor(private router: Router) { }
  ```  

1. Now if you navigate to [http://localhost:4200/admin](http://localhost:4200/admin) you will be redirected to the unauthorized route

  ![unauthorized view](images/unauthorized-view.png)

<div class="exercise-end"></div>

### Implementing Real Authentication  

So far we have just been testing out the authentication with hard coded values within the UI.  Authorization should be done on the server side as it is very easy to forge and change the authorization on the client just by using the browser developer tools. 

With our Sails API, we have implemented a policy that stores the user profile in a user object and then returns back a cookie with the user profile information that includes if the user is an admin or not for the client to use.

<div class="alert alert-danger" role="alert">
For testing purposes, I have created different routes and policies to return back cookies with the admin flag set and without the admin flag set.  Normally, you would use just 1 policy and not have seperate routes.
</div>

<h4 class="exercise-start">
  <b>Exercise</b>: Install Cookie Library
</h4>

To read the cookie information returned from the Sails API, we are going to use the angular2-cookie npm package

1. From the integrated termainal, stop the ng server process from running
1. Run the following command to install the angular2-cookie library from npm and store it in the dependencies section of the package.json file

  ```bash
  npm install --save angular2-cookie
  ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Add angular2-cookie to module
</h4>

1. Open the src\app\app.module.ts file 
1. Import the angular2-cookis CookieService.  To workaround an issue with the Ahead Of Time compliation, there is a little bit more work to do with this import than we normally would have

  ```TypeScript
  // FIX: https://github.com/salemdar/angular2-cookie/issues/37
  import { CookieService, CookieOptions } from 'angular2-cookie/core';
  export function cookieServiceFactory() {
      return new CookieService();
  }
  ```
 
1. Add the CookieService and CookieOptions to the module providers list

  ```TypeScript
   , { provide: CookieService, useFactory: cookieServiceFactory }, { provide: CookieOptions, useValue: {} }
  ```

  

<div class="exercise-end"></div>

#### Creating Utility Service

With our API calls, we want to ensure that we always call the Sails API initially to get the user cookie.  If we waiting until the guard was called, we would not be able to change things like menus and other options from within the site that an admin might also see.  To ensure we make the call on AppComponent load. we are going to create a UtilityService that is called within the App Page ngOnInit function.  The ngOnInit lifecycle function we run once the component has loaded.

<h4 class="exercise-start">
  <b>Exercise</b>: Create the UtilityService
</h4>

1. From the integrated termainal generate a new service called UtilityService that is stored in the src\app\shared\services folder.

  ```TypeScript
  ng g service shared\services\Utility
  ```

1. Open the src\app\app.module.ts file
1. Import the UtilityService

  ```TypeScript
  import { UtilityService } from './shared/services/utility.service';
  ```

1. Add the UtilityService to the list of providers

  ```TypeScript
  providers: [TodoService, AdminGuard, { provide: CookieService, useFactory: cookieServiceFactory }, { provide: CookieOptions, useValue: {} }, UtilityService],
  ```    

1. Open the src\app\shared\services\utility.service.ts file
1. Make the contents the following to call the Sails utility/version route

  ```TypeScript
  import { Injectable } from '@angular/core';
  import { Http, Headers, Response, RequestOptions } from '@angular/http';
  import { Observable } from 'rxjs/Rx';

  import { environment } from '../../../environments/environment';

  let apiUrl = environment.apiBaseUrl;
  let httpRequestOptions = new RequestOptions( { withCredentials: true } );

  @Injectable()
  export class UtilityService {
    constructor(private _http: Http) { }

    getApiBuild() {
      let url = apiUrl + '/utility/version';
      return this._http.get(url, httpRequestOptions)
        .map(data => data.json())
        .catch(this.handleError);
    }

    // TODO
    // implement exception handling strategy
    private handleError(error: Response) {
      console.log(error);
      return Observable.throw(error.json().error || 'Server error');
    }
  }
  ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Update the AppComponent to Call the UtilityService
</h4>

1. Open the src\app\app.Component.ts file
1. Add OnInit to the @angular/core import

  ```TypeScript
  import { Component, OnInit } from '@angular/core';
  ```

1. To the AppComponent class definition add an "implements OnInit"

  ```TypeScript
  export class AppComponent implements OnInit {
  ```

1. Add a variable called apiBuild that is a type of number after the title variable

  ```TypeScript
  apiBuild: number;
  ```

1. Add a constructor and inject the UtilityService

  ```TypeScript
  constructor(private utilityService: UtilityService) { }
  ```  

1. Add an ngOnInit after the constructor  and with the ngOnInit call the UtilityService getApiBuild and store the result in the apiBuild variable

  ```TypeScript
  ngOnInit() {
    this.utilityService.getApiBuild()
      .subscribe(
      data => this.apiBuild = data.build,
      err => console.log(`Get UI Build failed: ${err}`)
      );
  }
  ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Update Footer with Api Build Info
</h4>

1. Open the src\app\shared\footer\footer.component.ts file
1. Add Input to the @angular/core import

  ```TypeScript
  import { Component, OnInit, Input } from '@angular/core';
  ```

1. Within the FooterComponent class, add an @Input variable to hold the apiBuild that will be passed from the AppComponent

  ```TypeScript
  @Input() apiBuild: number;
  ```

  <div class="alert alert-info" role="alert">
  The @Input is used when you want to pass a value as an Html property when you use the component from the parent component.  In this case the AppComponent will pass the value to the FooterComponent.
  </div>

1. Open the src\app\shared\footer\footer.component.html file
1. Replace the line that outputs the env value with the following line to output both the env and apiBuild values.

  ```TypeScript
  env: {{ env }} &nbsp;|&nbsp; API: {{apiBuild}}
  ```

1. Open the src\app\app.component.html 
1. To the app-footer html add an apiBuild property that is set to apiBuild

  ```html
  <app-footer [apiBuild]="apiBuild"></app-footer>
  ```

  <div class="alert alert-info" role="alert">
  The brackets around apiBuild tell Angular to data bind the property with the value of the variable apiBuild. 
  </div>

1. If you run ng serve and look at the page, you should now see an apibuild value in the footer

  ![ApiBuild in Footer](images/footer-apibuild.png)

  <div class="alert alert-info" role="alert">
  A side benefit to having the apiBuild number in the footer, is that you know exactly which version of the Api the UI is going against.  Also when you update the API you can make sure that the UI is not caching the API results. Later on in the deployment chapter, we will add the UI build version into the footer.
  </div>


<div class="exercise-end"></div>


#### Implement the Authentication Service

Now that we the utility service capturing the user profile cookie information, we are ready to create the Authentication Service that will be used in the AdminGuard.

<h4 class="exercise-start">
  <b>Exercise</b>: Create the Authentication Service
</h4>

1. Open the integrated terminal
1. In the src\app\shared\services folder create new service called AuthenticationService

  ```TypeScript
  ng g service shared\services\authentication
  ```

Now we need to import the service and add it to the providers list for the module.

1. Open the src\app\app.module.ts file
1. Add the AuthenticationService to the list of imports

  ```TypeScript
  import { AuthenticationService } from './shared/services/authentication.service';
  ```

1. Add the AuthenticationService to the module's providers list

  ```TypeScript
  providers: [TodoService, AdminGuard, { provide: CookieService, useFactory: cookieServiceFactory }, { provide: CookieOptions, useValue: {} }, UtilityService, AuthenticationService],
  ```  

Now we are ready to write the code for the AuthenticationService

1. Open the src\app\shared\services\authentication.service.ts file
1. Since we are going to be reading a cookie, we need to import the CookieService

  ```TypeScript
  import { CookieService } from 'angular2-cookie/services/cookies.service';
  ```

1. We are also going to give the ability to redirect if not an admin to the unauthorized route, so we need to import the Router as well

  ```TypeScript
  import { Router } from '@angular/router';
  ```

1. Before the @Injectable for the service, add a let variable to hold the cookie name to look for

  ```TypeScript
  let cookieName: string = "sails-tutorial-user";
  ```

1. Now we need to inject both the CookieService and Router into the constructor

  ```TypeScript
  constructor(private cookieService: CookieService,
    private router: Router) { }
  ```

1. Next we need to create 3 variables in the AuthenticationService class to hold if they are an admin, if the service is ready with the cookie, and what is the cookie name to use.  

  ```TypeScript
  private admin: boolean;
  private ready: boolean;  
  ```

Now we are ready to create our functions 

1. The first function we are creating is called getCookie and it is used to get a cookie from the CookieService

  ```TypeScript
  private getCookie(key: string) {
    return this.cookieService.get(key);
  }
  ```

1. Next we are going to create an isReady function that is used to determine if the cookie is avaiable yet.  It uses a promise to wait for the cookie to be ready.  This allows us to have our first page be an admin page and still be able to validate access with the cookie when it is ready.  

  ```TypeScript
  private isReady(): Promise<boolean> {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (typeof self.ready === 'undefined') {
        var intervalReady = setInterval(function () {
          if (self.getCookie(cookieName)) {
            clearInterval(intervalReady);
            self.ready = true;
            resolve(self.ready);
          }
        }, 250);
      }
      else {
        resolve(self._ready);
      }
    });
  }
  ```

1. Next we are going go create a function to check if the user is authorized which checks the cookie for the admin field to be true.  The functions is marked private as it is only called interally within the service.

  ```TypeScript
  private isAuthorized(key: string): boolean {
    var user = null;
    var authorized = false;
    var temp = this.getCookie(cookieName);

    if (typeof temp === "string") {
      user = JSON.parse(temp);
    }

    if (user && user.admin && /admin/.test(key)) {
      authorized = true;
    }

    return authorized;
  }
  ```

1. The last function is the one that will be exposed to the rest of the application as a public function.  It checks that the cookie is available and then checks that the admin field is true.  If the admin field is not true then it can redirect the user to the unauthorized route.

  ```TypeScript
  public isAdmin(withRedirect: boolean): Promise<boolean> {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (typeof self.admin === 'undefined') {
        return self.isReady().
          then(function (readyResult) {
            self.admin = self.isAuthorized('admin');
            if (!self.admin && withRedirect) {
              self.router.navigate(['/unauthorized']);
            }
            resolve(self.admin);
          });
      }
      else {
        resolve(self.admin)
      }
    });
  }
  ```

<div class="exercise-end"></div>


<h4 class="exercise-start">
  <b>Exercise</b>: Update AdminGuard to Use AuthenticationService
</h4>

1. Open the src\app\shared\guards\admin.guard.ts
1. You can remove the router import statement since we will not be using it directly in the AdminGuard anymore.

  ```TypeScript
  import { Router } from '@angular/router';
  ```
  
1. Import the AuthenticationService

  ```TypeScript
  import { AuthenticationService } from '../services/authentication.service';
  ```

1. Inject the AuthenticationService into the constructor

  ```TypeScript
  constructor(private authenticationService: AuthenticationService) { }
  ```

1. Replace the canActivate function with the following.  The function now returns a Promise<boolean> and calls the AuthenticationService isAdmin function with the flag to redirect to unauthorized if not an admin

  ```TypeScript
    canActivate(): Promise<boolean> {
    var isAdmin = this.authenticationService.isAdmin(true);
    return isAdmin;
  }
  ```

In order for the cookies to be available, we can't continue to use the localhost url since the browsers do not support cross domain cookies.  Typically, we do not have this issue since we would be running both the Angular and Sails APIs on your local development machines.  Luckily, we can get around this restriction on cross domain cookies, but changing how we run ng serve and the url that we use for the site.  

1. Stop the ng serve that you have running
1. Restart the ng serve command with the -H parameter along with any other parameters you were using before.  The -H 0.0.0.0 will make the web site available on your computer name.

  ```bash
  ng serve -H 0.0.0.0
  ```

  <div class="alert alert-danger" role="alert">Warning: By running with the -H other people can also get to your website by using your computer name and port number 4200</div>
  
1. If you navigate to http://??????/admin, you should be able to get into the admin component.  Right now the cookie that is returned from the UtilityService API call has the admin flag set to true.
  * Replace the "YourComputerName" in the above url with the actual name of your computer.  Find your computer name on Windows by using the VSCode integrated terminal and running the following powershell snippet

      ```bash
      $env:computername
      ```

1. If you open up the Chrome Developer Tools (press F12) and inspect the cookies, you will see 2 cookies, sails-tutorial-sid-default and sails-tutorial-user.  To get to the cookies, click on the Application tab, Expand Cookies under Storage, and click on the http://?????:4200 url.

  ![Cookies](images/cookies.png)
      
<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Test AdminGuard Unauthorized
</h4>

Since we are faking out the admin access control in order to do a tutorial that shows off being an admin and not an admin, we need to change the API that we are using to get the cookie from the API to another API endpoint that will return admin is false in the cookie.

1. Open the src\app\shared\services\utility.service.ts file
1. In the getApiBuild function, change the url that is used to 

  ```
  let url = apiUrl + '/version';
  ```

1. If you now navigate to or refresh http://?????:4200, you should get redirected to the unauthorized page

1. Make sure when you are done testing to change the url back to

    ```TypeScript
    let url = apiUrl + '/utility/version';
    ```

<div class="exercise-end"></div>
