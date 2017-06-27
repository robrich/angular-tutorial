## Bootstrap

### Overview

For our styling we are going to use [Bootstrap 4](https://v4-alpha.getbootstrap.com/) which is still in alpha.  The reason for picking Bootstrap 4 and not Bootstrap 3 is so that you will be able to use the [Angular UI library](https://ng-bootstrap.github.io) if you so choose.  We will not be using the Angular UI library in this workshop but it is a great library for component.  If you are a Bootstrap 3 developer, you can see all of the change in the [Migration Guide](https://v4-alpha.getbootstrap.com/migration/). 

### Goals

* Understand how to include Bootstrap 4 into your project

### Install Bootstrap

<h4 class="exercise-start">
    <b>Exercise</b>: Install Bootstrap
</h4>

1. In the VS Code Integrated Terminal, click the + to open a 2nd terminal
1. Run the npm install command for bootstrap and font-awesome

    ```bash
    npm install --save bootstrap@next font-awesome
    ```

<div class="exercise-end"></div>

### Add Bootstrap to Project

<h4 class="exercise-start">
    <b>Exercise</b>: Add  Bootstrap to Project
</h4>

First we need to create our own custom Bootstrap style sheet so that we can override the scss variables if we want to with your own colors and styles.

1. In the src\assets folder, create a new folder named **bootstrap**

      <div class="alert alert-info" role="alert">You can create folder right in Visual Studio Code by right-click on the src\assets folder</div>

    ```bash
    bootstrap
    ```

1. In the bootstrap folder, create a file called **_variables.scss**

      <div class="alert alert-info" role="alert">You can create file right in Visual Studio Code by right-click on the src\assets folder</div>

    ```bash
    _variables.scss
    ```

1. Add the following to the _variables.scss file

    ```scss
    // Variables
    // Colors
    //
    // Grayscale and brand colors for use across Bootstrap.
    $dark-blue: #003C71;

    // Start with assigning color names to specific hex values.
    $white:  #fff !default;
    $black:  #000 !default;
    $red:    #d9534f !default;
    $orange: #f0ad4e !default;
    $yellow: #ffd500 !default;
    $green:  #5cb85c !default;
    $blue:   #0275d8 !default;
    $teal:   #5bc0de !default;
    $pink:   #ff5b77 !default;
    $purple: #613d7c !default;

    // Create grayscale
    $gray-dark:                 #292b2c !default;
    $gray:                      #464a4c !default;
    $gray-light:                #636c72 !default;
    $gray-lighter:              #eceeef !default;
    $gray-lightest:             #f7f7f9 !default;

    // Reassign color vars to semantic color scheme
    $brand-primary:             $blue !default;
    $brand-success:             $green !default;
    $brand-info:                $teal !default;
    $brand-warning:             $orange !default;
    $brand-danger:              $red !default;
    $brand-inverse:             $gray-dark !default;
    ```

1. In the bootstrap folder, create a file called **bootstrap.scss**

    ```bash
    bootstrap.scss
    ```

1. Add the following contents to the bootstrap.scss file. 

      <div class="alert alert-info" role="alert">Note that the list of included files outside of the variables file is the same as the ones in the  node_modules\bootstrap\scss\bootstrap.scss file with a ~bootstrap/scss prefix so that the scss compiler is able to find the included file in the node_modules\bootstrap\scss directory.</div>

    ```scss
    @import "variables";

    @import "~bootstrap/scss/variables";
    @import "~bootstrap/scss/mixins";
    @import "~bootstrap/scss/custom";

    // Reset and dependencies
    @import "~bootstrap/scss/normalize";
    @import "~bootstrap/scss/print";

    // Core CSS
    @import "~bootstrap/scss/reboot";   
    @import "~bootstrap/scss/type";
    @import "~bootstrap/scss/images";
    @import "~bootstrap/scss/code";
    @import "~bootstrap/scss/grid";
    @import "~bootstrap/scss/tables";
    @import "~bootstrap/scss/forms";
    @import "~bootstrap/scss/buttons";

    // Components
    @import "~bootstrap/scss/transitions";
    @import "~bootstrap/scss/dropdown";
    @import "~bootstrap/scss/button-group";
    @import "~bootstrap/scss/input-group";
    @import "~bootstrap/scss/custom-forms";
    @import "~bootstrap/scss/nav";
    @import "~bootstrap/scss/navbar";
    @import "~bootstrap/scss/card";
    @import "~bootstrap/scss/breadcrumb";
    @import "~bootstrap/scss/pagination";
    @import "~bootstrap/scss/badge";
    @import "~bootstrap/scss/jumbotron";
    @import "~bootstrap/scss/alert";
    @import "~bootstrap/scss/progress";
    @import "~bootstrap/scss/media";
    @import "~bootstrap/scss/list-group";
    @import "~bootstrap/scss/responsive-embed";
    @import "~bootstrap/scss/close";

    // Components w/ JavaScript
    @import "~bootstrap/scss/modal";
    @import "~bootstrap/scss/tooltip";
    @import "~bootstrap/scss/popover";
    @import "~bootstrap/scss/carousel";

    // Utility classes
    @import "~bootstrap/scss/utilities";

    /*
    * Font Awesome 4.x
    */
    $fa-font-path: "~font-awesome/fonts";
    @import "~font-awesome/scss/font-awesome";

    ```


Now we need to configure the angular cli to import the bootstrap libraries.  

1. Open the **.angular-cli.json** file that is in the root of the project.  This file  is the configuration file for our project for the Angular CLI 

    <div class="alert alert-info" role="alert">In Visual Studio Code you can quickly open a file by using ctrl+p to open the "Go To File" prompt and typing in the file name</div>

    ```bash
    .angular-cli.json
    ```

1. Find the apps\styles section and replace the section with:  

    ```TypeScript
      "styles": [
        "assets/bootstrap/bootstrap.scss",
         "styles.scss"
      ],
    ```

      <div class="alert alert-info" role="alert">If the code alignment upon paste is off you can run the "Format Document" command to fix it.  Ctrl+Shift+P and search for "Format Document" or use Alt+Shift+F</div>

<div class="exercise-end"></div>

### Add Banner Section to Top

<h4 class="exercise-start">
    <b>Exercise</b>: Add Banner To Top of Page
</h4>

1. Open src\app\app.component.html

    ```bash
    app.component.html
    ```
    
1. Replace the contents with:

    ```html
    <div class="jumbotron">
        <div class="container">
            <h1>{{title}}</h1>
        </div>
    </div>
    <div class="container">
        <router-outlet></router-outlet>
    </div>
    ```

2. Lets change the title to something better than "App Works!"

    * Open the src\app\app.component.ts file
    * On line 9, change the title variable to

        ```TypeScript
        title = 'Our Awesome Todo App!';
        ```

<div class="exercise-end"></div>

### View Changes

<div class="alert alert-danger" role="alert">Since we already had ng serve running, it picked up the html changes but you will notice that there is no styling.  This is because whenever you change the .angular-cli.json file, you need to restart ng serve before they take effect.</div>

<h4 class="exercise-start">
    <b>Exercise</b>: Restart ng serve
</h4>

1. Go to the integrated terminal in Visual Studio Code that is running the `ng serve` command and do a ctrl+c to stop it.

    > There is a dropdown on the right side of the Visual Studio Code integrated terminal that allows you to change to the other terminals that are currently open for your project

1. Run the `ng serve` command again.

    ```bash
    ng serve
    ```

1. The web page should now look like

    ![App Works with Bootstrap](images/bootstrap-jumbotron.png)

<div class="exercise-end"></div>

### Review

In this chapter we learned how to use Bootstrap for our project.  

Learned:

1. How to install Bootstrap 4 and font-awesome
1. How to integrate it into the Angular CLI in the .angular-cli.json file
1. How to create our own custom Bootstrap SCSS variables to override the built-in styles of Bootstrap with our own colors
1. How to create a banner at the top of the page
1. How to change the text that appears in the banner using our TypeScript title variable
1. Learned that when you modify the .angular-cli.json file that you have to restart `ng serve` for the changes to take effect
