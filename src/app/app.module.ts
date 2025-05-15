import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthAppService} from './auth/application/auth-app.service';
import {AuthApiService} from './auth/infraestructure/auth-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbar
  ],
  providers: [
    AuthAppService,
    AuthApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
