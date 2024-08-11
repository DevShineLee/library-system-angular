import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  message: string;
  token: string; // This assumes the backend sends a token in the login response
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInStatus.asObservable(); // Components subscribe to this

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'json',
    }),
  };

  constructor(private http: HttpClient) {}

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
          if (response.token) {
            sessionStorage.setItem('token', response.token); // Store the token
            this.loggedInStatus.next(true); // Update the loggedInStatus
          } else {
            console.warn('Token not provided in the response');
            this.loggedInStatus.next(false); // Ensure loggedInStatus is accurate
          }
          console.log('Login successful:', response);
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          this.loggedInStatus.next(false); // Update status on error as well
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('token'); // Clear the token from storage
    this.loggedInStatus.next(false); // Update the loggedInStatus
  }
}
