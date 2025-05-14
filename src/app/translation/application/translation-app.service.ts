import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationRequest } from '../domain/entities/translation-request.entity';
import { TranslationResult }  from '../domain/entities/translation-result.entity';
import {TranslationApiService} from '../infraestructure/translation-api.service';

@Injectable()
export class TranslationAppService {
  constructor(private api: TranslationApiService) {}

  /*not implemented yet because we dont have backend */
  processTextTranslation(
    req: TranslationRequest
  ): Observable<TranslationResult> {
    req.startProcessing();
    return this.api.translateText({  })
      .pipe();
  }
}
