## Header and footer

### Overview

In most web sites we have a header and footer at the top and bottom of the page respectively with our logo, navigation, and important links.  The header will contain our logo and navigation menu while the footer will contain our copyright info. 

### Goals

* Understand how to create a new component
* Understand how to include components inside of other components
* Understand how to utilize Bootstrap 

### Create Header Component 

<h4 class="exercise-start">
    <b>Exercise</b>: Creating the header component
</h4>

We can leave ng serve running while we make these changes and open up another Integrate Terminal for the commands below.

1. Open the VSCode Integrated Terminal and run the ng generate command to create the header component in the shared folder

    ```bash
    ng generate component shared/header
    ```

1. The generate command will create 4 files: 

    ![output of generate](images/header-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * added a reference to the component in the app.module.ts file.

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add the Menu 
</h4>

1. Open the src\app\shared\header.component.html file

    ```bash
    header.component.html
    ```

1. Replace the contents with the following. 

    ```html
    <header>
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
            <a class="navbar-brand" [routerLink]="['/']"><img class="navbar-logo" src="./assets/todo_logo.png" alt="Logo"></a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" [routerLink]="['/']">All Items</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" [routerLink]="['/unknown']">"Unknown"</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" [routerLink]="['/login']">Login</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" [routerLink]="['/signup']">Signup</a>
                </li>
            </ul>
            </div>
        </nav>
    </header>
    ```

1. Right-click on the logo below and save it to the src/assets folder of our project

    ![Logo](images/todo_logo.png)

<div class="exercise-end"></div>

### Display Header 

<h4 class="exercise-start">
    <b>Exercise</b>: Update Main page
</h4>

Now that we have created the menu, we need to add it to the app component so that it shows on every page. 

One of the really cool things that we can do with components is include them inside of other components.  This makes it very easy to create reusable components.  


1.  Open the src\app\app.component.ts file 

    ```bash
    app.component.ts
    ```

1. Import the header component.  Add the import statement on line 2 right below the existing import statement.

    ```TypeScript
    import { HeaderComponent } from './shared/header/header.component';
    ```    

1. Open the src\app\app.component.html file

    ```bash
    app.component.html
    ```

1.  Add the app-header to the top of the html code

    ```html
    <app-header></app-header>
    ```

1.  If you view the web page you should see the header with logo, the menu and our banner.  To make it easy to navigate between the routes we have created, we added all of them to the menu.  Normally you would only add the ones that a user should directly get to by clicking on a link.

    ![App Component with Header View](images/header-view.png)

    <div class="alert alert-info" role="alert">  To make it easy to navigate between the routes we have created, we added all of them to the menu.  Normally you would only add the ones that a user should directly get to by clicking on a link.</div>

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Make Menu Responsive
</h4>

Since we are not including JQuery in our application, when the Bootstrap menu the collapse button does not open up the menu.  To make the menu open we are going to use the Collapse component from the ng-bootstrap library.

1. Open src\app\shared\header\header.component.ts

    ```bash
    header.component.ts
    ```

1. Create a variable named isCollapsed that is a boolean and set to false.  This will be used tdo hold if the menu is collapsed or not.

    ```TypeScript
    isCollapsed: boolean = true;
    ```

1. Create a function to toggle the menu named toggleMenu that sets isCollapsed set to the opposite of its current value

    ```TypeScript
    toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
    }
    ```

1. Open up the src\app\shared\header\header.component.html

    ```bash
    header.component.html
    ```

1. To the button add a click event call to the toggleMenu function

    ```html
    (click)="toggleMenu()"
    ```

1. To each link with a nav-link class add a click event that calls toggleMenu

    ```html
    (click)="toggleMenu()"
    ```

1. Onto the div with the collapse class you need to add an `[ngbCollapse]` tag that is set to the isCollapsed variable

    ```html
    [ngbCollapse]="isCollapsed"
    ```

1. Now if you shrink the browser small enough the collapsed menu will show up.  When you click on the menu icon or any of the links within the menu it will toggle the collapse state of the menu.


<div class="exercise-end"></div>

### Create Footer

Creating the footer is very similar to creating the header.  The biggest difference is that we have some css styling that we will apply to position the footer at the bottom of the page and shrink the body height so that text does not get stuck behind the footer.

<h4 class="exercise-start">
    <b>Exercise</b>: Creating the footer component
</h4>


1. In the Integrated Terminal, run the ng generate command to create the header component

    ```bash
    ng generate component shared/footer
    ```

1. The generate command will create 4 files: 

    ![Generate Output](images/footer-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * add reference to the component in the app.module.ts file.

<div class="exercise-end"></div>    


<h4 class="exercise-start">
    <b>Exercise</b>: Footer UI
</h4>

1. Open src\app\shared\footer\footer.component.html

    ```bash
    footer.component.html
    ```

1. Replace the contents with

    ```
    <footer>
        <div class="pull-left">
            &copy;Angular WS
        </div>
    </footer>
    ```

<div class="exercise-end"></div>    

<h4 class="exercise-start">
    <b>Exercise</b>: Styling the Footer
</h4>

We want to postion the footer at bottom of the page and change the background color.  

1. Open src\app\footer\footer.component.scss file

    ```bash
    footer.component.scss
    ```

1. Add the following to make the footer at the bottom of the page with a height of 50px, a gray background and some padding around the div

    ```scss
    @import "../../../assets/bootstrap/variables.scss";

    footer {
        position: fixed;
        height: 50px;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 10px 5px;
        border-top: 1px solid $gray-light;
        background-color: $gray-lighter;
        font-size: 0.8em;
        color: $dark-blue;
        div {
            margin-left: 25px;
            margin-right: 25px;
        }
    }
    ```

<div class="exercise-end"></div>

### Display Footer

<h4 class="exercise-start">
    <b>Exercise</b>: Update Main page
</h4>

Now we are ready to add our footer to the Main page


1.  Open the src\app\app.component.ts file

    ```bash
    app.component.ts
    ```

1.  We need to import the FooterComponent before we can use it on the Main Page which is our AppComponent

    ```TypeScript
    import { FooterComponent } from './shared/footer/footer.component';
    ```    

1.  Now we can add the `<app-footer>` tag in the src\app\app.component.html

    ```bash
    app.component.html
    ```

1. Add the `<app-footer>` at the bottom of the html

    ```html
    <app-footer></app-footer>
    ```

1.  If you view the web page you should see the footer 

    ![App Works with Footer](images/footer-view.png)

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Fixing body height
</h4>

Since we have a static footer, will need to change the body height to account for the footer height.  Without doing this the body content will be hidden for the last 50px of the screen like it is currently doing if you have any todo items in your list.

Up to this point, we have only been dealing with component level styles.  For the body height, we want it to apply to the whole site.  We can do this by putting the styling in the src\style.scss file


1. Open the src\style.scss file

    ```bash
    style.scss
    ```

1. Add the following css code to adjust the body height.  We are going an extra 10 pixels in height to give a little bit of padding around the text in the footer.

    ```html
    html {
        position: relative;
        height: auto;
        min-height: 100%;
    }

    body {
        position: static;
        height: auto;
        margin: 0 0 60px; /* bottom = footer height */
    }
    ```

<div class="exercise-end"></div>
  
<h4 class="exercise-start">
    <b>Exercise</b>: Add Environment Name to Footer
</h4>

Earlier we created an environment name variable in the different Angular environment files.  Wouldn't it be nice if we displayed which environment we were in within the footer.

1. Open the src\app\shared\footer\footer.component.ts file 

    ```bash
    footer.component.ts
    ```

1. Import the environment into the file on line 2 right below the Angular core import

    ```TypeScript
    import { environment } from '../../../environments/environment';
    ```

1. Inside the FooterComponent class we to add a variable to capture the environment name that Angular is running in

    ```TypeScript
    public env = environment.environmentName;
    ```        

Now we can display the env variable in our footer's html

1. Open the src\app\shared\footer\footer.component.html file

    ```bash
    footer.component.html
    ```
    
1. After the "Angular WS" div but instead the footer tag add the following to display the env value

    ```
    <div class="pull-right">
        env: {{ env }}
    </div>
    ```

1.  If you view the web page you should see the footer 

    ![App Works with Footer](images/footer-with-env.png)

    <div class="alert alert-warning" role="alert">Notice that the env:Local in the footer is coming from the environment.local.ts file.  If you stop `ng serve` and run it without using the `-e local ` argument, the env value will change to Development

        ![footer development env](images/footer-with-env-dev.png)
        
    </div>

<div class="exercise-end"></div>  

### Review

In this chapter will learned:

1. How to create new components
1. How to import and use components within other components
1. Learned about component level styles so that they only apply to a single component
1. Learned how to do global styles that apply to the whole site
1. Learned that if we have a static footer that we need to adjust the body margin height to stop content for being hidden behind the footer.
1. Learned that the `<router-outlet></router-outlet>` tag is used to tell Angular the location within the html code to render the routed component's template (html)
