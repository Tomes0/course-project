import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  authForm: FormGroup;

  onSubmit(){
    if(!this.authForm.valid)
      return;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    const email = this.authForm.value['email'];
    const password = this.authForm.value['password']

    console.log(email);

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
    resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recepies']);
    },
    errorMesage => {
      console.log(errorMesage);
      this.error = errorMesage;
      this.isLoading = false;
    });

    this.authForm.reset();
  }

  private initForm(){
    let userEmail = '';
    let userPassword = '';

    this.authForm = new FormGroup({
      'email': new FormControl(userEmail, [Validators.required, Validators.email]),
      'password': new FormControl(userPassword, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError(){
    this.error=null;
  }

  ngOnInit(): void {
    this.initForm();
  }


  constructor(private authService: AuthService, private router: Router, private cFR: ComponentFactoryResolver) { }
}
