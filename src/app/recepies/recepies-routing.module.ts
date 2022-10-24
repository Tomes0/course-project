import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecepieDetailComponent } from "./recepie-detail/recepie-detail.component";
import { RecepieEditComponent } from "./recepie-edit/recepie-edit.component";
import { RecepieStartComponent } from "./recepie-start/recepie-start.component";
import { RecepieResolver } from "./recepies-resolver.service";
import { RecepiesComponent } from "./recepies.component";

const routes: Routes=[{
  path: '', component: RecepiesComponent, canActivate:[AuthGuard], children:[
    {path: '', component: RecepieStartComponent},
    {path: 'new', component: RecepieEditComponent},
    {path: ':id', component: RecepieDetailComponent, resolve: [RecepieResolver]},
    {path: ':id/edit', component: RecepieEditComponent , resolve: [RecepieResolver]}]
}];

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class RecepiesRoutingModule {

}
