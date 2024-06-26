import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapitreDialogComponent } from './chapitre-dialog.component';

describe('ChapitreDialogComponent', () => {
  let component: ChapitreDialogComponent;
  let fixture: ComponentFixture<ChapitreDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapitreDialogComponent]
    });
    fixture = TestBed.createComponent(ChapitreDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
