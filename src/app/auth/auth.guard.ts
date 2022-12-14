import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {

    return this.authSevice.user.pipe(
      take(1),
      map(user=> {
      const isAuth = !!user;
      if(isAuth){
        return true;
      }else {
        return this.router.createUrlTree(['/auth'])
      }
    }));
  }
  constructor(private authSevice: AuthService, private router: Router){}
}
