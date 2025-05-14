import { NgModule } from '@angular/core';
import { SharedModule }             from '../shared/shared.module';
import { HttpClientModule }         from '@angular/common/http';
import { TranslationRoutingModule } from './translation-routing.module';
import { MaterialModule } from '../material/material.module';

import { LiveTranslateComponent }   from './ui/live-translate/live-translate.component';
import { TranslationAppService }    from './application/translation-app.service';
import { TranslationApiService } from './infraestructure/translation-api.service';

@NgModule({
  declarations: [
    LiveTranslateComponent
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    TranslationRoutingModule,
    MaterialModule
  ],
  providers: [
    TranslationApiService,
    TranslationAppService
  ]
})
export class TranslationModule { }
