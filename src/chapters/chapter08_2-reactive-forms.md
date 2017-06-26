## Reactive Forms

### Overview

In the previous chapter, we took a look at template based forms.  Templates are great for very simple forms that you do not want to unit test at all.  However, if you want to unit test your forms you will need to reuse reactive based forms. 

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

    ```bash
    app-routing.module.ts
    ```

1. Add the Import statement for the todo component on line 3

    ```TypeScript
    import { TodoComponent } from './todo/todo.component';
    ```

1. We want to make the Todo compoment the home page.  We can do this by adding a compoment field to the `path: ''` route 

    ```TypeScript
    {
        path: '',
        children: [],
        component: TodoComponent
    }   
    ```

1. You routes should look like

    ```TypeScript
    const routes: Routes = [
        {
            path: '',
            children: [],
            component: TodoComponent
        },
        { path: 'login', children: [], component: LoginComponent },
        { path: 'signup', component: SignupComponent},
    ];
    ```

1. The todo page should display when you to the home, [http://http://localhost:4200/](http://http://localhost:4200/)

    ![todo initial view](images/todo-initial-view.png)

    <div class="alert alert-info" role="alert">**Note:** When you navigate to the home page, the TodoCompoment is loaded into the `<router-outlet></router-outlet>` in the html in  src\app\app.component.html.  The router-outlet tag is how Angular knows where to put the rendered content for the route.</div>

<div class="exercise-end"></div>


### Create Form

Next we are going to create the form without any validation logic at all.  Our form will have 1 input field for the todo item and an add button.


<h4 class="exercise-start">
    <b>Exercise</b>: Import ReactiveFormsModule
</h4>

With reactive forms, we are going to setup the form in your components TypeScript file.  

We need to import the ReactiveFormsModule into our AppModule before we can use it.

1. Open the src\app\app.module.ts 

    ```bash
    app.module.ts
    ```

1. Add the ReactiveFormsModule to the existing  @angular/forms import so that it looks like 

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

    ```bash
    todo.component.ts
    ```

1. When creating Reactive Forms, you will need to import the FormGroup and FormBuilder modules from @angular/forms

    ```TypeScript
    import { FormGroup, FormBuilder } from '@angular/forms';
    ```

1. In order to use the FormBuilder we need to inject it into the TodoComponent's constructor

    ```TypeScript
    constructor(private formBuilder: FormBuilder) {}
    ```    

1. Before creating our form, we need to define the addForm variable to hold the configuration.  Inside of the TodoComponent class above the constructor, add the following variable

    ```TypeScript
    addForm: FormGroup;
    ```

1. To configure the form we will use the ngOnInit lifecycle event.  The ngOnInit lifecycle event will run before the component has rendered.  Inside the ngOnit function we need to tell Angular that the addForm is a formBuilder group with 1 field called item with an empty default value.

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

    ```bash
    todo.component.html
    ```

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
                    <button type="submit" [disabled]="addForm.invalid" class="btn btn-primary btn-lg btn-block">Add</button>
                </div>
            </div>
        </form>
        <div class="container">
            <h3>Form Status Info</h3>
            <table class="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Form</th>
                    <th>Item Field</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Dirty</td>
                    <td>{{ addForm.dirty }}</td>
                    <td>{{ addForm.get('item').dirty }}</td>
                </tr>
                <tr>
                    <td>Touched</td>
                    <td>{{ addForm.touched }}</td>
                    <td>{{ addForm.get('item').touched }}</td>
                </tr>
                <tr>
                    <td>Valid</td>
                    <td>{{ addForm.valid }}</td>
                    <td>{{ addForm.get('item').valid }}</td>
                </tr>
                <tr>
                    <td>Errors</td>
                    <td>N/A</td>
         			<td><pre>{{ addForm.get('item').errors | json }}</pre></td>
                </tr>
                <tr>
                    <td>Form Field Values</td>
                    <td colspan="2"><pre>{{ addForm.value | json }}</pre></td>
                </tr>
            </tbody>
            </table>
        </div>
    </div>

    ```
    
    * The [formGroup] binds the addForm in the todo.component.ts to the form.
    * On the input field, the formControlName corresponds to the `item` field in the `addForm` FormGroup
    * The form is using Bootstrap for the styling with the form-group, form-control, btn, and btn* css classes.
    * The form status info section, is debugging information for the form and the item field for us so that we can see the current state, validation errors, and the form field values.
        * As you type into the item field, the form status info value section will update
    * The add button is set as disabled until validation passes. 

	<div class="alert alert-info" role="alert">If you completed the previous chapter on Template Forms, you will notice that we did not setup any ngModel tags or pass in the form to the save method.  With Reactive Forms, the formGroup provides the data binding for us.</div>

<div class="exercise-end"></div>

### Add Submit Method

In order to submit the form we need to add an `(ngSubmit)=""`

<h4 class="exercise-start">
    <b>Exercise</b>:  Add ngSubmit
</h4>

1. Open src\app\todo\todo.component.html file
	
	    ```bash
	    todo.component.html
	        ```
	        
1. On the `<form>` tag add the `(ngSubmit)=""` attribute and have it call the save function 

    ```html
    (ngSubmit)="save()"
    ```

1. Open the src\app\todo\todo.component.ts file 

    ```bash
    todo.component.ts
    ```

1. Add a function called save that returns a void.  Inside of the save function  add a console log that outputs the addForm field value property.

    ```TypeScript
    save() : void {
        console.log('form values: ', this.addForm.value);
    }
    ```

1. If you do not already have the Chrome Developer Tools open, open them up and click on the console tab
1. Enter text into the input box on the home page [http://localhost:4200](http://localhost:4200) and click submit.
1. You should see the form value output to the Chrome Developer Tools console

<div class="exercise-end"></div>


### Validators

Right now we do not have any validation being done on the form.  To setup validation, we need to modify our formBuilder item field setup.

<h4 class="exercise-start">
    <b>Exercise</b>:  Add Validators for required and min length
</h4>

1. Open the src\app\todo\todo.component.ts file

    ```bash
    todo.component.ts
    ```

1. To use the Angular form validators, we need to add the Validators module to the @angular/forms import statement like so

    ```TypeScript
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    ```
    
    *  note that order of the modules in not important

1. In the ngOnInit function we need add the Validators required and minLength to the item field that we defined earlier.  In order to add the validators, we need to turn the item field value into an array with the 1st position being the default value and the 2nd position as an array of validators.  For the minLength, we are going to require at least 3 characters.

    ```TypeScript
    'item': ['', [Validators.required, Validators.minLength(3)]]
    ```

Now that we have validators setup, we need to output an error message to user when the validation fails.  For now, we are going to do it in the html but later we will make it more generic and add it to the component file instead.  


1. Open the todo.component.html file

    ```bash
    todo.component.html
    ```

1. After the closing form tag in the todo.component.html file add the following 

    ```html
    <div class="alert alert-danger" *ngIf="addForm.get('item').errors && (addForm.get('item').dirty || addForm.get('item').touched)">
        <span *ngIf="addForm.get('item').errors.required">
            Item is required
        </span>
        <span *ngIf="addForm.get('item').errors.minlength">
            Item must be at least 3 characters
        </span>
    </div>
    ```

    * By looking at the dirty and touched status, we can ensure that we don't display the error message before the user has had a chance to click on the input field.
    * By looking at the errors status, we can ensure we only show the messages when there are errors
    * For each of the messages, we can look at the individual validators to see which one failed and only display that message.

1. If you go to http://localhost:4200/ click on the field and then click off it the required validator will fire.  If you enter less than 3 characters the minLength validator will fire.  

<div class="exercise-end"></div>

### Easier Validation Messages

Having the validation messages in the html template gets old really fast.  It is a lot of code to maintain.  With the Reactive Forms, we can create a generic error checker for the whole form and set a value for each of the form fields.

<h4 class="exercise-start">
    <b>Exercise</b>:  Watching for Changes
</h4>

We are going to create a function that will be called each time the form values change.  Within the function we will loop through all of the fields and check if they are dirty and not valid.  Then we will look up the validation message to use for the form field and validator that failed.

1. Open the src\app\todo\todo.component.ts file

    ```bash
    todo.component.ts
    ```

1. We need to create a variable to hold the error message for each of the form fields. In this case we only have 1 form field called item.  We are going to call the variable formErrors.  The default value for the error message is a blank string.  This list will also be used to determine which form fields to inspect for validation errors.

    ```TypeScript
    formErrors = {
        'item': ''
    };
    ```

1. Next we need to create a variable to hold the validation messages for each of the form fields.  The name of the validation message must match the name of the validation.

    ```TypeScript
    validationMessages = {
        'item': {
        'required': 'Item is required.',
        'minlength': 'Item must be at least 3 characters'
        }
    };
    ```

1. Now that we the look up for the validation error messages and a place to store the form field error we are ready to create our generic function to determine the actual error message.

    ```TypeScript
    onValueChanged(data?: any) {
        if (!this.addForm) { return }
        const form = this.addForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    ```

    * The 1st thing the method does is make sure that our addForm actually has a value.
    * Then we loop through the formError variable, get the field and check if the form field is invalid
    * If the form field is invalid, then we look up the validation message for the form field and validator that failed and set the formError for that field.

1. Next we need to subscribe to the addForm valueChanges event and call the onValueChanged function we just created.  We are going to setup the subscribe in the ngOnInit function

    ```TypeScript
    this.addForm.valueChanges.subscribe(data => this.onValueChanged(data));
    ```

1. The last thing we are going to is call the onValueChanged function in the ngOnInit function to reset any formErrors back to blank

    ```TypeScript
    this.onValueChanged();
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Show Error Message in UI
</h4>

The last thing we need to do is up the UI to display the form error messages.    

1. Open the todo.component.html file
1. Replace the validation messages that you added in the previous section with the one below.

    ```html
    <div *ngIf="formErrors.item" class="alert alert-danger">
        {{ formErrors.item }}
    </div>
    ```

1. If you navigate to [http://localhost:4200](http://localhost:4200), click on the item form field and enter 1 character it will trigger the minLength validator and will show the minLength validation message.  If you then blank out the field you will see the required message.

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Border On Invalid
</h4>

You can also add a border around the Bootstrap form-group for the item form field by adding the has-danger css class when the formErrors.item has a value.

1. Open the todo.component.html file

    ```html
    todo.component.html
    ```

1. To the form-group div tag, add an `[ngClass]` attribute that checks that formErrors.item has a value and if so then adds the has-danger css to the div tag

    ```html
    [ngClass]="{'has-danger': formErrors.item}"
    ```

<div class="exercise-end"></div>

### Wait Before Validation Messages

You might have notice after implementing the previous logic to check the field values in the TypeScript file, that the validation errors are immediately shown which can be annoying to users while they type.  Instead it would be better to wait for a given amount of time after the last keystroke before checking.  This is called debounce.  

Angular makes it very easy to implement what they call debounce to wait for the user to stop typing before running validation on our item input field.


<h4 class="exercise-start">
    <b>Exercise</b>:  Implement Debounce
</h4>

1. Open todo.component.ts file

    ```TypeScript
    todo.component.ts
    ```

1. Import the rxjs debounceTime

    ```TypeScript
    import 'rxjs/add/operator/debounceTime';
    ```

1. On the line that you added the `itemControl.valueChanges.subscribe` add the `debounceTime` statement between valueChanges and subscribe like so

    ```TypeScript
    this.addForm.valueChanges.debounceTime(1000).subscribe(data => this.onValueChanged(data));
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


1. Open src/app/shared/classes/todo.ts

    ```TypeScript
    todo.ts
    ```

1. Add the following 4 fields to the Todo class to hold the information about our todo item

    <table class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Field</th>
            <th>Data Type</th>
            <th>Purpose</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>string</td>
            <td>unique identifier to the item</td>
        </tr>
        <tr>
            <td>item</td>
            <td>string</td>
            <td>todo item text<td>
        </tr>
        <tr>
            <td>createdAt</td>
            <td>Date</td>
            <td>date added</td>
        </tr>
        <tr>
            <td>updatedAt</td>
            <td>Date</td>
            <td>date last updated</td>
        </tr>
        <tr>
            <td>completed</td>
            <td>boolean</td>
            <td>completion state</td>
        </tr>
        <tr>
            <td>user</td>
            <td>string</td>
            <td>id of the user that created the todo item</td>
        </tr>
    </tbody>
    </table>

    ```TypeScript
    id: string;
    item: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: string;
    ```

1. To make it easier to create new todo Items and implement unit testing, we are going to add a constructor to initialize the fields.  Item will required while id, completed and createdAt will be optional. The optional fields must be after all of the required fields.

    ```TypeScript
    constructor(
        item: string, 
        id?: string,
        completed?: boolean,
        createdAt?: Date,
        updatedAt?: Date) {
        id = id ? id : '';
        this.item = item;
        this.completed = completed ? completed: false;
        this.createdAt = createdAt ? createdAt: new Date();
        this.updatedAt = updatedAt ? updatedAt: new Date();
    }    
    ```    

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Create Todo Service
</h4>

1. Within VS Code, open up the integrated terminal (ctrl+`) or view menu and then "Integrated Terminal"
1. Run the ng generate command below to create the todo component

    ```bash
    ng generate service shared/services/Todo --module App
    ```

1. This will create 2 files and update the app.module to add the TodoService into the providers list

    ![generate output](images/todo-service-generate.png)

    * todo.service.ts
    * todo.service.spec.ts

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Todo Service Save
</h4>

Now that we have the Todo service file created, we need to add our save method that calls our json-server api server and then update the Todo component to call the service.

1. Open src\app\shared\services\todo.service.ts 

    ```bash
    todo.service.ts
    ```

1. Import the following so that we can make our HTTP calls and get a response back.  

    ```TypeScript
    import { Http, Response, RequestOptions } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
    ```

1. In order to use the HTTP module, we need to inject it into our constructor

    ```TypeScript
    constructor(private http: Http) { }
    ```

1. For the API that we are using (SailsJS based), it requires that we set the HTTP option to allow credentials so that the session cookie can be passed back and forth, else it will always think you haven't logged in.  Add this varaible to the TodoService class.

    ```TypeScript
    private options = new RequestOptions({ withCredentials: true });
    ```

    <div class="alert alert-info" role="alert">You will need to pass in this.options as the last parameter for all of our http calls.</div>

1. Before we create our save method we need to import the Todo class so that our data is typed when we pass it from the service the component. 

    ```TypeScript
    import { Todo } from '../classes/todo';
    ```

1. Next we need to create our save function that will call our API, pass in our TodoItem, and return back the results to the component.  

    ```TypeScript
    save(item: string): Observable<Todo> {
        return this.http.post('https://dj-sails-todo.azurewebsites.net/todo', new Todo(item), this.options)
        .map((res: Response) => {
            return <Todo>res.json();
        })
        .catch(error => {
            console.log('save error', error)
            return error;
        });
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Call TodoService Save from TodoCompoment
</h4>
        
Now that we have our Todo service save function created, we need to call it from our Todo component so that we can save our data.

1. Open the src\app\todo\todo.component.ts file

    ```bash
    todo.component.ts
    ```

1. Before we can call the `TodoService.save` function we have to import the TodoService

    ```TypeScript
    import { TodoService } from '../shared/services/todo.service';
    ```

1. Now that we have the TodoService import we need to inject it into the constructor to make it avaiable to the component.  

    ```TypeScript
    constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }
    ```

1. Update the save method with the following code to call the `TodoService.save` function and output the result to the console

    ```TypeScript
    this.todoService.save(this.addForm.value.item)
    .subscribe(result => {
        console.log('save result', result);
    },
    error => {
        this.errorMessage = <any>error;
    });
    ```

1. We now need to create the errorMessage variable that is of type string in the Todocomponent class

    ```TypeScript
    errorMessage: string;
    ```

1. Open the todo.component.html file so that we can add the display of the save error message.

    ```bash
    todo.component.html
    ```    

1. Now we need to add an alert section to our todo.component.html to display the error message.  After the `</form>` tag, add the following code

    ```TypeScript
    <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
        <h3>Error Saving</h3>
        {{ errorMessage }}
    </div>
    ```

1. Testing the error message display requires that we temporary set a value for the errorMessage.  We are going to do this in the ngOnInit just to verify that the error message will display:

    ```TypeScript
    this.errorMessage = 'testing'
    ```     

1. Now if you go to [http://localhost:4200](http://localhost:4200) you will see the following display

    ![error message display](images/error-messages-display.png)

1. We can remove the temporary value that we set for the errorMessage.

<div class="exercise-end"></div>

### Displaying Items

Now that we have the ability to save our items, we need to be able to display the current list with options to complete or delete a todo item.

<h4 class="exercise-start">
    <b>Exercise</b>: Add TodoService Get All 
</h4>

Next we need to add a getAll function to our TodoService that does an http get to our API to get all of the todo items.

1. Open the src\app\shared\services\todo.service.ts file

    ```bash
    todo.service.ts
    ```

1. Add the following function to make an http get call to our Todo API

    ```TypeScript
    getAll(): Observable<Array<Todo>>{
    let url = "https://dj-sails-todo.azurewebsites.net/todo";
    return this.http.get(url, this.options)
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

    ```bash
    todo.component.ts
    ```

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
    <b>Exercise</b>: Html to Display Items
</h4>

1. Open the src\app\todo\todo.component.html

    ```bash
    todo.component.html
    ```

1. Since we have our form working, remove the form status table.
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
    <b>Exercise</b>: Updating Todo list on save 
</h4>

Now that we have the Todo list being stored in the todoList variable, when we save a new todo item, we can add it to the todoList array and the todo list will automatically update with the change.

1. Open todo.component.ts

    ```bash
    todo.component.ts
    ```

1. In the todo.component.ts file, we need to update the save function to push the save result into the todoList array. We need to add this code into the subscribe of the `TodoService.save` call. 

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

    ```bash
    todo.service.ts
    ```

1. We are going to create an update method that will take in a Todo item and make an  http put call to our API to update the one record with the new completion state.

    ```TypeScript
    updateTodo(todo: Todo): Observable<Todo> {
        let url = `https://dj-sails-todo.azurewebsites.net/todo/${todo.id}`;

        return this.http.put(url, todo, this.options)
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

    ```bash
    todo.component.ts
    ```

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

    ```bash
    todo.component.html
    ```

1. Inside the ngFor loop, above the existing div that is displaying the individual item, add the following icon that uses the Font Awesome library for the icon and is set to take up 1 column of space

    ```html
      <div class="col-1" (click)="completeTodo(todoItem)"><i [className]="todoItem.completed == true ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i></div>
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
        let url = `https://dj-sails-todo.azurewebsites.net/todo/${todo.id}`;
        return this.http.delete(url, this.options)
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
    <div class="col-1" (click)="completeTodo(todoItem)"><i [className]="todoItem.completed == true ? 'fa fa-check-square-o' : 'fa fa-square-o'"></i></div>

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
