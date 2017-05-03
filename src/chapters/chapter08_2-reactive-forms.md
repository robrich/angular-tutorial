## Reactive Forms

In the previous chapter, we took a look at template based forms.  In this chapter will will take a look at reactive based forms.

Reactive forms allow you to define the form fields and validation in the component instead of the template.  You can easily test the form fields and validation logic.  You can also dynamically build the form and validation in the component.

We are going to build the form to enter our Todo items using Reactive forms.


### Create Component

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

<h4 class="exercise-start">
    <b>Exercise</b>: Importing the ReactiveFormsModule
</h4>

Our component is going to use the ReactiveFormsModule which means that we need to tell Angular to include this module in the imports statement it in the app module.  

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
    <b>Exercise</b>: Updating the Todo Component TypeScript File
</h4>

Now we are ready to add all of the functionality to the component for the UI to interface with.  The controllers in Angular 2 are called components and are TypeScript files.  For the todo component it is the src\app\todo\todo.component.ts file.  We need to add the Form and Todo import statements, add several variables into the component's class and tell Angular about the addForm group.

1. Open the todo\todo.component.ts file
1. We need to import a few items  

    ```TypeScript
    import { FormGroup, FormBuilder, Validators } from '@angular/forms';
    import { Todo } from '../shared/classes/todo';
    ```
1. We need to create serveral variables within the TodoComponent  class

    ```TypeScript
    todoList: Array<Todo> = [];
    addForm: FormGroup;
    todo: Todo = new Todo();
    submitting: boolean = false;
    errorMessage: string;
    openItemCount: number = 0;
    ```

    * todoList -> holds our todo list.  Is an Array of Todo.
    * addForm -> holds our configuration for the add form
    * todo -> class to hold the values from our add form
    * submitting -> used in the UI to toggle on and off features and change text of the add button
    * errorMessage -> holds any error messages from the service calls and used to toggle div in UI 
    * openItemCount -> holds the number of items that need to be completed

1. In the TodoComponent constructor we need to inject FormBuilder and TodoService plus configure the addForm.

    ```TypeScript
    constructor(private formBuilder: FormBuilder) {
        this.addForm = formBuilder.group({
            'name': ['', [Validators.required]]
        });
    }
    ```    

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>:  Creating the todo UI 
</h4>

We are now ready to create our UI. 

1. Open the src\app\todo\todo.component.html file that was generated for you and replace the contents with:

    ```html
    <div class="container todo-wrapper">
        <div class="page-header">
            <h1 align="center">Todo List</h1>
            <p class="text-center lead">You've got <em>{{ openItemCount }}</em> things to do</p>
        </div>
        <form role="form" [formGroup]="addForm" (ngSubmit)="createTodo()" class="text-center">
            <div class="form-group">
            <input type="text" class="form-control input-lg" formControlName="name" id="name" placeholder="Add Todo!" [(ngModel)]="todo.name"><button
                type="submit" class="btn btn-primary btn-lg" [disabled]="!addForm.valid || submitting"><span *ngIf="!submitting">Add</span><span *ngIf="submitting">Adding...</span></button>
            </div>
            <div class="row errors">
            <div class="col-md-12">
                <div *ngIf="addForm.controls.name.errors && addForm.controls.name.dirty" class="alert alert-danger">
                <div [hidden]="!addForm.controls.name.errors.required">
                    Title is required
                </div>
                </div>
                <div *ngIf="errorMessage" class="alert alert-danger" role="alert">
                There was an error submitting your todo. Please try again.
                </div>
            </div>
            </div>
        </form>
        <div class="row">
            <div class="col-md-12">
            <div class="todo" *ngFor="let todoItem of todoList">
                <span class="pull-left" (click)="completeTodo(todoItem)"><i [className]="todoItem.completed ? 'check-square-o' : 'square-o'"></i></span>
                <span class="done-{{todoItem.completed}}">{{todoItem.name}} <small>created: {{todoItem.createdAt | date:'short'}}</small></span>
                <span class="pull-right" (click)="deleteTodo(todoItem)"><i class="times"></i></span>
            </div>
            </div>
        </div>
    </div>
    ```

    The html is doing a lot:

    1. Show a title for the page
    1. Show a form to add new todo item along with form validation
    1. Show the list of todo list with icons to complete and delete todo items
    1. You can see several Angular ways of implementing functionality using the clauses below:
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

1. If you view the site again you should see a UI similar to:

    ![Todo Unstyled](images/todo-unstyled.png)

<div class="exercise-end"></div>

### Adding Style

<h4 class="exercise-start">
    <b>Exercise</b>: Making the UI Pretty
</h4>

Right now the UI looks pretty plain.  The add textbox and add button are on different lines and there is no indication if you have met the requirements to for the todo item to be added.  The only styling right now is the bootstrap classes.  

With Angular 2, we can finally have component level css instead of cluttering up the global css space.  The compoment level css will add an attribute to each of the html element within the components template and update the component scss file to prefix all of the css classes with the attribute.  

1. Open the src\app\todo\todo.component.scss 
1. Add the following contents to the file.  To ensure we are following our branding, we are importing our scss color variables.

    ```scss
     @import "../../assets/bootstrap/variables";

    .todo-wrapper {
        width: 100%;

        .ng-valid:not(form) {
            border-left: 5px solid $green;
        }

        .ng-invalid:not(form) {
            border-left: 5px solid $red;
        }

        div.todo {
            padding-bottom: .2em;
            padding-top: .2em;
            border-bottom: 1px solid $light-gray; 
            font-size: 1.4em;

            small {
                font-size: .7em;
                color: lightgrey;
            }

            i {
                width: 40px;
                padding-right: 10px;
                vertical-align: middle
            }

            .done-true {
                text-decoration: line-through;
                color: $light-gray;
            }
        }

        .errors {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        form {
            padding-bottom: 1em;
            input[type="text"] {
                width: 80%;
                float: left;
                font-size: 2em;
                margin-right: 1%;
            }

            button {
                width: 19%;
            }
        }
    }
    ```

1. Now if you view the UI it should look like below.  
    
    ![unstyled ui](images/todo-styled.png)

    * Add form has spacing between the textbox and the button.
    * There is more padding in the todo item list 
    * The created date is muted with a light gray color
    * There is a gray line between each of the todo items
    * The text and icons in the todo list is bigger
    * There is a red line on the left side of the textbox to indicate it is required.  It will turn green once there is a value in the box. 

1. Before we can interact with the data we need to create our service and call the service from the TodoCompoment.

<div class="exercise-end"></div>
