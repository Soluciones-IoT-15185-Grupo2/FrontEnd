import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// UI Components
import { ButtonComponent } from './ui/button/button.component';

// Utils (pipes, directives…)
import { TitleCasePipe } from './utils/title-case.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    TitleCasePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonComponent,
    TitleCasePipe,
  ]
})
export class SharedModule { }
