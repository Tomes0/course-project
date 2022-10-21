import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToke: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  signup(email: string, password:string){
    const endpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe35VtW2ovhrhgJJDCsWAjsFKKTLuyHG0'
    return this.htpp.post<AuthResponseData>(endpoint,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
    );
  }
  login(email: string, password:string){
    const endpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe35VtW2ovhrhgJJDCsWAjsFKKTLuyHG0'
    return this.htpp.post<AuthResponseData>(endpoint,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
    ).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn)
        })
    );
  }
  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogin(){
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

      if(loadedUser.token){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
  }
  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
    const expiratrionDate = new Date(new Date().getTime() + expiresIn*1000)
    const user = new User(email, userId, token, expiratrionDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS': errorMessage = 'This email is already registered!'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist!'; break;
      case 'INVALID_PASSWORD': errorMessage = 'The password is incorrect!'; break;
    }
    return throwError(errorMessage);
  }

  constructor(private htpp: HttpClient, private router: Router) { }
}
