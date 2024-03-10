import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixLineBarStackChartComponent } from './mix-line-bar-stack-chart.component';

describe('MixLineBarStackChartComponent', () => {
  let component: MixLineBarStackChartComponent;
  let fixture: ComponentFixture<MixLineBarStackChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MixLineBarStackChartComponent]
    });
    fixture = TestBed.createComponent(MixLineBarStackChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
