import { TestBed } from '@angular/core/testing';

import { ProductopedidoService } from './productopedido.service';

describe('ProductopedidoService', () => {
  let service: ProductopedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductopedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
