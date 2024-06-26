import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviCoursComponent } from './suivi-cours.component';

describe('SuiviCoursComponent', () => {
  let component: SuiviCoursComponent;
  let fixture: ComponentFixture<SuiviCoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuiviCoursComponent]
    });
    fixture = TestBed.createComponent(SuiviCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
