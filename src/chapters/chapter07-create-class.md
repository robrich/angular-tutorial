## Create TypeScript class

<h4 class="exercise-start">
    <b>Exercise</b>: Creating an Object to Hold Data
</h4>

Before we implement our UI we need to create a class that will be used to hold all of the data for a todo item.  By creating classes, it gives us type safety and contract for what the data should look like.

To generate our class, we are going to use the Angular CLI.  The command below will create a todo.ts file in the src\app\todo directory

1. Create the directory shared\interfaces
1. Run the Angular Cli generate command to create the todo.ts file

    ```bash
    ng g class shared\classes\todo
    ```

1. Open the todo.ts file and add the following variables to the todo class.  The id, createdAt, and updatedAt are supplied from the Api. Note that the constructor is helpful in instantiating objects during testing.

    ```javascript
    export class Todo {
        constructor(
            name: string = '',
            completed: boolean = false,
            id: string = '',
            createdAt: Date = new Date(),
            updatedAt: Date = new Date()
        ) {
            this.name = name;
            this.completed = completed;
            this.id = id;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }

        name: string;
        completed: boolean
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }
    ```

<div class="exercise-end"></div>    