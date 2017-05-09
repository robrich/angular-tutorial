## Environment Configuration

### Overview

One of the requirements that you commonly have it to be able to change configurations for your application based on the environment it is running in.  A common configuration is to change the API url between development and production.  In order to change the configurations for different environments, Angular uses configurations files that are stored in the src\environments folder.  

### Goals

### Default Configuration

The src\environments\environment.ts file is the default configurations if no environment is specified when running `ng serve`

In the environment.ts we need to add the environmentName and apiBaseUrl values.  The apiBaseUrl is how to get to your service layer, if you have one.  For now we are going to use localhost:1337/v1.

<h4 class="exercise-start">
    <b>Exercise</b>: Setup Default Configuration
</h4>

1. Open the src\environments\environment.ts file
1. Add the environmentName and apiBaseUrl values.  

    ```TypeScript
    export const environment = {
        production: false,
        environmentName: 'Development',
        apiBaseUrl: 'http://localhost:1337/v1'
    };
    ```

1. Go to the terminal that is running the `ng serve` command and do a ctrl+c to stop it.
1. Run the `ng serve` command again.

    ```bash
    ng serve
    ```

1. Everything should still start as normal.  You will not see any changes at this point since nothing is using those settings.  We will use them when we create our footer.

<div class="exercise-end"></div>

### Local Development

The other environment that is typically created is for local development on your machine.  For this tutorial the environment.ts and local.ts have the same values but once you go to development and production they will differ.   

<h4 class="exercise-start">
    <b>Exercise</b>: Create Local Configuration
</h4>

1. Create the file src\environments\environment.local.ts file
1. Add the following to the environment.local.ts file

    ```TypeScript
    export const environment = {
    production: false,
    environmentName: 'Local',
    apiBaseUrl: 'http://localhost:1337/v1'
    };
    ```

1. Open the .angular-cli.json that is in the root of the project.  
1. Find the apps\environments section and add the local configuration to the at the top of the list of environments

    ```json
    "local": "environments/environment.local.ts",
    ```

1. If you want to run the local configuration we need to pass in the environment command line argument.  The environment argument value is the name of the environment name in the angular-cli.json file.  Note that you can only have 1 ng serve running at a time.    

    ```bash
    ng serve -e local
    ```

1. If the webpack compile was successful, you will now be using the local environment configuration. You will not see any changes at this point since nothing is using those settings.  We will use them when we create our footer.

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Environment Name to Footer
</h4>

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
            &copy;Angular WS
        </div>
    </footer>
    ```

1.  If you view the web page you should see the footer 

    ![App Works with Footer](images/footer-development.png)

    <div class="alert alert-warning" role="alert">
        Notice that the env:Local in the footer is coming from the environment.local.ts file.  If you stop `ng serve` and run it without using the -e argument, the env value will change to Development

        ![footer development env](images/footer-development.png)
        
    </div>

<div class="exercise-end"></div>    

