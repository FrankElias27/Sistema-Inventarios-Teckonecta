import { TestBed } from '@angular/core/testing';

import { CotiacionesReportService } from './cotiaciones-report.service';

describe('CotiacionesReportService', () => {
  let service: CotiacionesReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CotiacionesReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
