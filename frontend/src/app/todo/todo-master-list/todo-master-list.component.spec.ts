import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoMasterListComponent } from './todo-master-list.component';

describe('TodoMasterListComponent', () => {
  let component: TodoMasterListComponent;
  let fixture: ComponentFixture<TodoMasterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoMasterListComponent]
    });
    fixture = TestBed.createComponent(TodoMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
