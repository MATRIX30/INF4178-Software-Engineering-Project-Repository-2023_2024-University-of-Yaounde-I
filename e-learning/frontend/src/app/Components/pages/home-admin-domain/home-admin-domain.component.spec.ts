import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminDomainComponent } from './home-admin-domain.component';

describe('HomeAdminDomainComponent', () => {
  let component: HomeAdminDomainComponent;
  let fixture: ComponentFixture<HomeAdminDomainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminDomainComponent]
    });
    fixture = TestBed.createComponent(HomeAdminDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
