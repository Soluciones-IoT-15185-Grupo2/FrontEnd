import { TestBed } from '@angular/core/testing';

import { TranslationAppServiceService } from './translation-app.service.service';

describe('TranslationAppServiceService', () => {
  let service: TranslationAppServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationAppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
