## Create New Project

### Overview

In this chapter we will be creating our project with the Angular CLI.  We will use this project throughout the workshop.

### Goals

* Understand how to create a new project
* Understand how to find help for an Angular CLI command
* Understand the project layout
* Understand how to run the project

### Generate New Project

The project that the Angular CLI create for you follows all of the suggested standards and has webpack for bundling built-in to it.    

<h4 class="exercise-start">
    <b>Exercise</b>: Create Angular Project
</h4>

1. Open a command prompt
1. Navigate to where you want to store your project files.  I use c:\projects on Windows and ~/projects on OSx.  You are free to use anywhere that you want. 
    
    * Windows:

        ```bash
        cd \ 
        ```
    * OSx:

        ```bash
        cd ~/
        ```

1. Create the projects directory.  If you already have a directory that you store your projects in then you can skip this step.

    ```bash
    mkdir projects
    ```

1. Navigate into the projects directory

    ```bash
    cd projects
    ```
    
1. Generate a project named ngws that uses scss for styling and includes a routing file by running

    ```bash
    ng new ngws --style scss --routing
    ```

    **Sample Output:**
    ![ng new](images/ng-new.png)

1. If you want to see the other ng new options or any Angular CLI command append the --help

    ```bash
    ng new --help
    ```
    
<div class="exercise-end"></div>


### Opening Project in Visual Studio Code
1. Open Visual Studio Code
1. Click File -> Open Folder...
1. Navigate to angular-tutorial directory and click Select Folder 
1. Your project should now be opened in Visual Studio Code

    ![Project Layout](images/project-layout.png)


### Running Project


<h4 class="exercise-start">
    <b>Exercise</b>: Run the project
</h4>

The Angular CLI has a built-in command for starting up a web server for your project called `ng serve` which will run webpack to bundle up your code, start the web server, rebuild on file changes (watch) and refresh connected browsers (live reload).

1. Visual Studio Code has a built-in terminal that we can use to run our commands.  On Windows, this is a powershell prompt.  To open the Integrated Terminal go under the View Menu and click on the Integrate Terminal or press Ctrl+`
    * You are free to use the regular command prompt outside of Visual Studio Code if you would like
1. Run

    ```bash
    ng serve
    ```

    ![ng serve output](images/ng-serve.png)

    <div class="alert alert-info" role="alert">The ng serve command will stay running in order to provide live reloading functionality.  If you need to stop ng serve, press ctrl+c</div>

1. If you launch your browser and navigate to http://localhost:4200, you will see a page that looks like

    ![app works](images/appworks.png)
    
<div class="exercise-end"></div>

###  Navigating around Visual Studio Code 

Being able to effectively use your editor is key to being a super productive developer.  With Visual Studio Code, there are several shortcut keys that will help you out.

| Purpose | Key |
| ---- | ---- |
| Integrated Terminal | ctrl+` |
| Open File | ctrl+p |
| Switch Between Files | ctrl+tab |
| Switch Between Files Reverse | ctrl+shift+tab |
| Hide Side Menu | ctrl+b |
| Toggle Word Wrap for File  | alt+z |
| Format Document | ctrl+alt+f | 

<div class="alert alert-info" role="alert"> I also split my screen in half with the tutorial on one side and the editor on the other side.  On Windows you can do this by using the win key + left arrow for the one you want on the left and then select the other for the right when windows prompts you.  You can also use win key + right arrow to make a Windows use half the screen on the right.</div>

### Visual Studio Settings

In Visual Studio Code, you will notice that there is a map looking thing showing in the upper right corner.  This is called the mini map and it is a layout of your source code file.  I typically hide the mini map to give myself more editing space.  


<h4 class="exercise-start">
  <b>Exercise</b>: Hide Mini Map
</h4>

To hide the mini map go into the Preferences -> Settings (File -> Preferences -> Settings on Windows) and add the following setting

```bash
"editor.minimap.enabled": false,
```

<div class="exercise-end"></div>



<h4 class="exercise-start">
  <b>Exercise</b>: Turn On Word Wrap
</h4>

I also like to always have word wrap turned on.  You can turn this on in the same preferences file as you used for turning off the mini map above.

```bash
"editor.wrappingIndent": "same",
```

<div class="exercise-end"></div>

### Review

In this chapter we learned 3 things

1. How to create a new projects using the `ng new` command
1. What the project layout looks like for an Angular project generated with the CLI
1. How to run our project with the `ng serve` command and view it at http://localhost:4200
