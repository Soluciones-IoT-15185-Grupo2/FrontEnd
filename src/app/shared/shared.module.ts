import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//UI Components
import { ButtonComponent } from './ui/button/button.component';
import { TitleCasePipe } from './utils/title-case.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    TitleCasePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
