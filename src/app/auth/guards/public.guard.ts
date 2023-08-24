import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard {


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkAuthStatus(): Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/');
        }
      }),
      map(authenticated => !authenticated));
  }

  canMatch(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.checkAuthStatus();
  }



  canActivate(): boolean | Observable<boolean> {

    return this.checkAuthStatus();
  }
}
