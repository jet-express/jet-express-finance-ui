import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    let expectedRoles = next.data.expectedRoles;
    if (!expectedRoles)
      return true;

    let currentAccessRoles = this.authService.getCurrentAccessRoles();

    if (expectedRoles.some(role => {
      return currentAccessRoles.includes(role);
    })) {
      return true;
    }

    this.toastrService.error(`You don't have permission to access this page`, 'Forbidden');
    return false;
  }
}
