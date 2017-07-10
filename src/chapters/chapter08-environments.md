## Environment Configuration

### Overview

So far we have been hard coding our API url into our services which means we have the base url in multiple places.  Instead we should be using a configuration file that stores the API in one place and allows us to use it anywhere in the application.  Luckily, Angular comes with environment configuration files that allow us to do just that.  

The different environment configurations are stored in the src\environments folder.

### Goals

* Learn how to change configurations per environment
* Implement environment configurations

### Code from Previous Chapter

<div class="alert alert-danger" role="alert">Skip this section if you completed the previous chapter</div>

If you have not completed the previous chapter you can get the completed code by downloading the code from Github.

<h4 class="exercise-start">
    <b>Exercise</b>: Downloading Code 
</h4>

1. Downloading and extracting the zip file into your projects folder (c:\projects or ~/projects) at [https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-lock-down-routes.zip](https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-lock-down-routes.zip) 
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

### Default Configuration

The src\environments\environment.ts file is the default configurations if no environment is specified when running `ng serve`

In the environment.ts we need to add the environmentName and apiBaseUrl values.  The apiBaseUrl is the  base url for our API and the environment name is an easy recognizable name for the environment.

<h4 class="exercise-start">
    <b>Exercise</b>: Setup Default Configuration
</h4>

1. Open the src\environments\environment.ts file

    ```bash
    environment.ts
    ```

1. Add the environmentName and apiBaseUrl values to the environment object.  

    ```TypeScript
    environmentName: 'Development',
    apiBaseUrl: 'https://dj-sails-todo.azurewebsites.net'
    ```
1. The environment object should look like the following

    ```TypeScript
    export const environment = {
        production: false,
        environmentName: 'Development',
        apiBaseUrl: 'https://dj-sails-todo.azurewebsites.net'
    };
    ```

<div class="exercise-end"></div>

### Local Development

The other environment that is typically created is for local development on your machine.  For this tutorial the environment.ts and local.ts have the same values but once you go from development to production they will differ.   

<h4 class="exercise-start">
    <b>Exercise</b>: Create Local Configuration
</h4>

1. Create the file src\environments\environment.local.ts file by right-clicking on the src\environments directory and selecting new file

    ```bash
    environment.local.ts
    ```

1. Add the following to the environment.local.ts file

    ```TypeScript
    export const environment = {
        production: false,
        environmentName: 'Local',
        apiBaseUrl: 'https://dj-sails-todo.azurewebsites.net'
    };
    ```

1. In order to use the environment.local.ts file we need to tell the Angular CLI that it exist by adding it to the environments section of the .angular-cli.json that is in the root of the project.  

    ```bash
    .angular-cli.json
    ```

1. Find the apps\environments section and add the local configuration to the at the top of the list of environments)

    ```json
    "local": "environments/environment.local.ts",
    ```

    <div class="alert alert-info" role="alert">Note that the order of the environments is not important</div>

1. The environments section should look like

    ```TypeScript
      "environments": {
        "local": "environments/environment.local.ts",
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
      ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Updating Services With Environment Url
</h4>

Now that we have the API url in the environments file, we need update the TodoService and AuthService to use the base url from the environments file instead of having it hard coded.  We should also create a variable in each of the services to hold the base url so we don't have it all over the place in the services.

1. Open the src\app\shared\services\todo.service.ts file

    ```bash
    todo.service.ts
    ```

1. Import the environment file

    ```TypeScript
    import { environment } from '../../../environments/environment';
    ```

1. Create a private variable called url inside the TodoService class that gets the apiBaseUrl from the environment file and append on the /todo

    ```TypeScript
      private url: string = `${environment.apiBaseUrl}/todo`;
    ```

1. For the save and getAll function update the hard coded url to use the class level url variable.  Don't forget due to scoping that you need to access the variable by using this.url 

    ```TypeScript
    this.url
    ```

1. For the updateTodo and deleteTodo we need to replace the hard coded url with the class level url variable.  Since we are already using string interpolation to create the string, we need to replace the hard coded value with `${this.url}`

    ```TypeScript
    let url = `${this.url}/${todo.id}`;
    ```

1. Everything should still work to list, insert, update and delete todo items as before but now the url is no longer hard coded and can easily be changed as you move to different environments.

1. Now repeat the same process with the AuthService

    ```bash
    auth.service.ts
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Testing Configurations
</h4>

#### Default

If an environment is not passed into the ng serve command, then it will default to using the environment.ts file

1. Go to the terminal that is running the `ng serve` command and do a ctrl+c to stop it.
1. Run the `ng serve` command again.

    ```bash
    ng serve
    ```

1. Everything should still start as normal.  You will not see any changes at this point since nothing is using those settings.  We will use them in a bit in our footer and our services.

#### Local

If you want to run the local configuration we need to pass in the environment command line argument.  The environment argument value is the name of the environment name in the angular-cli.json file.  Note that you can only have 1 ng serve running at a time.    

1. Go to the terminal that is running `ng serve` and do a ctrol+c to stop it
1. Run the `ng serve` command with the -e and specify the local environment

    ```bash
    ng serve -e local
    ```

1. If the Angular compile was successful, you will now be using the local environment configuration. Since our API urls are the same between files you will not see any difference at this time.  In the Header and Footer chapter we will add a footer that displays the environment name.

<div class="exercise-end"></div>
