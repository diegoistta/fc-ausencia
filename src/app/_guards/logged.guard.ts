import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { LoginService } from '@app/_services/login.service';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['']);
          return false;
        }
        return true;
      })
    );
  }
}
