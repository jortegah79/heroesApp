import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {


  constructor(
    private authService: AuthService,
    private router:Router
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated=>console.log(isAuthenticated)),
      tap(isAuthenticated=>{
        if(!isAuthenticated){
            this.router.navigateByUrl('/auth/login');
        }
      })

    )

  }

  canMatch(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkAuthStatus();

  }



  canActivate(): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }
}
