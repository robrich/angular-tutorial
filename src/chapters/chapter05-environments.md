## Environment Configuration

### Overview

One of the requirements that you commonly have it to be able to change configurations for your application based on the environment it is running in.  A common configuration is to change the API url between development and production.  In order to change the configurations for different environments, Angular uses configurations files that are stored in the src\environments folder.  

### Goals

* Learn how to change configurations per environment
* Implement environment configurations

### Default Configuration

The src\environments\environment.ts file is the default configurations if no environment is specified when running `ng serve`

In the environment.ts we need to add the environmentName and apiBaseUrl values.  The apiBaseUrl is how to get to your service layer, if you have one.  For now we are going to use http://localhost:3000.

<h4 class="exercise-start">
    <b>Exercise</b>: Setup Default Configuration
</h4>

1. Open the src\environments\environment.ts file
1. Add the environmentName and apiBaseUrl values.  

    ```TypeScript
    export const environment = {
        production: false,
        environmentName: 'Development',
        apiBaseUrl: 'http://localhost:3000'
    };
    ```

1. Go to the terminal that is running the `ng serve` command and do a ctrl+c to stop it.
1. Run the `ng serve` command again.

    ```bash
    ng serve
    ```

1. Everything should still start as normal.  You will not see any changes at this point since nothing is using those settings.  We will use them in a bit in our footer and our services.

<div class="exercise-end"></div>

### Local Development

The other environment that is typically created is for local development on your machine.  For this tutorial the environment.ts and local.ts have the same values but once you go from development to production they will differ.   

<h4 class="exercise-start">
    <b>Exercise</b>: Create Local Configuration
</h4>

1. Create the file src\environments\environment.local.ts file
1. Add the following to the environment.local.ts file

    ```TypeScript
    export const environment = {
    production: false,
    environmentName: 'Local',
    apiBaseUrl: 'http://localhost:3000'
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

1. If the Angular compile was successful, you will now be using the local environment configuration. You will not see any changes at this point since nothing is using those settings.  We will use them in the next exercise in our footer.

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

    <div class="alert alert-warning" role="alert">
        Notice that the env:Local in the footer is coming from the environment.local.ts file.  If you stop `ng serve` and run it without using the -e argument, the env value will change to Development

        ![footer development env](images/footer-with-env-dev.png)
        
    </div>

<div class="exercise-end"></div>    

<h4 class="exercise-start">
    <b>Exercise</b>: Updating Services With Environment Url
</h4>

Now that we have the API url in the environments file, we should update the TodoService and AuthService to get the base url from the environments file instead of having it hard coded.  While we are at it, we should also create a variable in the services to hold the base url so that we don't have it all over the place in the services.

1. Open the src\app\shared\services\todo.service.ts file
1. Import the environment file

    ```TypeScript
    import { environment } from '../../../environments/environment';
    ```

1. Create a private variable called url inside the TodoService class that gets the apiBaseUrl from the environment file and append on the /todo

    ```TypeScript
      private url: string = `${environment.apiBaseUrl}/todo`;
    ```

1. For the save and getAll functions update the hard coded url to use the class level url variable.  You will need to change url to this.url in order to access the class level variable.

1. For the updateTodo and deleteTodo we need to replace the hard coded url with the class level url variable.  Since we are already using string interpolation to create the string, we need to replace the hard coded value with `${this.url}`

    ```TypeScript
    let url = `${this.url}/${todo.id}`;
    ```

1. Everything should still work to list, insert, update and delete todo items as before but now the url is no longer hard coded and can easily be changed as you move to different environments.

1. Now repeat the same process with the AuthService


<div class="exercise-end"></div>
