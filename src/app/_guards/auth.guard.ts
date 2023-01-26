import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountService: AccountService,
    private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'You are not Authorize',
          });
          return false;
        }
      })
    );
  }
}
