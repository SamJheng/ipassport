import { TestBed } from '@angular/core/testing';

import { GoogleOnetapService } from './google-onetap.service';

describe('GoogleOnetapService', () => {
  let service: GoogleOnetapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleOnetapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
