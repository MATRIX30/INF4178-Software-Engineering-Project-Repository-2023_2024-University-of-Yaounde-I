import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherCourseComponent } from './home-teacher-course.component';

describe('HomeTeacherCourseComponent', () => {
  let component: HomeTeacherCourseComponent;
  let fixture: ComponentFixture<HomeTeacherCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeacherCourseComponent]
    });
    fixture = TestBed.createComponent(HomeTeacherCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
