import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserCoursTermineComponent } from './home-user-cours-termine.component';

describe('HomeUserCoursTermineComponent', () => {
  let component: HomeUserCoursTermineComponent;
  let fixture: ComponentFixture<HomeUserCoursTermineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeUserCoursTermineComponent]
    });
    fixture = TestBed.createComponent(HomeUserCoursTermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
