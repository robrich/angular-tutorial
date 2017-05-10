## Bonus: Additional Todo Features

### Displaying Open Item Count

It would be nice to know how many todo items that the user has and display that in the UI.  You will need to make sure to update the open number when pulling, updating, and deleting todo items.

<h4 class="exercise-start">
    <b>Exercise</b>: Calculating Open Items
</h4>

1. Open the src\app\todo\todo.component.ts file
1. Create a variable to hold the open count in the TodoCompoment class that is of type number

    ```TypeScript
    openItemCount: number = 0;
    ```

1. Add the following function to get the count of open todo items by using the filter function to look for items where the completed value is false.

    ```TypeScript
    calculateOpenItems(): void {
        this.openItemCount = this.todoList.filter(item => item.completed === false).length;
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Updating Open Item Count on Fetch
</h4>

1. In the getTodoListAll function, add a call to the calculateOpenItems function after setting the todoList variable to data.  

    ```TypeScript
    getTodoListAll(): void {
        this.todoService.getAll()
        .subscribe(
        data => {
            this.todoList = data;
            this.calculateOpenItems();
        },
        error => {
            this.errorMessage = <any>error;
        });
    }
    ```
     
<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Update Open Item Count on Add
</h4>

1. In the todo.component.ts file increment the openItemCount in the save function

    ```TypeScript
    save(): void {
        this.todoService.save(this.addForm.value.item)
            .subscribe(result => {
                console.log('save result', result);
                this.todoList.push(result);
                this.openItemCount++;
            },
            error => {
                this.errorMessage = <any>error;
            });
    }
    ```

<div class="alert alert-info" role="alert">Since we are just adding a new record and are not pulling a new todo list array from the service, we can just increment the openItemCount variable.</div>


<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Complete Todo 
</h4>

When we toggle the completion status of a Todo item we also need to update the openItemCount value.

In the completeTodo, upon returning the data from the TodoService.updateTodo call, we need to update the openItemCount. To do this, we will call the calculateOpenItems function.

The reason that we did not just subtract from the openItemCount is that we are able to toggle completion status so sometime you will need to add and other times you will need to subtract.  Instead of having to create this logic, we can just call the calculateOpenItems function to do the work for us.

1. In the todo.component.ts file, find the completeTodo function and add the call to calculateOpenItems in the returned data

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
        });
}
```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Delete Todo
</h4>

The last thing we need to do is to decrement the openItemCount when an item is deleted.

1.  In the todo.component.ts file, find the deleteTodo function and add the call to the calculateOpenItems function after removing the deleted item from the todoList.

```TypeScript
deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
        .subscribe(
        data => {
            let index = this.todoList.indexOf(todo);
            this.todoList.splice(index, 1);
            this.openItemCount--;
        },
        error => {
            todo.completed = !todo.completed;
            this.errorMessage = <any>error;
            console.log('complete error', this.errorMessage);
        });
}
```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Open Item Count to UI
</h4>

The last thing we need to do is add the open item count to the UI.  It should automatically update as items are added, updated, and deleted.

1. Open the todo.component.html file
1. Inside of the page-header div after the "Todo List" title, add the following html

    ```html
    <p class="lead">You've got <em>{{openItemCount}}</em> things to do</p>
    ```

1. The UI should now look like

    ![open item count display](images/todo-open-items.png)    

<div class="exercise-end"></div>

### Sort in the UI


Right now the data from the API comes back unsorted.  It is ordered based on the order that they were added.  Instead it would be much better if we sorted the todo items based on the text and completion status.  The completed items should be at the bottom.  As well the sort should be case insensitive.  


With ES6 and TypeScript we can use a map and reduce function to accomplish this task. 

<h4 class="exercise-start">
    <b>Exercise</b>: Sorting in the Client
</h4>

1. Open the todo.component.ts file
1. Add the following code to create a generic array sort function

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

    *  We can even have it sort if needed in decending order by appending on a - sign to the field name.

    <div class="alert alert-info" role="alert">The fieldSorter function is generic and can be reused on any array sort call.</div>


1. Now that we have our generic sorting method, we can create a function to do the actual sorting that can be called in the save, completedTodo and deleteTodo functions

    ```TypeScript
    sortItems(): void {
        this.todoList.sort(this.fieldSorter(['completed', 'name'], true));
    }
    ```

1. The last thing we need to do is to call the sortItems function in the save, completeTodo and getTodoListAll functions.  Make sure to place the call after any updates to the todoList have occurred

    ```
    this.sortItems();
    ```

    * We do not need to call the sort in the deleteTodo since the list will already be sorted and we are only removing a single item.

1. Now when you use interact with the UI the list will stay sorted by name and complete state.  The sort is also case insensitive and the open items should be on the top of the list.

    ![sorted output](images/todo-sorted.png)
    

<div class="exercise-end"></div>


### Reset Form After Save

Right now after you add a new todo item, the form does not clear out the input box.  Then when you go to clear it out, the required field validator will be fired.

Instead, we can clear out the field on a successful save call by adding a call to `this.addForm.reset();`

```TypeScript
```
