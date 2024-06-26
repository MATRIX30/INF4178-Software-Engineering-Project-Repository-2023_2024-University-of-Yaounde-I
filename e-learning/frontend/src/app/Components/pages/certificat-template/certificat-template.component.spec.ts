import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatTemplateComponent } from './certificat-template.component';

describe('CertificatTemplateComponent', () => {
  let component: CertificatTemplateComponent;
  let fixture: ComponentFixture<CertificatTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificatTemplateComponent]
    });
    fixture = TestBed.createComponent(CertificatTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
