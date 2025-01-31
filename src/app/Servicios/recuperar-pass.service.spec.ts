import { TestBed } from '@angular/core/testing';

import { RecuperarPassService } from './recuperar-pass.service';

describe('RecuperarPassService', () => {
  let service: RecuperarPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
