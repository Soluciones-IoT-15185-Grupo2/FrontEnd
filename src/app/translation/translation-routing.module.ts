import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LiveTranslateComponent } from './ui/live-translate/live-translate.component';
//import { TranslationHistoryComponent } from './ui/history/translation-history.component';

const routes: Routes = [
  //{ path: 'translate', component: LiveTranslateComponent },
  //{ path: 'history',   component: TranslationHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationRoutingModule { }
