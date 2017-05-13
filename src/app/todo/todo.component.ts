import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import { TodoService } from '../shared/services/todo.service';
import { Todo } from '../shared/classes/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  addForm: FormGroup;
  private validationMessages = {
    required: 'Todo item is required.',
    minlength: 'Must be at least 3 characters'
  };
  todoList: Array<Todo> = [];
  errorMessage: string;
  openItemCount: number = 0;
  formErrorMessage: string;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      'item': ['', [Validators.required, Validators.minLength(3)]]
    });

    const itemControl = this.addForm.get('item');
    itemControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setMessage(itemControl));

    this.getTodoListAll();
  }

  calculateOpenItems(): void {
    this.openItemCount = this.todoList.filter(item => item.completed === false).length;
  }

  save(): void {
    this.todoService.save(this.addForm.value.item)
      .subscribe(result => {
        console.log('save result', result);
        this.todoList.push(result);
        this.openItemCount++;
         this.sortItems();
        this.addForm.reset();
      },
      error => {
        this.errorMessage = <any>error;
      });
  }

  getTodoListAll(): void {
    this.todoService.getAll()
      .subscribe(
      data => {
        this.todoList = data;
        this.calculateOpenItems();
         this.sortItems();
      },
      error => {
        this.errorMessage = <any>error;
      }
      );
  }


  completeTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo)
      .subscribe(
      data => {
        this.calculateOpenItems();
         this.sortItems();
      },
      error => {
        todo.completed = !todo.completed;
        this.errorMessage = <any>error;
        console.log('complete error', this.errorMessage);
      });
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo)
      .subscribe(
      data => {
        let index = this.todoList.indexOf(todo);
        this.todoList.splice(index, 1);
        this.calculateOpenItems();
      },
      error => {
        todo.completed = !todo.completed;
        this.errorMessage = <any>error;
        console.log('complete error', this.errorMessage);
      });
  }

  setMessage(c: AbstractControl): void {
    this.formErrorMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.formErrorMessage = Object.keys(c.errors).map(key =>
        this.validationMessages[key]).join(' ');
    }
  }

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

  sortItems(): void {
    this.todoList.sort(this.fieldSorter(['completed', 'item'], true));
  }


}
