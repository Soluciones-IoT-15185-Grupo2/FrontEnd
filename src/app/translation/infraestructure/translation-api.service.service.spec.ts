import { TestBed } from '@angular/core/testing';

import { TranslationApiServiceService } from './translation-api.service.service';

describe('TranslationApiServiceService', () => {
  let service: TranslationApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
