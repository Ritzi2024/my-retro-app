import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoMasterListComponent } from './todo-master-list/todo-master-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes = [{
  path: "",
  component: TodoMasterListComponent
},
{
  path: ":duration",
  component: TodoListComponent
},
{
  path: ":duration/:id",
  component: TodoDetailComponent
},
]

@NgModule({
  declarations: [
    TodoListComponent,
    TodoDetailComponent,
    TodoMasterListComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class TodoModule { }
