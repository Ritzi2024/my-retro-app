import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../constants';
import { ApiUtilsService } from '../../utils/api-utils';
import { TODOS_CRITERIA } from '../../enums/dashboard';
import { Observable, map, tap } from 'rxjs';
import { gql } from '@apollo/client/core';
import ITodo from '../../interfaces/IDashboardCount';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = `${BASE_URL}/todos`;

  constructor(private http: HttpClient, private utils: ApiUtilsService) { }

  saveTodo(todo: ITodo): Observable<ITodo> {
    //return this.utils.apiCall$(this.http.post<string>(this.baseUrl, todo));
    const m = gql`mutation CreateTodo($todoInput: TodoInput) {
      createTodo(todoInput: $todoInput) {
        _id
        category
        criteria
        title
      }
    }`;
    return this.utils.apolloMutation$(m, { todoInput: todo })
      .pipe(
        map(result => (result.data as any).createTodo as ITodo)
      );
  }

  deleteTodo(id: string): Observable<boolean> {
    const m = gql`mutation Mutation($id: ID!) {
      deleteTodo(ID: $id)
    }
    `;
    return this.utils.apolloMutation$(m, { id })
      .pipe(
        map(result => (result.data as any).deleteTodo as boolean)
      );
  }

  markTodoAsComplete(id: string): Observable<ITodo> {
    const m = gql`mutation Mutation($id: ID!) {
      markTodoAsCompleted(ID: $id) {
        _id
        completed
        criteria
        description
        resolutionDate
        star
        tasks
        title
      }
    }
    `;
    return this.utils.apolloMutation$(m, { id })
      .pipe(
        map(result => (result.data as any).markTodoAsCompleted as ITodo)
      );
  }

  updateTodo(id: string, todo: ITodo): Observable<ITodo> {
    const m = gql`mutation EditTodo($id: ID!, $todoInput: TodoInput) {
      editTodo(ID: $id, todoInput: $todoInput){
        _id
        title
      }
    }
    `;
    return this.utils.apolloMutation$(m, { id, todoInput: todo })
      .pipe(
        map(result => (result.data as any).editTodo as ITodo)
      );
  }

  getLastTodosByDate(dateRange: { to: string, from: string }) {
    const query = `ExampleQuery($dateRange: DateRange) {
      getLastTodosByDate(dateRange: $dateRange) {
        _id
        active
        completed
        total
      }
    }`
    return this.utils.apolloQuery$(query, { dateRange })
      .pipe(
        map(result => (result.data as any).getLastTodosByDate as { _id: string, active: number, total: number, completed: number }[])
      );
  }

  getLastTodosByCategory(dateRange: { to: string, from: string }) {
    const query = `ExampleQuery($dateRange: DateRange) {
      getLastTodosByCategory(dateRange: $dateRange) {
        _id
        count
      }
    }`
    return this.utils.apolloQuery$(query, { dateRange })
      .pipe(
        map(result => (result.data as any).getLastTodosByCategory.map((data: any) => ({ name: data._id, value: data.count })) as { name: string, value: number }[])
      );
  }

  getAllTodos(dateRange: { to: string, from: string }): Observable<{ _id: string, todos: ITodo[] }[]> {
    const query = `ExampleQuery($dateRange: DateRange) {
      getAllTodos(dateRange: $dateRange) {
        _id
        todos {
          category
          title
          completed
          tasks
          _id
        }
      }
    }
    `;
    //return this.utils.apiCall$(this.http.get<ITodo[]>(`${this.baseUrl}`));
    return this.utils.apolloQuery$(query, { dateRange })
      .pipe(
        map(result => (result.data as any).getAllTodos as { _id: string, todos: ITodo[] }[])
      );
  }

  getTodoList(category: string | TODOS_CRITERIA): Observable<ITodo[]> {
    const query = `Query($category: String) {
          getTodos(category: $category) {
            _id
            title
            resolutionDate
            completed
            category
            criteria
            description
            star
            tasks
            updatedAt
          }
        }`;
    //return this.utils.apiCall$(this.http.get<ITodo[]>(`${this.baseUrl}`));
    return this.utils.apolloQuery$(query, { category })
      .pipe(
        tap(res => console.log("get", res)),
        map(result => (result.data as any).getTodos as ITodo[])
      );
  }

  getTodo(_id?: string): Observable<ITodo> {
    //return this.utils.apiCall$(this.http.get<ITodo>(`${this.baseUrl}/${id}`));
    const query = `Query($id: ID!) {
      todo(ID: $id) {
        _id
        criteria
        category
        completed
        description
        resolutionDate
        star
        tasks
        title
        updatedAt
      }
    }
    `;
    return this.utils.apolloQuery$(query, { id: _id })
      .pipe(
        map(result => (result.data as any).todo as ITodo)
      );
  }
}
