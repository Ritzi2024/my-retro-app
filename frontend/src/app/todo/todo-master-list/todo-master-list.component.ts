import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo-list/todo.service';
import { Observable } from 'rxjs';
import ITodo from 'src/app/interfaces/IDashboardCount';

@Component({
  selector: 'app-todo-master-list',
  templateUrl: './todo-master-list.component.html',
  styleUrls: ['./todo-master-list.component.scss']
})
export class TodoMasterListComponent implements OnInit {
  todos$: Observable<{ _id: string, todos: ITodo[] }[]> | undefined;
  constructor(private service: TodoService) { }
  ngOnInit(): void {
    this.todos$ = this.service.getAllTodos({
      "from": "2024-02-02T15:10:25.426Z",
      "to": "2024-04-02T15:10:25.426Z"
    });
  }
  onMarkComplete(event: any, i: number){
    event.stopPropagation();
    console.log(i, "mark complete");
  }
  onDelete(event: any, i: number){
    event.stopPropagation();
    console.log(i, "delete");
  }
}
