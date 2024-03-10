import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, of, switchMap } from 'rxjs';
import ITodo from 'src/app/interfaces/IDashboardCount';
import { TodoService } from 'src/app/todo/todo-list/todo.service';

@Component({
  selector: 'app-mini-todo-modal',
  templateUrl: './mini-todo-modal.component.html',
  styleUrls: ['./mini-todo-modal.component.scss']
})
export class MiniTodoModalComponent implements OnInit, OnChanges {
  @Input() id: string | undefined;
  @Input() title: string | undefined;
  id$: Observable<string> | undefined;
  fetchTodo$: Observable<ITodo> | undefined;

  private inputSubject: Subject<string> = new Subject();
  inputSubject$ = this.inputSubject.asObservable();

  constructor(private service: TodoService, private route: ActivatedRoute) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && !changes['id'].firstChange) {
      this.inputSubject.next(changes['id'].currentValue as string);
    }
  }
  ngOnInit(): void {
    this.id$ = this.inputSubject$.pipe(
      switchMap(taskId => {
        if (!taskId) {
          return this.service.saveTodo({
            title: this.title
          } as ITodo).pipe(map(x => x._id));
        } else {
          return of(taskId);
        }
      })
    );

    this.fetchTodo$ = this.id$.pipe(
      switchMap(id => {
        return this.service.getTodo(id);
      })
    );

  }
}
