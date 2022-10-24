import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

const routes: Routes=[
  { path: '', component: AuthComponent}
]

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AuthModule { }
