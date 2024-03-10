import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { TODOS_CATEGORY, TODOS_CRITERIA } from '../../enums/dashboard';
import { TodoService } from '../todo-list/todo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import ITodo from '../../interfaces/IDashboardCount';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {
  form?: FormGroup;
  categories: [string, string | TODOS_CATEGORY][] = Object.entries(TODOS_CATEGORY);
  criterias: [string, string | TODOS_CRITERIA][] = Object.entries(TODOS_CRITERIA);
  id: string | null = null;
  constructor(private fb: FormBuilder, private service: TodoService, private route: ActivatedRoute, private _snackBar: MatSnackBar) {
    console.log(Object.entries(TODOS_CATEGORY));
    console.log(Object.entries(TODOS_CRITERIA))
   }

  loadData$ =
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.id = params.get('id') && params.get('id') !== "new" ? params.get('id'): null;
        if (this.id) {
          return this.service.getTodo(this.id);
        } else {
          return of(null);
        }
      })
    );

  get tasks() {
    if (!this.form) {
      return [];
    }
    return (<FormArray>this.form.get('tasks')).controls;
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      star: false,
      criteria: TODOS_CRITERIA.TODAY,
      category: TODOS_CATEGORY.HEALTH,
      tasks: this.fb.array([]),

    });
    console.log('Form Value', this.form.value);

    this.loadData$.subscribe(data => {
      if(data){
        const todo = {...data};
        this.form?.patchValue(data);
        data.tasks.forEach(task => {
          this.addTask(task);
        })
      }
    });

  }


  saveForm() {
    console.log(this.form?.getRawValue());
    let api;

    const payload: ITodo = {...this.form?.getRawValue()};
    payload.tasks = this.tasks.map((task: any)=> task.get("title").value)
    //delete (payload as any).criteria;
    if(this.id){
      api = this.service.updateTodo(this.id, payload);
    }else{
      api = this.service.saveTodo(payload)
    }

    api.subscribe(data => {
      console.log(data);
        this.openSnackBar();
    });
  }

    openSnackBar() {
      this._snackBar.open("Saved", "Close");
    }

  addTask(title: string = '') {
    this.tasks.push(this.fb.group({
      title: [title, [Validators.required]]
    }));
  }
}
