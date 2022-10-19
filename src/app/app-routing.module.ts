import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepiesComponent } from './recepies/recepies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecepieDetailComponent } from './recepies/recepie-detail/recepie-detail.component';
import { RecepieStartComponent } from './recepies/recepie-start/recepie-start.component';
import { RecepieEditComponent } from './recepies/recepie-edit/recepie-edit.component';
import { RecepieResolver } from './recepies/recepies-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/recepies', pathMatch: 'full'},
  { path: 'recepies', component: RecepiesComponent, children:[
    {path: '', component: RecepieStartComponent},
    {path: 'new', component: RecepieEditComponent},
    {path: ':id', component: RecepieDetailComponent, resolve: [RecepieResolver]},
    {path: ':id/edit', component: RecepieEditComponent , resolve: [RecepieResolver]}

  ]},
  { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
