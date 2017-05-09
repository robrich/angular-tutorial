## Deploying

### Overview

### Goals

### Production Build

Before deploy you will need to run an a build with the Angular CLI.  With the build you can tell it the environment to use and if it is a production build or not.  A production will minify everything.

<div class="alert alert-info" role="alert">
Note the build create a dist folder to hold the output.   This directory is removed before each build
</div>

Select which type of build you want to run:  Non-Production or Production

<h4 class="exercise-start">
  <b>Exercise</b>: Running Non-Production Build
</h4>

Run the following command to run a build that uses the environment.ts file and is not a production build

```bash
ng build
```

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Running a Production Build
</h4>

<div class="alert alert-warning" role="alert">
Note that this will remove the dist directory before build.
</div>

Run the following command to run a build that uses the environment.prod.ts file and is a production build.   The environment name must match the file name for it to be valid.

```bash
ng build --target=production --environment=prod
```

<div class="exercise-end"></div>

### Heroku

<h4 class="exercise-start">
  <b>Exercise</b>: Heroku
</h4>

<div class="exercise-end"></div>
