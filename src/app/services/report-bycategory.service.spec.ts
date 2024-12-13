import { TestBed } from '@angular/core/testing';

import { ReportBycategoryService } from './report-bycategory.service';

describe('ReportBycategoryService', () => {
  let service: ReportBycategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportBycategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
