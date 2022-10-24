import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recepies', pathMatch: 'full'},
  { path: 'recepies', loadChildren: () =>
          import('./recepies/recepies.module').then(mod => mod.RecepiesModule)},
  { path: 'shopping-list', loadChildren: () =>
          import('./shopping-list/shopping-list.module').then(mod => mod.ShoppingListModule)},
  { path: 'auth', loadChildren: () =>
          import('./auth/auth.module').then(mod => mod.AuthModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
