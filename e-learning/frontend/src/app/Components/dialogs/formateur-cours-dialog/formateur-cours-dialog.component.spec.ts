import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateurCoursDialogComponent } from './formateur-cours-dialog.component';

describe('FormateurCoursDialogComponent', () => {
  let component: FormateurCoursDialogComponent;
  let fixture: ComponentFixture<FormateurCoursDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormateurCoursDialogComponent]
    });
    fixture = TestBed.createComponent(FormateurCoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
