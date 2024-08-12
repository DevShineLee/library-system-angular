import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';

  // HttpHeaders 객체를 정의하여 모든 HTTP 요청에 사용할 수 있도록 설정
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBookById(bookID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${bookID}`);
  }

  borrowBook(bookID: number, userID: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/borrow/${bookID}`,
      { userID },
      this.httpOptions
    );
  }

  returnBook(bookID: number, userID: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/return/${bookID}`,
      { userID },
      this.httpOptions
    );
  }

  addBook(bookData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, bookData, this.httpOptions);
  }

  updateBook(bookID: number, bookData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/edit/${bookID}`,
      bookData,
      this.httpOptions
    );
  }

  // Angular Service
  deleteBook(bookID: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/delete/${bookID}`,
      this.httpOptions
    );
  }
}
