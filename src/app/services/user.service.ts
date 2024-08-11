import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  message: string;
  token: string; // Ensure that the response includes a token property
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';

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

  // Correcting the URL in UserService if needed

  login(userData: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, userData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        tap((response: LoginResponse) => {
          if (response.token) {
            sessionStorage.setItem('token', response.token);
          } else {
            console.warn('Token not provided in the response');
          }
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return throwError(() => new Error('Login failed'));
        })
      );
  }
}
