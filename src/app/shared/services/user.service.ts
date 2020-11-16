import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
// import { JwtService } from './jwt.service';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<Boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private ApiService: ApiService, private http: HttpClient) {}

  populate() {
    this.purgeAuth();
  }

  setAuth(user: User) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    // this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = type === 'login' ? '/login' : '';
    return this.ApiService.post('/users' + route, { user: credentials }).pipe(
      map((data) => {
        this.setAuth(data.user);
        return data;
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}
