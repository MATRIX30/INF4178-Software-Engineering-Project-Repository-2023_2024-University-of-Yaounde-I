import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherCourserDetailComponent } from './home-teacher-courser-detail.component';

describe('HomeTeacherCourserDetailComponent', () => {
  let component: HomeTeacherCourserDetailComponent;
  let fixture: ComponentFixture<HomeTeacherCourserDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeacherCourserDetailComponent]
    });
    fixture = TestBed.createComponent(HomeTeacherCourserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
