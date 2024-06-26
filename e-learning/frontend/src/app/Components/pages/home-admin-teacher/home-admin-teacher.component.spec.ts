import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminTeacherComponent } from './home-admin-teacher.component';

describe('HomeAdminTeacherComponent', () => {
  let component: HomeAdminTeacherComponent;
  let fixture: ComponentFixture<HomeAdminTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminTeacherComponent]
    });
    fixture = TestBed.createComponent(HomeAdminTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
