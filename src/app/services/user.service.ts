import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface LoginResponse {
  message: string;
  token: string; // This assumes the backend sends a token in the login response
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private loggedInStatus = new BehaviorSubject<boolean>(
    this.checkTokenExistence()
  );
  isLoggedIn$ = this.loggedInStatus.asObservable(); // Components subscribe to this

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  private checkTokenExistence(): boolean {
    return !!sessionStorage.getItem('token');
  }

  private updateLoggedInStatus() {
    const isLoggedIn = this.checkTokenExistence();
    if (this.loggedInStatus.value !== isLoggedIn) {
      this.loggedInStatus.next(isLoggedIn);
    }
  }

  createUser(userData: any): Observable<any> {
    console.log('Sending user data to server:', userData);
    return this.http
      .post(this.apiUrl, JSON.stringify(userData), this.httpOptions)
      .pipe(
        tap((response) => console.log('Response from server:', response)),
        catchError((error) => {
          console.error('Error occurred while creating user:', error);
          return throwError(
            () => new Error('Error occurred while creating user')
          );
        })
      );
  }

  login(userData: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, userData, this.httpOptions)
      .pipe(
        tap((response) => {
          if (response.token && response.username) {
            // Check both token and username
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('username', response.username);
            this.loggedInStatus.next(true);
          } else {
            console.error(
              'Login response missing token or username:',
              response
            );
            this.loggedInStatus.next(false);
          }
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          this.loggedInStatus.next(false);
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  logout() {
    sessionStorage.clear();
    this.updateLoggedInStatus();
    alert('Bye, See you!');
    this.router.navigate(['/']);
  }
}
