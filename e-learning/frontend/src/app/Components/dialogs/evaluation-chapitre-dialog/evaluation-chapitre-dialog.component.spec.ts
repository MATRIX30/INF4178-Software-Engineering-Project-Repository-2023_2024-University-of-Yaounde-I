import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationChapitreDialogComponent } from './evaluation-chapitre-dialog.component';

describe('EvaluationChapitreDialogComponent', () => {
  let component: EvaluationChapitreDialogComponent;
  let fixture: ComponentFixture<EvaluationChapitreDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationChapitreDialogComponent]
    });
    fixture = TestBed.createComponent(EvaluationChapitreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
