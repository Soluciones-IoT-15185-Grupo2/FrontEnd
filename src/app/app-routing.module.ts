import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'translation',
    loadChildren: () => import('./translation/translation.module').then(m => m.TranslationModule)
  },
  { path: '', redirectTo: 'translation', pathMatch: 'full' },
  { path: '**', redirectTo: 'translation' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
