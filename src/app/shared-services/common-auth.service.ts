import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonAuthService {
  public userRole$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  constructor() {}

  public updateUserInSession(obj: any) {
    sessionStorage.setItem('token', obj.accessToken);
    sessionStorage.setItem('username', obj.username);
    sessionStorage.setItem('userRole', obj.userRole);
    this.updateUserRole(obj.userRole);
  }

  public updateUserRole(userRole: string): void {
    this.userRole$.next(userRole);
  }

  public setUserRoleFromSessionStorage(): void {
    const userRoleFromSessionStorage = sessionStorage.getItem('userRole');
    if (userRoleFromSessionStorage) {
      this.updateUserRole(userRoleFromSessionStorage);
    }
  }

  public isUserLoggedIn(): boolean {
    if (
      sessionStorage.getItem('userRole') &&
      sessionStorage.getItem('username')
    ) {
      const userRoleFromSessionStorage = sessionStorage.getItem('userRole');
      if (userRoleFromSessionStorage) {
        this.updateUserRole(userRoleFromSessionStorage);
      }
      return true;
    } else {
      return false;
    }
  }

  public getUserRoll(): Observable<string> {
    return this.userRole$;
  }
}
