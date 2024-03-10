import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroDetailItemComponent } from './retro-detail-item.component';

describe('RetroDetailItemComponent', () => {
  let component: RetroDetailItemComponent;
  let fixture: ComponentFixture<RetroDetailItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetroDetailItemComponent]
    });
    fixture = TestBed.createComponent(RetroDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
