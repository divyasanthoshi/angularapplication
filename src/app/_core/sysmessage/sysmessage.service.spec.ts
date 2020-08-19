import { TestBed } from '@angular/core/testing';

import { SysmessageService } from './sysmessage.service';

describe('SysmessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysmessageService = TestBed.get(SysmessageService);
    expect(service).toBeTruthy();
  });
});
