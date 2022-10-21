import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

const routes: Routes=[
  { path: 'auth', component: AuthComponent}
]

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
