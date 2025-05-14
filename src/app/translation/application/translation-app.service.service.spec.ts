import { TestBed } from '@angular/core/testing';

import { TranslationAppService } from './translation-app.service';

describe('TranslationAppServiceService', () => {
  let service: TranslationAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
