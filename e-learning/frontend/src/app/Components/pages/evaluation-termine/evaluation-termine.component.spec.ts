import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTermineComponent } from './evaluation-termine.component';

describe('EvaluationTermineComponent', () => {
  let component: EvaluationTermineComponent;
  let fixture: ComponentFixture<EvaluationTermineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationTermineComponent]
    });
    fixture = TestBed.createComponent(EvaluationTermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
