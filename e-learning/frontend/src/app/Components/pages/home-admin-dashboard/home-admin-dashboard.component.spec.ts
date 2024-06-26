import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminDashboardComponent } from './home-admin-dashboard.component';

describe('HomeAdminDashboardComponent', () => {
  let component: HomeAdminDashboardComponent;
  let fixture: ComponentFixture<HomeAdminDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminDashboardComponent]
    });
    fixture = TestBed.createComponent(HomeAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
