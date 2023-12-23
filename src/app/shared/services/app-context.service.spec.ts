import { TestBed } from '@angular/core/testing';

import { AppContextService } from './AppContextService';

describe('AppContextService', () => {
  let service: AppContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
