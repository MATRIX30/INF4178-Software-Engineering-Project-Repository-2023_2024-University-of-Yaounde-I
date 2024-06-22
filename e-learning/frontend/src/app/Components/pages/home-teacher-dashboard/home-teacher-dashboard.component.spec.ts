import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeacherDashboardComponent } from './home-teacher-dashboard.component';

describe('HomeTeacherDashboardComponent', () => {
  let component: HomeTeacherDashboardComponent;
  let fixture: ComponentFixture<HomeTeacherDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTeacherDashboardComponent]
    });
    fixture = TestBed.createComponent(HomeTeacherDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
