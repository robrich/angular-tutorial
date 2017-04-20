## Getting up and running

To get started with Angular, we need to install and configure some software first.

* Windows, Mac, or Linux computer
* Node 6.9+
* Angular CLI 1.0.0+
* Visual Studio Code

Below are all of the steps to install and configure the software.  

### Windows Showing File Extensions

<h4 class="exercise-start">
    <b>Exercise</b>: Turn On Windows Showing File Extensions
  </h4>

<div class="alert alert-danger" role="alert">
**Windows Only**
</div>

By default Windows is set to not show file extensions for known files which causes files such as .gitconfig and .npmrc to show up as just a period with no file extension.  To fix this we need to turn set Windows Explorer to show file extensions.

1. Open Windows Explorer
1. Click on the View Tab and select Options

    <img src="images/chapter1/windows-explorer-ribbon.png" style="height:147px;width:759px;margin-left: 10px">

Once the "Folder Options" dialog is open: 

1. Click on the View Tab
1. Uncheck the "Hide extensions for known file types"
1. Click Ok

    <img src="images/chapter1/windows-explorer-view-options.png" style="height:475px;width:382px;margin-left: 10px">
  
<div class="exercise-end"></div>

### Node.js

1.	Download the latest stable version (LTS) of [NodeJS](http://nodejs.org) which as of this writing is 6.10.2.  The latest version of the Angular CLI requires Node version 6.9 or greater.  
1.	Run the installer and accept all defaults.
1. Verify that Node installed.  Start a command prompt or terminal window and run: 

    ```bash
    node -v
    ```


### Visual Studio Code

You could use any editor that you would like for Angular 2 but I recommend using Visual Studio Code.

You can download Visual Studio Code at [https://code.visualstudio.com/](https://code.visualstudio.com/)

Once the download finishes, launch the installer except all of the defaults.

### Angular CLI Install

Starting with Angular 2 they released the Angular CLI (command line interface) to generate new projects, components, services, pipes, etc.  Using the Angular CLI removes a lot of the tooling worries and just works.  

<h4 class="exercise-start">
    <b>Exercise</b>: Install Angular CLI
</h4>

1. Open a command prompt or terminal and run the following command

    ```bash
    npm install -g @angular/cli
    ```

1. Verify Angular CLI

    ```
    ng --version
    ```

<div class="exercise-end"></div>
