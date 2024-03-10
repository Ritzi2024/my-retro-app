import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroDetailCardComponent } from './retro-detail-card.component';

describe('RetroDetailCardComponent', () => {
  let component: RetroDetailCardComponent;
  let fixture: ComponentFixture<RetroDetailCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetroDetailCardComponent]
    });
    fixture = TestBed.createComponent(RetroDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
