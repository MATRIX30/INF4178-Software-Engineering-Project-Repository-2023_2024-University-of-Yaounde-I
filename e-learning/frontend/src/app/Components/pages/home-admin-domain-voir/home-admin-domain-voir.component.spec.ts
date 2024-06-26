import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminDomainVoirComponent } from './home-admin-domain-voir.component';

describe('HomeAdminDomainVoirComponent', () => {
  let component: HomeAdminDomainVoirComponent;
  let fixture: ComponentFixture<HomeAdminDomainVoirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAdminDomainVoirComponent]
    });
    fixture = TestBed.createComponent(HomeAdminDomainVoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
