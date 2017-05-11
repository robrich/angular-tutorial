## Locking Down Routes

### Overview

### Goals

### Create Guard

<h4 class="exercise-start">
  <b>Exercise</b>: Check If User Is Logged In
</h4>

```bash
ng generate guards shared/guards/isloggedin
```

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

