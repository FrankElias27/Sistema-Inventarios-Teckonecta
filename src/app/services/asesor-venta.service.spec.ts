import { TestBed } from '@angular/core/testing';

import { AsesorVentaService } from './asesor-venta.service';

describe('AsesorVentaService', () => {
  let service: AsesorVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsesorVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
