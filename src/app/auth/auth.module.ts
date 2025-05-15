import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthAppService }    from './application/auth-app.service';
import { LoginComponent }    from './ui/login/login.component';
import {MaterialModule} from '../material/material.module';
import {AuthApiService} from './infraestructure/auth-api.service';

@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule
  ],
  providers: [
    AuthApiService,
    AuthAppService
  ]
})
export class AuthModule {}
