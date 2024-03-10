import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTodoModalComponent } from './mini-todo-modal.component';

describe('MiniTodoModalComponent', () => {
  let component: MiniTodoModalComponent;
  let fixture: ComponentFixture<MiniTodoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MiniTodoModalComponent]
    });
    fixture = TestBed.createComponent(MiniTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
