## Header and footer

In most web sites we have a header and footer at the top and bottom of the page respectively.  The header will contain our logo and menu while the footer will contain our copyright info. 


### Create Header Component 

<h4 class="exercise-start">
    <b>Exercise</b>: Creating the header component
</h4>

We can leave ng serve running while we make these changes and open up another Integrate Terminal for the commands below.

1. In the Integrated Terminal, click the + to open a 2nd terminal
1. Create the directory src\app\shared

    ```
    mkdir src\app\shared
    ```

1. Run the ng generate command to create the header component

    ```bash
    ng generate component shared\header
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

Open the src\app\shared\header.component.html file and replace the contents with the following. 

```html
<header>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- App name and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
        <img class="navbar-logo" src="./add-images.png" alt="Logo">
        <span><a [routerLink]="['/']" class="navbar-brand">Todo</a></span>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="nav navbar-nav navbar-right">

        </ul>
      </div>
    </div>
  </nav>

</header>
```

<div class="exercise-end"></div>

### Display Header 

<h4 class="exercise-start">
    <b>Exercise</b>: Update Main page
</h4>

Now that we have created the menu, we need to add it to our rendered view.  

1.  In the src\app\app.component.ts we also need to import the header component in order to use the app-header html element.  Add the import statement on line 2 right below the existing import statement.

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

1.  If you view the web page you should see the header with logo, the Todo title and home icon.

    ![App Component with Header View](images/header-view.png)


<div class="exercise-end"></div>

### Create Footer

<h4 class="exercise-start">
    <b>Exercise</b>: Creating the footer component
</h4>

1. In the Integrated Terminal, run the ng generate command to create the header component

    ```bash
    ng generate component shared\footer
    ```

1. The generate command will create 4 files: 

    ![Generate Output](images/footer-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * add reference to the component in the app.module.ts file.

1. Open the src\app\shared\footer\footer.component.ts file and import the environment into the file on line 2 right below the Angular core import

    ```TypeScript
    import { environment } from '../../../environments/environment';
    ```

1. Inside the FooterComponent class we to add a variable to capture the environment name that Angular is running in

    ```TypeScript
    public env = environment.environmentName;
    ```        

1. Open the src\app\shared\footer\footer.component.html and replace the contents with

    ```
    <footer>
        <div class="pull-right">
            env: {{ env }} 
        </div>
        <div class="pull-left">
            &copy;GDI
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
@import "bootstrap-variables.scss";

footer {
    position: fixed;
    height: 35px;
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

Now that we have created the menu, we need to add it to our rendered view.  


1.  In the src\app\app.component.ts we also need to import the header component in order to use the app-header html element.  Add the import after the HeaderComponent import statement

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

    <div class="alert alert-warning" role="alert">
        Notice that the env:Local in the footer is coming from the environment.local.ts file.  If you stop `ng serve` and run it without using the -e argument, the env value will change to Development

        ![footer development env](images/footer-development.png)
        
    </div>

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Fixing body height
</h4>

Since we have a static footer, will need to change the body height to account for the footer height.  Without doing this the body content will be hidden for the last 50px of the screen.

So far we have seen how to use component level css but Angular still has the ability to do global styles by adding them into the src\style.scss file.

1. Open the src\style.scss file and add the following css 

    ```html
    html {
        font-family: $font-family-sans-serif !important;
        position: relative;
        height: auto;
        min-height: 100%;
    }

    body {
        position: static;
        height: auto;
        margin: 0 0 50px; /* bottom = footer height */
    }
    ```

<div class="exercise-end"></div>
