import { TestBed } from '@angular/core/testing';

import { PalindromeServiceService } from './palindrome-service.service';

describe('PalindromeServiceService', () => {
  let service: PalindromeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PalindromeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
