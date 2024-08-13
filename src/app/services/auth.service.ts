import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() {}

  login(token: string): void {
    sessionStorage.setItem('token', token);
    this.isLoggedIn.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }

  checkToken(): void {
    const token = sessionStorage.getItem('token');
    this.isLoggedIn.next(!!token);
  }
}
