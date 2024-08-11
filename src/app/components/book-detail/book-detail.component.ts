import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  book: any;
  sessionUserID = sessionStorage.getItem('userID'); // Assuming userID is stored in session storage

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const bookId = params['id'];
      this.bookService.getBookById(bookId).subscribe(
        (book) => {
          this.book = book;
        },
        (error) => {
          console.error('Failed to fetch book details', error);
        }
      );
    });
  }

  borrowBook(bookID: number): void {
    // Implement borrow book functionality
    console.log('Borrowing book:', bookID);
  }

  returnBook(bookID: number): void {
    // Implement return book functionality
    console.log('Returning book:', bookID);
  }
}
