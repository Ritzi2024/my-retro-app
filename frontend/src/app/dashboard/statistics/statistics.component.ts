import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ECHART_TYPE } from 'src/app/enums/dashboard';
import { TodoService } from 'src/app/todo/todo-list/todo.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {
  constructor(private service: TodoService) { }

  dataPerCategory$: Observable<{ name: string, value: number }[]> = this.service.getLastTodosByCategory({
    "from": "2024-02-02T15:10:25.426Z",
    "to": "2024-04-02T15:10:25.426Z"
  })

  dataPerDay$: Observable<{ _id: string, active: number, total: number, completed: number }[]> = this.service.getLastTodosByDate({
    "from": "2024-02-02T15:10:25.426Z",
    "to": "2024-04-02T15:10:25.426Z"
  })

  todos: number = 10;
  readonly ChartType = ECHART_TYPE;
}
