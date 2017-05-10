## Reactive Forms

### Overview

In the previous chapter, we took a look at template based forms.  In this chapter will will take a look at reactive based forms.

Reactive forms allow you to define the form fields and validation in the component instead of the template.  You can easily test the form fields and validation logic.  You can also dynamically build the form and validation in the component.

We are going to build the form to enter our Todo items using Reactive forms.

### Goals

* Understand reactive forms
* Create a reactive form 
* Implement input validation
* Submit form values to a service

### Create Todo Component

<h4 class="exercise-start">
    <b>Exercise</b>: Create Todo Component 
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the todo component

    ```bash
    ng generate component todo
    ```

1. The generate command will create 4 files: 

    ![output of generate](images/todo-generate.png)

    * scss (styles)
    * html (view)
    * spec file (test)
    * component (controller)
    * add reference to the component in the app.module.ts file.

<div class="exercise-end"></div>

### Add Route

<h4 class="exercise-start">
    <b>Exercise</b>: Todo Routing 
</h4>

Before we can view our todo component, we need to tell Angular how to route to the page

1. Open the src\app\app-routing.module.ts file
1. Add the Import statement for the todo component on line 3

    ```TypeScript
    import { TodoComponent } from './todo/todo.component';
    ```

1. Add the TodoComponent to the home page route as specified by the `path: ''` 

    ```TypeScript
    {
        path: '',
        children: [],
        component: TodoComponent
    }   
    ```

    <div class="alert alert-info" role="alert">**Note:** This will cause the TodoComponent to load into the `<router-outlet></router-outlet>` in the src\app\app.component.html.  The router-outlet tag is how Angular knows where to put the rendered content of the routed componente.</div>


1. The todo page should be able to be displayed if you navigate to [http://http://localhost:4200/](http://http://localhost:4200/)

    ![todo initial view](images/todo-initial-view.png)

<div class="exercise-end"></div>


### Create Form

Next we are going to create the form without any validation logic at all.  Our form will have 1 input field for the todo item and an add button.


<h4 class="exercise-start">
    <b>Exercise</b>: Import ReactiveFormsModule
</h4>

With reactive forms, we are going to setup the form in your components TypeScript file.  

We need to import the ReactiveFormsModule into our AppModule before we can use it.

1. Open the src\app\app.module.ts 
1. Add ReactiveFormsModule to the @angular/forms import so that it looks like 

    ```TypeScript
    import { FormsModule, ReactiveFormsModule } from '@angular/forms';
    ```

1. In the @NgModule imports you need to add ReactiveFormsModule to the list

    ```TypeScript
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppRoutingModule
    ],
    ```
    
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Form setup
</h4>

Now we are ready to add all of the functionality to the component for the UI to interface with. For the todo component it is the src\app\todo\todo.component.ts file.  We need to add the Form.

1. Open the todo\todo.component.ts file
1. We need to import a few items  

    ```TypeScript
    import { FormGroup, FormBuilder } from '@angular/forms';
    ```
1. In the TodoComponent constructor we need to inject FormBuilder and configure the addForm.

    ```TypeScript
    constructor(private formBuilder: FormBuilder) {}
    ```    

    * This creates a form with a form control that is named item and has a default value of blank.

We need to implement an OnInit lifecycle event to configure the Form Builder.    

<div class="alert alert-info" role="alert">
The OnInit lifecycle event will run before the component has rendered.  
</div>

1. In the todo.component.ts file, we need to import OnInit for @angular/core

    ```TypeScript
    import { Component, OnInit } from '@angular/core';
    ```

1. Then in order to use the OnInit event, we need to add an implements OnInit to the class definition

    ```TypeScript
    export Class Todocomponent implements OnInit {
    ```    

1. Last, we need to create the ngOnInit function in the TodoComponent class

    ```TypeScript
    ngOnInit(): void {

    }
    ```

1. Inside of the ngOnInit function, we need to build the add form

    ```TypeScript
    this.addForm = this.formBuilder.group({
        'item': ''
    });
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Creating the Todo UI 
</h4>

We are now ready to create our UI. 

1. Open src\app\todo\todo.component.html 
1. Replace the existing html with:

    ```html
    <div class="container">
        <div class="page-header">
            <h1 align="center">Todo List</h1>
        </div>
        <form role="form" [formGroup]="addForm" class="text-center">
            <div class="form-group row">
                <div class="col-sm-10">
                    <input type="text" class="form-control form-control-lg" formControlName="item" placeholder="Todo!">
                </div>
                <div class="col-sm-2">
                    <button type="submit" class="btn btn-primary btn-lg btn-block">Add</button>
                </div>
            </div>
        </form>
        <br>Dirty: {{ addForm.dirty }}
        <br>Touched: {{ addForm.touched }}
        <br>Valid: {{ addForm.valid }}
        <br>Errors: {{ addForm.get('item').errors | json }}
        <br>Value: {{ addForm.value | json }}

    </div>

    ```

    * The [formGroup] takes care of binding the addForm that we declared in the todo.component.ts file to the form.
    * This form is using Bootstrap for the styling with the form-group, form-control, btn, and btn* css classes.
    * The output at the bottom under the form, is so that you can see the state of the form, form fields values and the errors for the item field.

<div class="exercise-end"></div>



### Add Submit Method


In order to submit the form we need to add an `(ngSubmit)=""`

<h4 class="exercise-start">
    <b>Exercise</b>:  Add ngSubmit
</h4>

1. In the src\app\todo\todo.component.html file and on the `<form>` tag add the `(ngSubmit)=""` attribute

    ```html
    (ngSubmit)="save()"
    ```

1. Open the src\app\todo\todo.component.ts file 
1. Add the save function

    ```TypeScript
    save() : void {
        console.log('form values: ', this.addForm.value);
    }
    ```
  <div class="alert alert-info" role="alert">If you completed the previous chapter on Template Forms, you will notice that we did not setup any ngModel tags or pass in the form to the save method.  With Reactive Forms, the formGroup provides the data binding for us.</div>

<div class="exercise-end"></div>


### Validators

Right now we do not have any validation being done on the form.  To setup validation, we need to modify our formBuilder item field setup.

<h4 class="exercise-start">
    <b>Exercise</b>:  Add Validators for required and min length
</h4>

1. Open the src\app\todo\todo.component.ts file
1. Add the Validators import to @angular/forms import

    ```TypeScript
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    ```

1. In the constructor Modify the item field setting by turning the value into an array and adding an array of validators as the 2nd argument.  We are going to use the required and min length validators.

    ```TypeScript
    'item': ['', [Validators.required, Validators.minLength(3)]]
    ```

Next we need to output the error messages.  For now, we are going to do it in the html but later we will make it more generic and add it to the component file instead.

1. After the closing form tag in the todo.component.html file add the following 

    ```html
    <div class="alert alert-danger">
      <span *ngIf="formErrorMessage">{{ formErrorMessage }}</span>
      <div *ngIf="addForm.get('item').errors">
        <span *ngIf="addForm.get('item').errors.required">
          Item is required
        </span>
        <span *ngIf="addForm.get('item').errors.minlength">
          Item must be 3 characters
        </span>
      </div>
    </div>
    ```

1. If you go to http://localhost:4200/ you should now see that it displays a message when the input field is less than 3 characters or is blank.

<div class="exercise-end"></div>

### Easier Validation Messages

We are going to setup a watcher to run when the item input field changes.  This will allow us to examine any errors and output the correct message from within the component instead of having all of the logic within the html code.

<h4 class="exercise-start">
    <b>Exercise</b>:  Watching for Changes
</h4>

1. Open the src\app\todo\todo.component.ts file
1. In the ngOnInit function after the addForm setup, we need to get a reference to the item input field.  We can do this by using the get function of the form.

    ```TypeScript
    const itemControl = this.addForm.get('item');
    ```

1. Next we need to tell Angular to watch for value changes on the field

    ```TypeScript
    itemControl.valueChanges.subscribe(value => this.setMessage(itemControl));
    ```

1. Then we need to create the setMessage function that will examine the item control and any errors if has with validation.

    ```TypeScript
    setMessage(c: AbstractControl): void {
        this.formErrorMessage = '';
        if ((c.touched || c.dirty) && c.errors){
            this.formErrorMessage = Object.keys(c.errors).map(key => this.validationMessages[key]).join(' ');
        }
    }
    ```

1. In order for the setMessage function to work, we need to add a variable to the class called formErrorMessage that is of type script

    ```TypeScript
    formErrorMessage: string;
    ```

1. We also need to add a json object called validationMessages that will hold that message to display when a validator is invalid.  We need to have 2 messages, required and minlength.

    ```TypeScript
    private validationMessages = {
        required: 'Todo item is required',
        minlength: 'Todo item much be at least 3 characters
    }
    ```

The last thing we need to do is up the UI to display the form error messages.    

1. Open the todo.component.html file
1. Replace the validation messages that you added in the previous section with the one below.

    ```html
    <div *ngIf="formErrorMessage" class="alert alert-danger">
      {{ formErrorMessage }}
    </div>
    ```

  <div class="alert alert-info" role="alert">No longer do we have any logic in the html to find the validation controls to check status or what message to even display.</div>

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Add Border On Invalid
</h4>

You can also add a border around the Bootstrap form-group by adding the has-danger css class when the formErrorMessage has a value.

1. Open the todo.component.html file
1. To the form-group div tag, add an ]ngClass]` attribute that checks for formErrorMessage and adds the has-danger when there is a value.

    ```html
    [ngClass]="{'has-danger': formErrorMessage}"
    ```

<div class="exercise-end"></div>

### Wait Before Validation Messages

You might have notice after implementing the previous logic to check the field values in the TypeScript file, that the validation errors are immediately shown which can be annoying to users while they type.  Instead it would be better to wait for a given amount of time after the last keystroke before checking.  This is called debounce.  

Angular makes it very easy to implement what they call debounce to wait for the user to stop typing before running validation on our item input field.


<h4 class="exercise-start">
    <b>Exercise</b>:  Implement Debounce
</h4>

1. Open todo.component.ts file
1. Import the rxjs debounceTime

    ```TypeScript
    import 'rxjs/add/operator/debounceTime';
    ```

1. On the line that you added the `itemControl.valueChanges.subscribe` add the `debounceTime` statement between valueChanges and subscribe like so

    ```TypeScript
    itemControl.valueChanges.debounceTime(1000).subscribe(value => this.setMessage(itemControl));
    ```

1. Now if you test the UI at http://localhost:4200, it will wait 1 second after the last keystroke before checking the input field validation.  You can change the time it waits by increasing or decreasing the value that is passed into the debounceTime function.

<div class="exercise-end"></div>

### Saving Todo Items

We are at the point, where we are ready to create a service to save the todo item.  Right now, we are just output the add form values to the console.


<h4 class="exercise-start">
    <b>Exercise</b>: Class to Hold Todo item
</h4>

Since TypeScript is a strongly typed language it is best practice to create a class to hold our Todo items.  This way we can get the type support for the different fields.


1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the todo component

    ```bash
    ng generate class shared/classes/Todo
    ```

1. This will create 1 files: 

    ![generate output](images/todo-generate-class.png)

    * todo.ts

1. Open src/app/shared/classes/todo
1. Add 4 fields to the Todo class

    * id:string -> id number of the todo item
    * item:string -> the todo item text
    * createdAt:Date -> The date added
    * completed:boolean -> completion state

    ```TypeScript
    id: string;
    item: string;
    completed: boolean;
    createdAt: Date;
    ```

1. Add a constructor to initialize the fields.  Item will required while id, completed and createdAt will be optional. The optional fields must be after all of the required fields.  Having the value populated in the constructor will also make it easier to test later on.

    ```TypeScript
    constructor(
        item: string, 
        id?: string,
        completed?: boolean,
        createdAt?: Date) {
        id = id ? id : '';
        this.item = item;
        this.completed = completed ? completed: false;
        this.createdAt = createdAt ? createdAt: new Date();
    }    
    ```    

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Create Todo Service
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the todo component

    ```bash
    ng generate service shared/services/Todo
    ```

1. This will create 2 files:  

    ![generate output](images/todo-service-generate.png)

    * todo.service.ts
    * todo.service.spec.ts

You will also notice that there is a warning that the service has not been provided. This means that we need to open up the module that we want to use the service in and add it to the providers list.

1. Open src\app\app.module.ts
1. Import the TodoService

    ```TypeScript
    import { TodoService } from './shared/services/todo.service';
    ```

1. Find the @NgModule providers list and add the TodoService

    ```TypeScript
      providers: [AuthService, TodoService],
    ```    

1. Now the TodoService is available to the AppModule and we can use it in our TodoComponent

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Todo Service Save
</h4>

Now that we have the Todo service file created, we need to add our save method that calls our json-server api server and then update the Todo component to call the service.

1. Open the src\app\shared\services\todo.service.ts file
1. Import the following so that we can make our HTTP calls and get a response back.  

    ```TypeScript
    import { Http, Response } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
    ```

1. Import the todo class 

    ```TypeScript
    import { Todo } from '../classes/todo';
    ```

1. In order to use the HTTP module, we need to inject it into our constructor

    ```TypeScript
    constructor(private http: Http) { }
    ```

1. Next we need to create our login function within the AuthService class that will call our API

    ```TypeScript
    save(item: string): Observable<Todo> {
        let url = 'http://localhost:3000/todo';
        var body = {
        "item": item,
        "completed": false,
        "createdAt": new Date()
        };
        return this.http.post(url, body)
        .map((res: Response) => {
            return <Todo>res.json();
        })
        .catch(error => {
            console.log('save error', error)
            return error;
        });
    }
    ```
    
Now we need to call the TodoService save function in the TodoComponent

1. Open the src\app\todo\todo.component.ts file
1. Import the TodoService

    ```TypeScript
    import 'TodoService' from '../shared/services/todo.service';
    ```
1. Add the TodoService to the constructor

    ```TypeScript
    constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }
    ```

1. Update our save method to call the `TodoService.save` function and output the result to the console

    ```TypeScript
    save(): void {
        this.todoService.save(this.addForm.value.item)
        .subscribe(result => {
            console.log('save result', result);
        },
        error => {
            this.errorMessage = <any>error;
        });
    }
    ```

1. We now need to create the errorMessage variable that is of type string in the Todocomponent class

    ```TypeScript
    errorMessage: string;
    ```

1. Now we need to add an alert section to our todo.component.html to display the error message.  After the `</form>` tag, add the following code

    ```TypeScript
    <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    ```

<div class="exercise-end"></div>

### Displaying Items

Now that we have the ability to save our items, we need to be able to display the current list with options to complete or delete a todo item.

<h4 class="exercise-start">
    <b>Exercise</b>: Html to Display Items
</h4>

1. Open the src\app\todo\todo.component.html
1. Since we have our form working, remove the form status troubleshooting entries.
1. After the error message alert, add the following html to display the list of todo items

    ```html
    <div class="row" *ngFor="let todoItem of todoList">
      <div class="col-12 done-{{todoItem.completed}}">
        {{todoItem.item}} <small>created: {{todoItem.createdAt | date:'short'}}</small>
      </div>
    </div>
    ```

    * the *ngFor will loop through all of the items in the todoList variable that we will be creating next.  
    * For the date, we are using the built-in date pipe to convert it to a short date that strips out the time part of the date
    * We are also setup to have a different style when an item is completed.  We will add the styling in a bit.    

<div class="exercise-end"></div>



<h4 class="exercise-start">
    <b>Exercise</b>: Add TodoService Get All 
</h4>

Next we need to add a getAll function to our TodoService that does an http get to our API to get all of the todo items.

1. Open the src\app\shared\services\todo.service.ts file
1. Add the following function to do an http get call against our API

    ```TypeScript
    getAll(): Observable<Array<Todo>>{
    let url = "http://localhost:3000/todo";
    return this.http.get(url)
      .map((res: Response) => {
        return <Array<Todo>>res.json();
      })
      .catch(error => {
        console.log('get error', error);
        return error;
      });
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Call TodoService Get All from Component 
</h4>

Now that we have the TodoService.getAll function created, we are ready to create the getTodoListAll function that will call the TodoService.  We will wire up the getTodoListAll function to be called in ngOnInit so that it will populate the todo list on component load.

1. Open the src\app\todo\todo.component.ts file
1. Import the todo class 

    ```TypeScript
    import { Todo } from '../shared/classes/todo';
    ```

1. Create a variable in the TodoComponent class called todoList that is an array of Todo and intialize to an empty array

    ```TypeScript
    todoList: Array<Todo> = [];
    ```

1. Create the getTodoListAll function that will return void, call the TodoService.getAll function and set a todoList variable at the Todocomponent class level.

    ```TypeScript
    getTodoListAll(): void {
    this.todoService.getAll()
      .subscribe(
      data => {
        this.todoList = data;
      },
      error => {
        this.errorMessage = <any>error;
      }
      );
    }
    ```

1. Now we are ready to call the getTodoListAll function in ngOnInit

    ```TypeScript
    this.getTodoListAll();
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Updating Todo list on save 
</h4>

Now that we have the Todo list being stored in the todoList variable, when we save a new todo item, we can add it to the todoList array and the todo list will automatically update with the change.

1. In the todo.component.ts file, we need to update the save function to push the save result into the todoList array.

    ```TypeScript
    this.todoList.push(result);
    ```

1. When you add a new todo item, the list will now update itself.

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Complete Todo Item
</h4>

Right now the todo list is just a read only view but we need to be able to complete the todo items.  We need to add an icon to the todo list that will toggle the completed status and save the new todo item state to the API.


1. Open the src\app\shared\services\todo.service.ts file
1. We are going to create an update method that will take in a Todo item and make an  http put call to our API to update the one record with the new completion state.

    ```TypeScript
    updateTodo(todo: Todo): Observable<Todo> {
        let url = `http://localhost:3000/todo/${todo.id}`;

        return this.http.put(url, todo)
        .map((res: Response) => <Todo>res.json())
        .catch(error => {
            console.log('update error', error);
            return error;
        });
    }
    ```

    * For the url we are using string interpolation to create the url.  This is done with the &#96;&#96; tags and the ${}

Now we need to call the updateTodo service function in our component.

1. Open the todo.component.ts file
1. Create the completeTodo method that the UI will call 

    ```TypeScript
    completeTodo(todo: Todo): void {
        todo.completed = !todo.completed;
        this.todoService.updateTodo(todo)
        .subscribe(
            data => {
                // do nothing
            },
            error => {
                todo.completed = !todo.completed;
                this.errorMessage = <any>error;
                console.log('complete error', this.errorMessage);
            });
    }
    ```

    * For now we are not going to do anything with the returned result.  In the future you could call a sort function or update an open todo item counter.

The last thing we need to do it do update the UI to have a checkbox icon that will be clicked on to toggle the completion state.

1. Open the todo.component.html file
1. Inside the ngFor loop, above the existing div add the following icon that uses the Font Awesome library for the icon and is set to take up 1 column of space

    ```html
      <div class="col-1" (click)="completeTodo(todoItem)"><i [className]="todoItem.completed ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i></div>
    ```

    * We are passing in the todo item that we are wanting to update to the completedTodo function.  This will pass in the whole object so we have access to all of the fields.
    * We are updating the icon used based on the completed field state.  If completed we are using fa-check-square-o.  If not completed, we are using fa-square-o

1. With Bootstrap it is a 12 column grid, so we need to reduce the size of the existing div from col-12 to col-11


<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Delete Todo Item
</h4>

In addition to being able to complete a todo item, we also need to be able to delete one.  We need to add an icon to the todo list that will call a delete function in the component and delete the todo item from our database.


1. Open the src\app\shared\services\todo.service.ts file
1. We are going to create delete method

    ```TypeScript
    deleteTodo(todo: Todo): Observable<Response> {
        let url = `http://localhost:3000/todo/${todo.id}`;
        return this.http.delete(url)
        .catch(error => {
            console.log('delete error', error);
            return error;
        });
    }
    ```

    * We are passing in the todo item that we are wanting to update to the completedTodo function.  This will pass in the whole object so we have access to all of the fields.
    * We are not doing any kind of mapping of the return results since there is none.  It is either successful or not.

Next we need to create the deleteTodo item function in the component that will call the TodoService.delete function

1. Open the todo.component.ts file
1. Create the deleteTodo function that takes in a todo item and calls the TodoService.delete function

    ```TypeScript
    deleteTodo(todo: Todo): void {
        this.todoService.deleteTodo(todo)
        .subscribe(
        data => {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
        },
        error => {
            todo.completed = !todo.completed;
            this.errorMessage = <any>error;
            console.log('complete error', this.errorMessage);
        });
    }
    ```

    * In the results of the deleteTodo service, we are going to remove the todo item from the displayed list since it no longer exist.  We could have also call the TodoService.getAll function but since we already have all of the items and the items are specific to a single user, there is no need to make the extra database call.

The last thing that we need to do is to add the delete icon to the todo list.

1. Open the todo.component.html file
1. Add a div after the div displays the todo item text but still inside of the ngFor div.  This new div will hold the delete icon which we will use the fa-trash icon and when clicked it will call the deleteTodo function.  The icon is going to take up 1 column of space in the grid.

    ```TypeScript
    <div class="col-1" (click)="deleteTodo(todoItem)"><i class="fa fa-trash"></i></div>
    ```

1. Since the Bootstrap grid is 12 columns wide, we need to reduce the text div from col-11 to col-10.

<div class="alert alert-info" role="alert">The reason that we used the Bootstrap grid is so that everything wrapped correctly with longer todo items and when the screen was smaller.  The Bootstrap grid provides this functionality automatically for you.</div>

The html for the display of the Todo list should look like the following:

```html
<div class="row todo" *ngFor="let todoItem of todoList">
    <div class="col-1" (click)="completeTodo(todoItem)"><i [className]="todoItem.completed ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i></div>

    <div class="col-10 done-{{todoItem.completed}}">{{todoItem.item}} <br /><small>created: {{todoItem.createdAt | date:'short'}}</small></div>

    <div class="col-1" (click)="deleteTodo(todoItem)"><i class="fa fa-trash"></i></div>
</div>
```

<div class="exercise-end"></div>

### Adding Style

<h4 class="exercise-start">
    <b>Exercise</b>: Making the Todo list look nicer
</h4>

Right now the UI looks decent but with a few tweaks it could look much better.  

![todo unstyled](images/todo-unstyled.png)

If we added some padding around each row, a bottom border, made the date smaller and gray, increased the size of each icon and made the completed items gray with a strike-through, the UI would pop.

The first thing we need to do is add in our styles to the Todo component.  Since these styles are strictly for the Todo component we are going to add them into the todo.component.scss instead of the app's style.scss file.

1. Open the src\app\todo\todo.component.scss 
1. Add the following contents to the file.  To ensure we are following our branding, we are importing our scss color variables.

    ```scss
    @import "../../assets/bootstrap/variables";
    div.todo {
        width: 100%;
        padding-bottom: .2em;
        padding-top: .2em;
        border-bottom: 1px solid $gray-light;
        font-size: 1.4em;

        small {
            font-size: .7em;
            color: $gray-light;
        }
        
        i {
            width: 40px;
            padding-right: 10px;
            vertical-align: middle
        }
        
        .done-true {
            text-decoration: line-through;
            color: $gray-light;
        }
    }
    ```

1. Now if you view the UI it should look like below.  
    
    ![unstyled ui](images/todo-styled-final.png)


<div class="exercise-end"></div>



### Review

We did a lot in this chapter implementing our Reactive form

1. Created a form using the FormBuilder
1. Added validation to the FormBuilder
1. Created a value change observable to set the field validation message
1. Added debounce to wait until the user is done typing before checking the field validation
1. Show the list of todo list with icons to complete and delete todo items
1. You used several Angular directives to implement functionality in the UI:

    * *ngIf - replacement for ng-if.  Only show section if condition is true
    * *ngFor - replacement for ng-repeat.  Loop through a list and do something
    * [(ngModel)] - two-way data binding
    * (click) - binds to the click event
    * [className] - replacement for ngClass and set the css class for the element
    * (ngModelChange) - runs method when the [(ngModel)] value changes
    * [hidden] - hides the element when condition is true 
    * (ngSubmit) - submits a form 
    * [formGroup] - used for reactive forms.  basically dynamic forms that you can control in the controller
    * [disabled] - set the element to disabled when condition is true

<div class="exercise-end"></div>
