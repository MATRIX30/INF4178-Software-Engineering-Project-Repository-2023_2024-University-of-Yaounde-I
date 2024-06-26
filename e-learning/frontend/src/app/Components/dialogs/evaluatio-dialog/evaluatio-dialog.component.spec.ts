import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatioDialogComponent } from './evaluatio-dialog.component';

describe('EvaluatioDialogComponent', () => {
  let component: EvaluatioDialogComponent;
  let fixture: ComponentFixture<EvaluatioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluatioDialogComponent]
    });
    fixture = TestBed.createComponent(EvaluatioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
