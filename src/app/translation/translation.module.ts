import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslationRoutingModule } from './translation-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslationApiServiceService } from './infraestructure/translation-api.service.service';
import { TranslationAppServiceService } from './application/translation-app.service.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslationRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    TranslationApiServiceService,
    TranslationAppServiceService
  ]
})
export class TranslationModule { }
