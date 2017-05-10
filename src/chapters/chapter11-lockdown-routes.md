## Locking Down Routes

### Overview

### Goals

### Create Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Create Guard
</h4>

<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Module
</h4>

1. Open the app.module.ts 
1. Import the AdminGuard

  ```TypeScript
  import { AdminGuard } from './shared/guards/admin.guard';
  ```

1. Add the AdminGuard to the providers list

  ```TypeScript
  providers: [TodoService, AdminGuard],
  ```

<div class="exercise-end"></div>

### Update Route With Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Add Guard to Route
</h4>


<div class="exercise-end"></div>

<h4 class="exercise-start">
  <b>Exercise</b>: Test Unauthorized Access
</h4>

To test that the guard is working, we need to return a false from canActivate and redirect to the unauthorized route.  

1. In the admin.guard.ts file, change the canActivate route to the following

  ```TypeScript
    canActivate(): boolean {
    this.router.navigate(['/unauthorized']);
    return false;
  }
  ```

1. Import the router into the admin.guard.ts file

  ```TypeScript
  import { Router } from '@angular/router';
  ```

1. Inject the Router into the constructor

  ```TypeScript
  constructor(private router: Router) { }
  ```  

1. Now if you navigate to [http://localhost:4200/admin](http://localhost:4200/admin) you will be redirected to the unauthorized route

  ![unauthorized view](images/unauthorized-view.png)

<div class="exercise-end"></div>
