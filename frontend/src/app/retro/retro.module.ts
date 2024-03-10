import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RetroListComponent } from './retro-list/retro-list.component';
import { RetroDetailComponent } from './retro-detail/retro-detail.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { RetroDetailCardComponent } from './retro-detail-card/retro-detail-card.component';
import { RetroDetailItemComponent } from './retro-detail-item/retro-detail-item.component';
//import { TodoModule } from '../todo/todo.module';
import { EditTextPopupComponent } from './edit-text-popup/edit-text-popup.component';
import { MiniTodoModalComponent } from './mini-todo-modal/mini-todo-modal.component';

const routes = [{
  path: "",
  component: RetroListComponent,
  data: { title: 'Retro List' }
},
{
  path: ":id",
  component: RetroDetailComponent,
  data: { title: 'Retro' }
}];

@NgModule({
  declarations: [ RetroListComponent, RetroDetailComponent, RetroDetailCardComponent, RetroDetailItemComponent, EditTextPopupComponent, MiniTodoModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class RetroModule {

}
