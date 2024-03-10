import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextPopupComponent } from './edit-text-popup.component';

describe('EditTextPopupComponent', () => {
  let component: EditTextPopupComponent;
  let fixture: ComponentFixture<EditTextPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTextPopupComponent]
    });
    fixture = TestBed.createComponent(EditTextPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
