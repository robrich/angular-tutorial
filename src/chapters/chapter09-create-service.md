## Angular Service

### Overview

### Goals

### Creating Todo Service 

<h4 class="exercise-start">
    <b>Exercise</b>: Creating the Todo Service 
</h4>

1. Create the directory shared\services
1. Run the Angular Cli generate command to create the todo service 

    ```bash
    ng generate service shared\services\todo
    ```
1. Open the shared\services\todo.service.ts file that was just generated
1. Add the following import statements 

    ```TypeScript
    import { Todo } from '../classes/todo';
    import { Http, Headers, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
    import { Observable } from 'rxjs/Rx';
    import { environment } from '../../../environments/environment';
    ```

    * ../classes/todo is the class the we created earlier
    * @anglar/http is from angular and allows us to make http calls such as calling our Api
    * rxjs/Rs gives us Observables which is a replacement for Promises
    * ../../../environments/environment allows us to access the environment variables we setup such as the Api url

1. Right after all of the import statements and before the @Injectable create a variable to hold our Api url.

    ```TypeScript
    let todoUrl = environment.apiBaseUrl + '/todos';
    let options = new RequestOptions({ withCredentials: true });
    ```    

1. In the TodoService constructor you need to inject Http

    ```TypeScript
    constructor(private http: Http) {
    }
    ```

We are now ready to start creating our functions for our CRUD (create, read, update and delete)

Within the TodoService class we will add the CRUD functions.  All of the functions use the http option withCredentials which tells the browser that it is ok to pass the name of the logged in user to the Api.  

1. The first thing we are going to add is a standard error handler.  Right now, this function really is just a placeholder until we have a standard for how errors should be handled. 

    ```TypeScript
    // TODO
    // implement exception handling strategy
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
    ``` 

1. To create new todo items we are going to create the addTodo function.  The Api returns a single Todo item.

    ```TypeScript
    addTodo(todo: Todo): Observable<Todo> {
        let body = JSON.stringify({
            name: todo.name,
            completed: false
        });

        return this.http.post(todoUrl, body, options)
        .map((res: Response) => <Todo>res.json())
        .catch(this.handleError);
    }
    ```

1. To get the list of todo items we will create the getList function.  The api returns an array of Todo items.

    ```TypeScript
    getList(): Observable<Todo[]> {
        return this.http.get(todoUrl, options)
        .map((res: Response) => <Todo>res.json())
        .catch(this.handleError);
    }
    ```

1. To update a todo item we will create the updateTodo function. The Api returns the Todo item that was updated.

    ```TypeScript
    updateTodo(todo: Todo): Observable<Todo> {
        let body = JSON.stringify({
            name: todo.name,
            completed: todo.completed,
            createdAt: todo.createdAt,
            updatedAt: todo.updatedAt,
            id: todo.id
        });

        return this.http.put(todoUrl + '/' + todo.id, body, options)
        .map((res: Response) => <Todo>res.json())
        .catch(this.handleError);
    }
    ```

1. To delete a todo item we will create the deleteTodo function. The Api returns the Todo item that was deleted.

    ```TypeScript
    deleteTodo(todo: Todo): Observable<Todo> {
        return this.http.delete(todoUrl + '/' + todo.id, options)
        .map((res: Response) => <Todo>res.json())
        .catch(this.handleError);
    }
    ```


In order to use the TodoService, we need to tell Angular about the service and make it available.

1. Open the src\app\app.module.ts file
1. Import the TodoService

    ```TypeScript
    import { TodoService } from './shared/services/todo.service';
    ```

1. In the @NgModule providers list you need to add the TodoService

    ```TypeScript
    providers: [TodoService],
    ```
<div class="exercise-end"></div>
 

### Call Service from Todo Component


<h4 class="exercise-start">
    <b>Exercise</b>: Import TodoService
</h4>

In order to use the TodoService within the TodoComponent, we need to import the TodoService and inject it into the construct of the TodoComponent

1. Add the following import statements

    ```TypeScript
    import { TodoService } from '../shared/services/todo.service';
    ```

1. Add the TodoService to the construct parameters like the following.  This will automatically create a scoped variable called todoService that can be used from within the TodoCompoment.

    ```TypeScript
    constructor(private formBuilder: FormBuilder, private todoService: TodoService) {
        this.addForm = formBuilder.group({
        'name': ['', [Validators.required]]
        });
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Get Data
</h4>

In order to get data from our service, we need to call the getList function that is part of the TodoService.  This function returns an Observable<Todo[]>  which is an array of the Todo class.  In order to consume the Observable we need to use the subscribe method.  

1. After the ngOnInit function add the following function to get the count of open todo items

    ```TypeScript
    calculateOpenItems(): void {
        this.openItemCount = this.todoList.filter(item => item.completed === false).length;
    }
    ```

1. After the ngOnInit function within the TodoComponent add the following function

    ```TypeScript
    getTodoListAll(): void {
        this.todoService.getList()
        .subscribe(
            data => {
                this.todoList = data;
                this.calculateOpenItems();
            },
            error => {
                this.errorMessage = <any>error;
                console.log('error getting list', this.errorMessage);
            }
        );
    }
    ```

1. In the ngOnInit function you need to call the getListAll function

    ```TypeScript
    this.getTodoListAll();
    ```
     
<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Add New Todo Record
</h4>

In order to create new todo item we need to call the addTodo function that is part of the TodoService.  This function returns an Observable<Todo>  which is a single instance of the Todo class.  In order to consume the Observable we need to use the subscribe method.  

Insert the createTodo function after the getTodoListAll function

```TypeScript
createTodo(): void {
    this.submitting = true;
    this.errorMessage = "";

    this.todoService.addTodo(this.todo)
    .subscribe(
        data => {
            this.submitting = false;           
            this.todoList.push(data); // add to list
            this.openItemCount++; // update open count
            this.addForm.reset(); // reset the form to original state
        },
        error => {
            this.submitting = false;
            this.errorMessage = <any>error;
            console.log('create error', this.errorMessage);
        }
    );
}
```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Complete Todo 
</h4>

In order to complete a todo item we need to call the completeTodo function that is part of the TodoService.  This function returns an Observable<Todo>  which is a single instance of the Todo class.  In order to consume the Observable we need to use the subscribe method.  


Insert the completeTodo function after the createTodo function

```TypeScript
completeTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo)
        .subscribe(
            data => {
                this.calculateOpenItems();
            },
            error => {
                todo.completed = !todo.completed;
                this.errorMessage = <any>error;
                console.log('complete error', this.errorMessage);
            }
        );
}
```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Delete Todo
</h4>

In order to delete a todo item we need to call the deleteTodo function that is part of the TodoService.  When you delete a record with a Sails API, it returns back the record that we just deleted hence the deleteTodo function returns an Observable<Todo>.  In order to consume the Observable we need to use the subscribe method.  After the item is delete from the data store, we remove it from the todoList array.

Insert the deleteTodo function after the completeTodo function

```TypeScript
deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
        .subscribe(
            data => {
                let item = this.todoList.indexOf(todo);
                this.todoList.splice(item, 1);
                this.calculateOpenItems();
            },
            error => {
                this.errorMessage = <any>error;
                console.log('delete error', this.errorMessage);
            }
        );
}
```

<div class="exercise-end"></div>

### Sort in the UI

<h4 class="exercise-start">
    <b>Exercise</b>: Sorting in the Client
</h4>

Right now the data from the API comes back sorted, kind of.  It is case sensitive and sorts name and then completed state.  However, as you interact with the UI creating, completing and deleting todo item, the list does not stay sorted.  In order to make it stay sorted, we need to add a sorting method in the UI.  

The sorting method needs to be case insensitive and sort by multiple fields (name and completed).  

With ES6 and TypeScript we can use a map and reduce function to accomplish this task.  We can even have it sort if needed in decending order by appending on a - sign to the field name.

```TypeScript
 fieldSorter(fields, ignoreCase) {
    return (a, b) => fields.map(o => {
      let dir = 1;
      if (o[0] === '-') { dir = -1; o = o.substring(1); }
      if (ignoreCase === true && typeof a[o] === 'string' && typeof b[o] === 'string') {
        a[0] = a[o].toLocaleLowerCase();
        b[o] = b[o].toLocaleLowerCase();
      }

      return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
    }).reduce((p, n) => p ? p : n, 0);
  }

```

Now that we have our generic sorting method, we can create a function to do the actual sorting

```TypeScript
sortItems(): void {
    this.todoList.sort(this.fieldSorter(['completed', 'name'], true));
}
```

The last thing we need to do is to call the sortItems function in the createTodo, completeTodo and deleteTodo in the subscribe function

```
this.sortItems();
```

When you use interact with the UI to view, create, complete, and delete todo items, the list will stay sorted by name and then complete state.  The sort is case insensitive and the open items should be on the top of the list.

<div class="exercise-end"></div>
