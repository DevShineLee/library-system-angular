import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3000/api/books';

  private searchQuerySource = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySource.asObservable();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getBooks(search: string = '', genre: string = ''): Observable<any[]> {
    let params = new HttpParams();
    if (search) {
      params = params.append('search', search);
    }
    if (genre) {
      params = params.append('genre', genre);
    }
    return this.http.get<any[]>(`${this.apiUrl}`, { params });
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

  setSearchQuery(query: string): void {
    console.log('Setting search query:', query); // This should log the search query
    this.searchQuerySource.next(query);
  }
}
