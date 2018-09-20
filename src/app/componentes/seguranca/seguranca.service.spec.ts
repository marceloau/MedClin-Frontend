import { TestBed, inject } from '@angular/core/testing';

import { SegurancaService } from './seguranca.service';

describe('SegurancaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegurancaService]
    });
  });

  it('should be created', inject([SegurancaService], (service: SegurancaService) => {
    expect(service).toBeTruthy();
  }));
});
