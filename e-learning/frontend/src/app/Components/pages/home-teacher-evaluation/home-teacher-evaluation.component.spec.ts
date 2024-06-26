import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherEvaluationComponent } from './home-teacher-evaluation.component';

describe('HomeTeacherEvaluationComponent', () => {
  let component: HomeTeacherEvaluationComponent;
  let fixture: ComponentFixture<HomeTeacherEvaluationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeacherEvaluationComponent]
    });
    fixture = TestBed.createComponent(HomeTeacherEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
