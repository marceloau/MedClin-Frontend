import { TestBed, inject } from '@angular/core/testing';

import { DominioService } from './dominio.service';

describe('DominioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DominioService]
    });
  });

  it('should be created', inject([DominioService], (service: DominioService) => {
    expect(service).toBeTruthy();
  }));
});
