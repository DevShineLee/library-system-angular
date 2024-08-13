import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  book: any = null; // Initialize book to null to handle undefined scenarios
  currentUsername: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {
    this.currentUsername = sessionStorage.getItem('username'); // Retrieve current username from session storage
  }
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const bookId = params['id'];
      this.bookService.getBookById(bookId).subscribe(
        (book) => {
          this.book = book;
        },
        (error) => {
          console.error('Failed to fetch book details', error);
          this.book = null; // Handle error by setting book to null
        }
      );
    });
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('token');
  }

  canReturn(): boolean {
    // Add safe check to ensure 'book' is defined before accessing its properties
    return (
      this.book &&
      this.book.isBorrowed &&
      this.book.userID === this.currentUsername
    );
  }

  borrowBook(bookID: number): void {
    if (this.currentUsername) {
      this.bookService.borrowBook(bookID, this.currentUsername).subscribe({
        next: (book) => {
          this.book = book; // update UI right after update book
          alert('Book borrowed successfully');
        },
        error: (error) => {
          alert('Failed to borrow book: ' + error.message);
          console.error(error);
        },
      });
    }
  }

  returnBook(bookID: number): void {
    if (this.book.userID) {
      this.bookService.returnBook(bookID, this.book.userID).subscribe({
        next: (book) => {
          this.book = book; // update UI right after update book
          alert('Book returned successfully');
        },
        error: (error) => {
          alert('Failed to return book: ' + error.message);
          console.error(error);
        },
      });
    }
  }

  editBook(bookID: number): void {
    this.router.navigate(['/edit-book', bookID]);
  }
}
