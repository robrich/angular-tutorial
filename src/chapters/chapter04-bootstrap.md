## Bootstrap

!!!! CONVERT TO Bootstrap 4

For our styling we are going to use [Bootstrap](https://getbootstrap.com/).

### Install Bootstrap

<h4 class="exercise-start">
    <b>Exercise</b>: Install Bootstrap
</h4>

```bash
 npm install --save bootstrap@next font-awesome
 ```

<div class="exercise-end"></div>

### Add Bootstrap to Project

<h4 class="exercise-start">
    <b>Exercise</b>: Add  Bootstrap to Project
</h4>


Now we need to configure the angular cli to import the bootstrap libraries.  

1. Open the .angular-cli.json file which is the configuration file for the Angular CLI
1. Find the apps\styles section and replace the section with:  

    ```TypeScript
      "styles": [
         "styles.scss"
      ],
    ```

<div class="exercise-end"></div>

### Add Banner Section to Top

<h4 class="exercise-start">
    <b>Exercise</b>: Updating Html
</h4>

Open the src\app\app.compoment.html file and replace the contents with:

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

<div class="exercise-end"></div>

### View Changes


<h4 class="exercise-start">
    <b>Exercise</b>: Restart ng serve
</h4>

Since we changed the .angular-cli.json file to add in the style configurations, we need to restart the new serve command for the changes to take effect.  

1. Go to the terminal that is running the `ng serve` command and do a ctrl+c to stop it.
1. Run the `ng serve` command again.

    ```bash
    ng serve
    ```

1. The web page should now look like

    ![App Works with Bootstrap](images/app-works-mlaf.png)

<div class="exercise-end"></div>
