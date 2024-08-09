import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BookService } from '../../services/book.service'
import { catchError, of } from 'rxjs'
import { tap } from 'rxjs/operators'
import { CommonModule } from '@angular/common' // CommonModule import

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [RouterModule, CommonModule], // CommonModule 추가
  providers: [BookService],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: any[] = []

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService
      .getBooks()
      .pipe(
        tap((books) => {
          console.log(books) // 콘솔에 데이터를 출력하여 확인
          this.books = books
        }),
        catchError((error) => {
          console.error('Failed to fetch books', error)
          return of([]) // 에러 발생 시 빈 배열 반환
        })
      )
      .subscribe()
  }
}
