import { HeaderService } from '../../header/header.service';
import { Observable, Subject, filter, map, merge, mergeMap, startWith, switchMap, tap } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TODOS_CRITERIA } from '../../enums/dashboard';
import ITodo from '../../interfaces/IDashboardCount';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ITodo[]> | undefined;
  activeTodos$: Observable<ITodo[]> | undefined;
  completedTodos$: Observable<ITodo[]> | undefined;

  reloadSubject = new Subject<void>();
  reload$ = this.reloadSubject.asObservable();

  category: TODOS_CRITERIA = TODOS_CRITERIA.TODAY;
  step = 0;
  todoss$: any;

  setStep(index: number) {
    this.step = index;
  }
  constructor(private service: TodoService, private route: ActivatedRoute, private headerService: HeaderService, private _snackBar: MatSnackBar) {
    this.route.paramMap.subscribe(param => {
      if (param) {
        this.category = param.get("duration")!.toUpperCase() as any;
      }
    });

    // this.headerService.showCompletedSubject$.subscribe(showCompleted => {
    //   this.fetchTodos(showCompleted);
    // })
  }
  ngOnInit(): void {
    this.todos$ = this.reload$.pipe(
      startWith(null),
      mergeMap(() =>
        this.route.paramMap.pipe(
          map((params) => params.get('duration') as string | TODOS_CRITERIA),
          tap(() => console.log("calling service")),
          switchMap((routeParam: string | TODOS_CRITERIA) => this.service.getTodoList(routeParam))
        )
      )
    );

    this.activeTodos$ = this.todos$.pipe(
      tap(() => console.log("calculating active todos")),
      map((todos: ITodo[]) => todos.filter(r => !r.completed))
    );

    this.completedTodos$ = this.todos$.pipe(
      tap(() => console.log("calculating completed todos")),
      map((todos: ITodo[]) => todos.filter(r => r.completed)))
  }

  onMarkComplete(event: any, todo: ITodo){
    event.stopPropagation();
    this.service.markTodoAsComplete(todo._id).subscribe(res => {
      this.openSnackBar("Todo was marked completed successfully", "success");
      this.reloadSubject.next();
    });

  }
  onDelete(event: any, todo: ITodo){
    event.stopPropagation();
    this.service.deleteTodo(todo._id).subscribe((deleted)=>{
      if(deleted){
        this.openSnackBar("Todo was deleted successfully", "success");
        this.reloadSubject.next();
      }else{
        this.openSnackBar("Todo could not be deleted, please try after some time", "error");
      }
    });
  }

  openSnackBar(message: string, className?: string) {
    this._snackBar.open(message, "Close", {duration: 1000, panelClass: className});
  }


}
