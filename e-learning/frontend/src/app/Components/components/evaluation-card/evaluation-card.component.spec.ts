import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCardComponent } from './evaluation-card.component';

describe('EvaluationCardComponent', () => {
  let component: EvaluationCardComponent;
  let fixture: ComponentFixture<EvaluationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationCardComponent]
    });
    fixture = TestBed.createComponent(EvaluationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
