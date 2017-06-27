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

1. In the VS Code Integrated Terminal, click the + to open a 2nd terminal
1. Run the ng generate command to create the header component

    ```bash
    ng generate component shared/header
    ```

1. The generate command will create 4 files: 

    ![output of generate](images/header-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * add reference to the component in the app.module.ts file.

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add the Menu 
</h4>

<div class="alert alert-warning" role="alert">This is a sample menu that includes a few links and a sub-menu dropdown.  Note that none of the links will work since we have not created any of those other pages or routes.</div>

1. Open the src\app\shared\header.component.html file and replace the contents with the following. 

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

Now that we have created the menu, we need to add it to our rendered view.  

1.  Open the src\app\app.component.ts file 
1. Import the header component.  Add the import statement on line 2 right below the existing import statement.

    ```TypeScript
    import { HeaderComponent } from './shared/header/header.component';
    ```    

1. Open the src\app\app.component.html file and replace the contents of this file with the following html.  

    ```html
    <app-header></app-header>
    <div class="jumbotron">
        <div class="container">
            <h1>{{title}}</h1>
        </div>
    </div>
    <div class="container clearfix">
        <router-outlet></router-outlet>
    </div>
    ```

    <div class="alert alert-info" role="alert">**Note:** that the router-outlet tag is how Angular knows where to put the content of each of the views.</div>

1.  If you view the web page you should see the header with logo, "All Items" menu and our banner.

    ![App Component with Header View](images/header-view.png)


<div class="exercise-end"></div>

### Create Footer

Creating the footer is very similar to creating the header.  The biggest difference is that we have some css styling that we will apply to position the footer at the bottom of the page.  

The really awesome part of the css we are going to apply is that Angular has the concept of CSS encapsulation so the styling will only apply to the footer component and not to the rest of the site.  This gets automatically implemented for us, just by putting the styling in the footer components scss file instead of using th global style.scss file.


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

1. Open the src\app\shared\footer\footer.component.html and replace the contents with

    ```
    <footer>
        <div class="pull-center">
            &copy;Angular WS
        </div>
    </footer>
    ```

<div class="exercise-end"></div>    

<h4 class="exercise-start">
    <b>Exercise</b>: Styling the Footer
</h4>

We want to postion the footer at bottom of the page and change the background color.  With Angular 2, we now have the ablity to have css constrained to an individual component like the footer instead of being global for the whole site to use.  We still have the ability to have global css for those styles that should be applied to the whole site by using the src\styles.scss file.  


Since the footer is in the src\app\shared\footer\footer.component.html file we need to add the footer styles to the src\app\footer\footer.component.scss file and add the following content

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


1.  Open the src\app\app.component.ts file and import the footer component below the HeaderComponent import statement (note: order is not important)

    ```TypeScript
    import { FooterComponent } from './shared/footer/footer.component';
    ```    

1. Open the src\app\app.component.html file and replace the contents of this file with the following html

    ```html
    <app-header></app-header>
    <div class="jumbotron">
        <div class="container">
            <h1>{{title}}</h1>
        </div>
    </div>
    <div class="container clearfix">
        <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>

    ```

1.  If you view the web page you should see the footer 

    ![App Works with Footer](images/footer-view.png)

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Fixing body height
</h4>

Since we have a static footer, will need to change the body height to account for the footer height.  Without doing this the body content will be hidden for the last 50px of the screen.

So far we have seen how to use component level css but Angular still has the ability to do global styles that will apply to the whole by adding them into the src\style.scss file.

1. Open the src\style.scss file and add the following css 

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

1. Open the src\app\shared\footer\footer.component.html file

    ```bash
    footer.component.html
    ```
    
1. Replace the contents with

    ```
    <footer>
        <div class="pull-left">
            &copy;Angular WS
        </div>
        <div class="pull-right">
            env: {{ env }} 
        </div>      
    </footer>
    ```

1.  If you view the web page you should see the footer 

    ![App Works with Footer](images/footer-with-env.png)

    <div class="alert alert-warning" role="alert">Notice that the env:Local in the footer is coming from the environment.local.ts file.  If you stop `ng serve` and run it without using the -e argument, the env value will change to Development

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
