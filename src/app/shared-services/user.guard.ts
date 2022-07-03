import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { CommonAuthService } from './common-auth.service';
import { UserRoles } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class UserGurad implements CanActivate {
  userRole: string | undefined;
  constructor(private authService: CommonAuthService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | import("rxjs").Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authService.isUserLoggedIn()) {
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      });

      if (state.url.includes('dashboard')) {
        return this.userRole === UserRoles.USER;
      }
      else {
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
