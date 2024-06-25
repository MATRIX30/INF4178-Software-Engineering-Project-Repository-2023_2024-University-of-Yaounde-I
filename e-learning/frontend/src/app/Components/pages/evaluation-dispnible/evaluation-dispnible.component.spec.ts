import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDispnibleComponent } from './evaluation-dispnible.component';

describe('EvaluationDispnibleComponent', () => {
  let component: EvaluationDispnibleComponent;
  let fixture: ComponentFixture<EvaluationDispnibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationDispnibleComponent]
    });
    fixture = TestBed.createComponent(EvaluationDispnibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
