import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    console.log('Sending user data to server:', userData)
    return this.http.post(this.apiUrl, userData).pipe(
      tap((response) => {
        console.log('Response from server:', response)
      }),
      catchError((error) => {
        console.error('Error occurred while creating user:', error)
        throw error
      })
    )
  }
}
