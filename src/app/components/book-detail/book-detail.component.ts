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
  currentUsername: string | null;

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.currentUsername = sessionStorage.getItem('username'); // Retrieve current username from session storage
  }

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
    console.log('Borrowing book:', bookID);
    // Implement the actual borrowing logic here, possibly involving a service call
  }

  returnBook(bookID: number): void {
    console.log('Returning book:', bookID);
    // Implement the actual return logic here, possibly involving a service call
  }

  canReturn(): boolean {
    return this.book.isBorrowed && this.book.userID === this.currentUsername;
  }
}
