## Bonus: Additional Todo Features

### Overview

Right now the Todo UI is fully functional but there is some nice usability enhancements we could implement.  For example:   

* The todo list is sorted by when it was created, it would be much nicer to sort alphabetically and by completion status.  
* There is no way to see a count of how many items you have open.
* The add form is not cleared out on successful save.

### Goals

* Show how to sort on the client side
* Show how to reset a form
* Show how to a filtered an array and display the count of filtered items

### Code from Previous Chapter

<div class="alert alert-danger" role="alert">Skip this section if you completed the previous chapter</div>

If you have not completed the previous chapter you can get the completed code by downloading the code from Github.

<h4 class="exercise-start">
    <b>Exercise</b>: Downloading Code 
</h4>

1. Downloading and extracting the zip file into your projects folder (c:\projects or ~/projects) at [https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-header-footer.zip](https://github.com/digitaldrummerj/angular-tutorial-code/archive/chapter-header-footer.zip) 
1. After you get the code, run npm install to get all of the NPM dependencies.

    ```bash
    npm install
    ```

1. Open Visual Studio Code
1. In Visual Studio Code, go under the File menu, select Open folder and navigate to the folder that you unzipped the files into
1. If you have ng serve running in a different editor, make sure to stop it from running.
1. Open the Integrated Terminal in Visual Studio Code (ctrl + `)  and run ng serve

    ```bash
    ng serve
    ```

<div class="exercise-end"></div>

### Displaying Open Item Count

It would be nice to know how many todo items that the user has and display that in the UI.  

Requirements:

* Display a count a open todo items without querying the API
* Update the count when getting, updating and deleting the todo item list. 

<h4 class="exercise-start">
    <b>Exercise</b>: Calculating Open Items
</h4>

1. Open the src\app\todo\todo.component.ts file

    ```bash
    todo.component.ts
    ```
    
1. Create a variable to hold the open count in the TodoComponent class that is of type number with a default value of 0

    ```TypeScript
    openItemCount: number = 0;
    ```

1. Create a function called calculateOpenItems that filters the todoList to only show when the completed status is false and get the length.

    ```TypeScript
    calculateOpenItems(): void {
        this.openItemCount = this.todoList.filter(item => item.completed === false).length;
    }
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Calculate Item Count When Pulling Items
</h4>

1. In src\app\todo\todo.component.ts that we already have open, find the getTodoListAll function and add a call to the calculateOpenItems function after setting the todoList variable but still within the `data` function.  

    ```TypeScript
    this.calculateOpenItems();
    ```
     
<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Add Open Item Count to UI
</h4>

Now that we have the todo open item count being calculating on component render, we are going to add it to the UI.  For now it will only be updated on component render.

1. Open the src\app\todo\todo.component.html file

    ```bash
    todo.component.html
    ```

1. Inside of the page-header div after the "Todo List" title, add the following html

    ```html
    <p class="lead">You've got <em>{{openItemCount}}</em> things to do</p>
    ```

1. The UI should now look like

    ![open item count display](images/todo-open-items.png)    

<div class="exercise-end"></div>



<h4 class="exercise-start">
    <b>Exercise</b>: Update Open Item Count on Add
</h4>

1. Open src\app\todo\todo.component.ts 

    ```bash
    todo.component.ts
    ```
    
1. Find the save method and increment the openItemCount after we push the new item into the todoList array

    ```TypeScript
    this.openItemCount++;
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Update Open Item on Complete 
</h4>

When we toggle the completion status of a Todo item we also need to update the openItemCount value.  We want to make this update after successfully calling the TodoService.updateTodo service function.  Since it is a toggle we need to have a little bit of logic to figure out if the item was originally completed or not.  

1. In the todo.component.ts file

    ```bash
    todo.component.ts
    ```
    
1. Find the completeTodo function and add the logic below in the subscribe data.  This logics reads if the todo item is completed then decrement the openItemCount else increment the openItemCount;

    ```TypeScript
    todo.completed ? this.openItemCount-- : this.openItemCount++;
    ```

<div class="exercise-end"></div>

<h4 class="exercise-start">
    <b>Exercise</b>: Update Open Item on Delete
</h4>

The last thing we need to do is to re-calculate the openItemCount when an item is deleted.  We don't just decrement since a user can delete a completed it and there is no sense in adding in additional logic since the calculateOpenItems already has the logic.

1.  In the src\app\todo\todo.component.ts file

    ```bash
    todo.component.ts
    ```
    
1. Find the deleteTodo function and add logic to decrement the openItemCount if the todo item being deleted was not completed.  You will want to put this call after the splice that removes the item from the todo list

    ```TypeScript
    if (todo.completed === false) this.openItemCount--;
    ```

<div class="exercise-end"></div>

Now when you fetch, add, complete or delete a todo item the open item count will be updated accordingly.  

### Sort in the UI

Right now the data from the API is unsorted which makes the list hard to read.  It would be better sort alphabetically with the uncompleted items at the top.  

#### Requirements

* Sort by multiple fields
* Sort is case insensitive
* Sort for text fields can be done either ascending or descending 
* Sort should be generic and able to be used on any array
* Completed items are at the bottom of the list
* Each item is sorted by its text after sorting by the completed status
* The sort is done on the client side and not in the API
* Sorting is done when fetching, adding, and completing
* Sorting does not need to be updated when deleting since the list is already sorted and we are just removing an item
 

<h4 class="exercise-start">
    <b>Exercise</b>: Creating Generic Function
</h4>

1. Open the Integrated Terminal
1. Use ng to generate a new class called FieldSorter in the shared/classes folder

    ```bash
    ng generate class shared/classes/FieldSorter
    ```

1. Open the src/app/shared/classes/field-sorter.ts file

    ```bash
    field-sorter.ts
    ```

1. To the FieldSorter class add the sort class below.  

    ```TypeScript
    // made static in order to not have to new up the class to use
    public static sort(fieldNames: Array<string>, ignoreCase: boolean) {
        return (item1: object, item2: object) => fieldNames.map((field: string) => {
            // A-Z sorting
            let direction: number = 1;

            // if field starts with - then Z-A sorting
            // strip off the - sign from field name
            if (field.substring(0, 1) === '-') {
                direction = -1;
                field = field.substring(1);
            }

            // capture values so as not to change the original array field value
            // important when doing case insensitive searches else items would display in lowercase
            let item1Value = item1[field], item2Value = item2[field];

            // if ignoring case and field value is a type of string then call toLocaleLowerCase on both fields.  Used toLocaleLowerCase to accord for culture based sorting
            if (ignoreCase === true) {
                if (typeof item1Value === 'string') item1Value = item1Value.toLocaleLowerCase();
                if (typeof item2Value === 'string') item2Value = item2Value.toLocaleLowerCase();
            }

            // item1 is higher = 1, lower = -1, equal = 0
            return item1Value > item2Value ? direction : item1Value < item2Value ? -(direction) : 0;
        }).reduce((item1SortValue: number, item2SortValue: number) => {
            // values will be 1 or 0 based on the map function output.
            // if item1SortValue is 1 and item2SortValue is 0 then item1 goes 1st
            // if item1SortValue is 0 and item2SortValue is 1 then item2 goes 1st
            // if both are equal then item2 will go 1st
            return item1SortValue ? item1SortValue : item2SortValue
        }, 0);
    }
    ```

    * We are using the map and reduce functions to accomplish our sorting task 
    * It is a static function so that you do not have to new up the class in order to use it  
    * Parameters are an array of fieldNames that corresponds to a field in the array you are sorting and a boolean to decide if case is ignored
    * If you start a field name with a minus sign if will sort it descending

<div class="exercise-end"></div>


<h4 class="exercise-start">
    <b>Exercise</b>: Add Sorting to UI
</h4>

Now that we have our generic sorting method, we can create a function to do the actual sorting that can be called in the save, getTodoListAll, and completedTodo.  

1. Open src\app\todo\todo.component.ts

    ```bash
    todo.component.ts
    ```

1. Add the following function to call the FieldSorter.sort and sort first by completed status and then by name.  

    ```TypeScript
    sortItems(): void {
        this.todoList.sort(FieldSorter.sort(['completed', 'item'], true));
    }
    ```

1. In the save, completeTodo and getTodoListAll functions after we have updated the todoList array, call the sortItems function

    ```
    this.sortItems();
    ```

1. Now when you fetch, add, and update todo items the list will stay sorted by completed status and then by item text.  The sort is also case insensitive.
    ![sorted output](images/todo-sorted.png)
    
<div class="exercise-end"></div>


### Reset Form After Save

Right now after you add a new todo item, the form does not clear out the input box.  This is really annoying as a user since you would not be entering the same todo item multiple times.  Since we only have 1 field we could set the field value to a blank string in the save method but that would not reset state.  Instead we want to call the reset function that is part of the FormGroup that we defined addForm as.   

<h4 class="exercise-start">
    <b>Exercise</b>: Add Sorting to UI
</h4>

1. Open src\app\todo\todo.component.ts

    ```bash
    todo.component.ts
    ```

1. Find the save function and in the result section add the form reset call

    ```TypeScript
    this.addForm.reset();
    ```
    
<div class="exercise-end"></div>


### Confirm Before Deleting

Right now when you delete an item it does not ask you at all for a confirmation.  This is a bad user experience as they could accidentally delete something important.

There are 3 ways that we could accomplish the confirmation:

1. Create a custom dialog component that we can customize the look and feel of.
1. Use an component that someone else built like [https://github.com/mattlewis92/angular-confirmation-popover#installation](https://github.com/mattlewis92/angular-confirmation-popover#installation)
1. Use the built-in browser confirmation dialog.  With this option we do not have any control of the look and feel, only the title and message.

For the sake of this workshop, we are going to go with option #3.

<h4 class="exercise-start">
    <b>Exercise</b>: Add Delete Confirmation
</h4>

1. Open src\app\todo\todo.component.ts

    ```bash
    todo.component.ts
    ```

2. Find the deleteTodo function and wrap the contents of the function in the confirm call below.  Since TypeScript is just a super set of JavaScript we are able to use the confirm JavaScript syntax.

    ```TypeScript
    if (confirm("Are you sure you want to delete?")) {
        // delete call goes here
    }
    ```

<div class="exercise-end"></div>
