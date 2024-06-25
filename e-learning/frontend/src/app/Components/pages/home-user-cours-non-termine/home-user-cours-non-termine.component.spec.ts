import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserCoursNonTermineComponent } from './home-user-cours-non-termine.component';

describe('HomeUserCoursNonTermineComponent', () => {
  let component: HomeUserCoursNonTermineComponent;
  let fixture: ComponentFixture<HomeUserCoursNonTermineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeUserCoursNonTermineComponent]
    });
    fixture = TestBed.createComponent(HomeUserCoursNonTermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
