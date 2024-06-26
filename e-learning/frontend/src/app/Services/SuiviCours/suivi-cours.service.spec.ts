import { TestBed } from '@angular/core/testing';

import { SuiviCoursService } from './suivi-cours.service';

describe('SuiviCoursService', () => {
  let service: SuiviCoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuiviCoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
