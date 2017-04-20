## Bonus: Sails Custom Functions

You already saw in a previous chapter that you could override the built-in REST api methods.  You can also create your own custom methods to provide additional functionality.  To demonstrate this we are going to add in the feature to return only the open todo list items.  

### Add Only Open Api Function

<h4 class="exercise-start">
    <b>Exercise</b>: Add Find Only Open Api Function
</h4>

In the api\TodoController.js file we need to add the following function.  The function will return results where WWID matches the isso WWID and completed field is set to false.

```javascript
findOnlyOpen: function (req, res) {
    var wwid = req.session.isso.raw.id;
    Todo.find({ wwid: wwid, completed: false })
        .then(function (findModelResults) {
            res.json(200, findModelResults);
        })
        .catch(function (findModelError) {
            res.json(500, findModelError);
        });
}
```
<div class="exercise-end"></div>


**UI Service: todo.service.ts**

We need to add a function to the TodoService to call the findOnlyOpen api function.

<h4 class="exercise-start">
    <b>Exercise</b>: Adding Angular Service Method
</h4>

In the todo.service.ts file add a function called getListOnlyOpen.

```TypeScript
  getListOnlyOpen(): Observable<Todo[]> {
    return this.http.get(todoUrl + '/findOnlyOpen', {withCredentials: true})
      .map((res: Response) => <Todo>res.json())
      .catch(this.handleError);
  }
```

<div class="exercise-end"></div>


**UI: todo.component.ts**

<h4 class="exercise-start">
    <b>Exercise</b>: Add Filter to TodoComponent
</h4>

1. Add the variable showOnlyOpen to the TodoComponent so that we can track the state of the checkbox.

        showOnlyOpen: boolean = false;

1. Add the getOnlyOpen function.  This function will be used when the checkbox is checked. 

        getOnlyOpen() {
            console.log('getOnlyopen', this.showOnlyOpen);
            this.todoService.getListOnlyOpen()
            .subscribe(
                data => {
                    this.todoList = data;
                },
                error => {
                    this.errorMessage = <any>error;
                    console.log('getOnlyopen error', this.errorMessage);
                }
            )
        }

1. You might have noticed in the getOnlyOpen that there is no check if the checkbox is actually checked.  Instead of cluttering up function we are going to get a getTodoList function that will do the check and determine which function to run to pull the todo list.  

        getTodoList(): void {
            if (this.showOnlyOpen) {
            this.getOnlyOpen();
            } else {
            this.getTodoListAll();
            }
        }


1. The lat thing to do is update the ngOnInit to call the getTodoList instead of getTodoListAll

          ngOnInit() {
            this.getTodoListAll();
        }


<div class="exercise-end"></div>

**UI: todo.component.html**

We are going to add a checkbox on the UI in order to filter call the controller method to filter the list.

<h4 class="exercise-start">
    <b>Exercise</b>: Add UI Filter
</h4>

In the todo.component.html file, before the div for the *ngFor, add the below html for the checkbox

```html
<input type="checkbox" [(ngModel)]="showOnlyOpen" (ngModelChange)="getTodoList()">Only Open<br />
```

You are now ready to test that the url is able to filter the todo list to show only open ones.  If you do not have any todo items that have been completed, you will want to complete at least 1 so that you can see if disappear out of the results.

<div class="exercise-end"></div>


### Optional: Controlling the Api Route Url

In the Api project, you can also change how to route to the custom method by setting your own route in the config\routes.js file.  There is examples of doing this for the App Generator ExampleController. Right now the url is http://localhost:1337/v1/todos/findOnlyOpen .  To be more restful you might change it to something like http://localhost:1337/v1/todos/open.